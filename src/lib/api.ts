/**
 * api.ts - Camada centralizada de comunicacao com o backend Express.
 *
 * Todas as chamadas ao banco de dados devem passar por aqui,
 * nunca diretamente pelo cliente Supabase no frontend.
 */

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3001";

// --- Helpers ---

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const session = JSON.parse(localStorage.getItem("app_session") ?? "null");
    return session?.token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {/* noop */ }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

function get<T>(path: string) {
  return request<T>(path, { method: "GET" });
}

function post<T>(path: string, body: unknown) {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}

function put<T>(path: string, body: unknown) {
  return request<T>(path, { method: "PUT", body: JSON.stringify(body) });
}

function patch<T>(path: string, body?: unknown) {
  return request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined });
}

function del<T>(path: string) {
  return request<T>(path, { method: "DELETE" });
}

// --- Auth ---

export type AuthResponse = {
  id: string;
  email: string;
  isAdmin: boolean;
  needsPasswordSetup: boolean;
  token: string | null;
};

export const apiAuth = {
  login: (email: string, password: string) =>
    post<AuthResponse>("/api/auth/login", { email, password }),

  changePassword: (email: string, currentPassword: string, newPassword: string) =>
    post<{ success: boolean }>("/api/auth/change-password", {
      email,
      currentPassword,
      newPassword,
    }),

  setFirstPassword: (email: string, newPassword: string) =>
    post<AuthResponse>("/api/auth/set-first-password", { email, newPassword }),
};

// --- Dashboard ---

export type DashboardData = {
  faturamento: number;
  contasPagas: number;
  contasPendentes: number;
  lucro: number;
  categorias: { categoria: string; pago: number; pendente: number; total: number }[];
  contasProx: { vencimento: string; valor: number; fornecedor: string; categoria: string }[];
  dias: { dia: string; vendas: number; contas: number; lucro: number }[];
  rankClientes: { nome: string; total: number }[];
  rankProdutos: { produto: string; total: number; qtd: number }[];
};

export const apiDashboard = {
  get: (dias: number) =>
    get<DashboardData>(`/api/dashboard?dias=${dias}`),
};

// --- Clientes ---

export type Cliente = {
  id: string;
  nome: string;
  cpf_cnpj?: string | null;
  contato?: string | null;
  localizacao?: string | null;
  cep?: string | null;
  rua?: string | null;
  numero?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  vendas?: { valor_total: number; status_pagamento: string; data_pagamento: string | null }[];
};

export type ClienteSelect = { id: string; nome: string };

export type ClientePayload = Omit<Cliente, "id" | "vendas">;

export const apiClientes = {
  list: () => get<Cliente[]>("/api/clientes"),
  select: () => get<ClienteSelect[]>("/api/clientes/select"),
  create: (payload: ClientePayload) => post<{ id: string; nome: string }>("/api/clientes", payload),
  update: (id: string, payload: ClientePayload) => put<{ success: boolean }>(`/api/clientes/${id}`, payload),
  delete: (id: string) => del<{ success: boolean }>(`/api/clientes/${id}`),
};

// --- Produtos ---

export type Produto = {
  id: string;
  nome: string;
  observacao?: string | null;
  unidade: "unidade" | "kg" | "caixa";
  valor: number;
};

export type ProdutoPayload = Omit<Produto, "id">;

export const apiProdutos = {
  list: () => get<Produto[]>("/api/produtos"),
  create: (payload: ProdutoPayload) => post<Produto>("/api/produtoes", payload),
  update: (id: string, payload: ProdutoPayload) => put<{ success: boolean }>(`/api/produtos/${id}`, payload),
  delete: (id: string) => del<{ success: boolean }>(`/api/produtos/${id}`),
};

// --- Vendas ---

export type VendaItem = {
  id?: string;
  venda_id?: string;
  produto: string;
  quantidade: number;
  valor_unitario: number;
  unidade: string;
};

export type Venda = {
  id: string;
  cliente_id: string;
  clientes?: { nome: string } | null;
  forma_pagamento: string;
  data: string;
  data_pagamento?: string | null;
  status_pagamento: "pago" | "pendente";
  nota_fiscal?: string | null;
  desconto: number;
  valor_total: number;
  venda_itens?: VendaItem[];
};

export type VendaPayload = {
  cliente_id: string;
  forma_pagamento: "dinheiro" | "pix" | "cartao" | "boleto" | "faturado";
  data: string;
  data_pagamento?: string | null;
  status_pagamento: "pago" | "pendente";
  nota_fiscal?: string | null;
  desconto: number;
  itens: { produto: string; quantidade: number; valor_unitario: number; unidade: string }[];
};

export const apiVendas = {
  list: () => get<Venda[]>("/api/vendas"),
  produtosUsados: () => get<string[]>("/api/vendas/produtos-usados"),
  create: (payload: VendaPayload) => post<{ id: string; valor_total: number }>("/api/vendas", payload),
  update: (id: string, payload: VendaPayload) => put<{ success: boolean; valor_total: number }>(`/api/vendas/${id}`, payload),
  delete: (id: string) => del<{ success: boolean }>(`/api/vendas/${id}`),
  pagar: (id: string) => patch<{ success: boolean }>(`/api/vendas/${id}/pagar`),
};

// --- Contas a Pagar ---

export type Conta = {
  id: string;
  categoria: "fornecedor" | "folha_pagamento" | "outros";
  fornecedor: string;
  descricao?: string | null;
  vencimento: string;
  valor: number;
  status: "pendente" | "pago";
  recorrente: boolean;
  finalizado_em?: string | null;
  funcionario_nome?: string | null;
  funcionario_cargo?: string | null;
  funcionario_documento?: string | null;
};

export type ContaPayload = {
  categoria: "fornecedor" | "folha_pagamento" | "outros";
  fornecedor: string;
  descricao?: string | null;
  vencimento: string;
  valor: number;
  recorrente: boolean;
  funcionario_nome?: string | null;
  funcionario_cargo?: string | null;
  funcionario_documento?: string | null;
};

export const apiContas = {
  list: () => get<Conta[]>("/api/contas"),
  create: (payload: ContaPayload) => post<{ id: string }>("/api/contas", payload),
  update: (id: string, payload: ContaPayload) => put<{ success: boolean }>(`/api/contas/${id}`, payload),
  delete: (id: string) => del<{ success: boolean }>(`/api/contas/${id}`),
  updateStatus: (id: string, status: "pendente" | "pago") =>
    patch<{ success: boolean }>(`/api/contas/${id}/status`, { status }),
  pagarRecorrente: (id: string) =>
    post<{ success: boolean; proximoVencimento: string }>(`/api/contas/${id}/pagar-recorrente`, {}),
  finalizarRecorrencia: (id: string) =>
    patch<{ success: boolean }>(`/api/contas/${id}/finalizar-recorrencia`),
};

// --- Usuarios ---

export type Usuario = {
  id: string;
  email: string;
  created_at: string;
};

export const apiUsuarios = {
  list: () => get<Usuario[]>("/api/usuarios"),
  create: (email: string, password: string) =>
    post<{ success: boolean }>("/api/usuarios", { email, password }),
  delete: (id: string) => del<{ success: boolean }>(`/api/usuarios/${id}`),
  resetPassword: (id: string) =>
    patch<{ success: boolean }>(`/api/usuarios/${id}/reset-password`),
};

// --- AI Chat ---

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const apiAI = {
  chat: (message: string, history: ChatMessage[]) =>
    post<{ text: string }>("/api/ai/chat", { message, history }),
};