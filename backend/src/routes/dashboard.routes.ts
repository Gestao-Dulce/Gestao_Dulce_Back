import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// ─── GET /api/dashboard?dias=30 ──────────────────────────────────────────────

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const dias = Math.min(Math.max(Number(req.query.dias) || 30, 1), 365);

    const hojeStr = new Date().toISOString().slice(0, 10);
    const em15 = new Date(Date.now() + 15 * 86400000)
      .toISOString()
      .slice(0, 10);
    const inicioPeriodo = new Date(Date.now() - (dias - 1) * 86400000)
      .toISOString()
      .slice(0, 10);

    const [vendasPer, contasPer, contasProx, topClientes, topProdutos] =
      await Promise.all([
        supabase
          .from("vendas")
          .select("data, valor_total, cliente_id, clientes(nome)")
          .gte("data", inicioPeriodo),
        supabase
          .from("contas_a_pagar")
          .select("vencimento, valor, status, categoria")
          .gte("vencimento", inicioPeriodo),
        supabase
          .from("contas_a_pagar")
          .select("vencimento, valor, fornecedor, categoria")
          .eq("status", "pendente")
          .gte("vencimento", hojeStr)
          .lte("vencimento", em15)
          .order("vencimento"),
        supabase
          .from("vendas")
          .select("valor_total, cliente_id, clientes(nome)")
          .gte("data", inicioPeriodo),
        supabase
          .from("venda_itens")
          .select("produto, quantidade, valor_unitario, vendas!inner(data)")
          .gte("vendas.data", inicioPeriodo),
      ]);

    const vendasData = vendasPer.data ?? [];
    const contasData = contasPer.data ?? [];

    // KPIs
    const faturamento = vendasData.reduce(
      (s: number, v: any) => s + Number(v.valor_total),
      0
    );
    const contasPagas = contasData
      .filter((c: any) => c.status === "pago")
      .reduce((s: number, v: any) => s + Number(v.valor), 0);
    const contasPendentes = contasData
      .filter((c: any) => c.status === "pendente")
      .reduce((s: number, v: any) => s + Number(v.valor), 0);
    const lucro = faturamento - contasPagas;

    // Categorias
    const catLabel: Record<string, string> = {
      fornecedor: "Fornecedor",
      folha_pagamento: "Folha de pagamento",
      outros: "Outros",
    };

    const catMap = new Map<string, { pago: number; pendente: number }>();
    contasData.forEach((c: any) => {
      const cur = catMap.get(c.categoria) ?? { pago: 0, pendente: 0 };
      if (c.status === "pago") cur.pago += Number(c.valor);
      else cur.pendente += Number(c.valor);
      catMap.set(c.categoria, cur);
    });

    const categorias = [...catMap.entries()]
      .map(([cat, v]) => ({
        categoria: catLabel[cat] ?? cat,
        pago: v.pago,
        pendente: v.pendente,
        total: v.pago + v.pendente,
      }))
      .sort((a, b) => b.total - a.total);

    // Buckets diários
    const buckets: {
      dia: string;
      vendas: number;
      contas: number;
      lucro: number;
    }[] = [];

    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const v = vendasData
        .filter((x: any) => x.data === d)
        .reduce((s: number, x: any) => s + Number(x.valor_total), 0);
      const c = contasData
        .filter((x: any) => x.vencimento === d && x.status === "pago")
        .reduce((s: number, x: any) => s + Number(x.valor), 0);
      buckets.push({
        dia: new Date(d).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          timeZone: "UTC",
        }),
        vendas: v,
        contas: c,
        lucro: v - c,
      });
    }

    // Top clientes
    const mapC = new Map<string, { nome: string; total: number }>();
    (topClientes.data ?? []).forEach((v: any) => {
      if (!v.cliente_id) return;
      const cur = mapC.get(v.cliente_id) ?? {
        nome: v.clientes?.nome ?? "—",
        total: 0,
      };
      cur.total += Number(v.valor_total);
      mapC.set(v.cliente_id, cur);
    });
    const rankClientes = [...mapC.values()]
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    // Top produtos
    const mapP = new Map<
      string,
      { produto: string; total: number; qtd: number }
    >();
    (topProdutos.data ?? []).forEach((v: any) => {
      const cur = mapP.get(v.produto) ?? {
        produto: v.produto,
        total: 0,
        qtd: 0,
      };
      cur.total += Number(v.quantidade) * Number(v.valor_unitario);
      cur.qtd += Number(v.quantidade);
      mapP.set(v.produto, cur);
    });
    const rankProdutos = [...mapP.values()]
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    res.json({
      faturamento,
      contasPagas,
      contasPendentes,
      lucro,
      categorias,
      contasProx: contasProx.data ?? [],
      dias: buckets,
      rankClientes,
      rankProdutos,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
