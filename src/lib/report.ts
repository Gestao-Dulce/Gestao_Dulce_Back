import { toast } from "sonner";

type Col = { label: string; align?: "left" | "right" | "center" };

export function imprimir({
  titulo,
  meta,
  colunas,
  linhas,
  rodape,
}: {
  titulo: string;
  meta?: string;
  colunas: Col[];
  linhas: (string | number)[][];
  rodape?: (string | number)[];
}) {
  const th = colunas
    .map((c) => `<th style="text-align:${c.align ?? "left"}">${c.label}</th>`)
    .join("");
  const body = linhas.length
    ? linhas
        .map(
          (r) =>
            `<tr>${r
              .map(
                (cell, i) =>
                  `<td style="text-align:${colunas[i]?.align ?? "left"}">${cell ?? "—"}</td>`,
              )
              .join("")}</tr>`,
        )
        .join("")
    : `<tr><td colspan="${colunas.length}" style="text-align:center;padding:24px;color:#888">Sem registros.</td></tr>`;
  const tfoot = rodape
    ? `<tfoot><tr>${rodape
        .map(
          (cell, i) =>
            `<td style="text-align:${colunas[i]?.align ?? "left"}">${cell ?? ""}</td>`,
        )
        .join("")}</tr></tfoot>`
    : "";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${titulo} — Doces Lucelian</title>
  <style>
    body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a}
    h1{color:#c8102e;margin:0 0 4px;font-size:20px}
    .meta{color:#666;font-size:12px;margin-bottom:16px}
    table{width:100%;border-collapse:collapse;font-size:12px}
    th,td{padding:8px;border-bottom:1px solid #e5e5e5}
    th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
    tfoot td{font-weight:700;border-top:2px solid #c8102e;border-bottom:none}
  </style></head><body>
    <h1>Doces Lucelian — ${titulo}</h1>
    <div class="meta">Emitido em ${new Date().toLocaleString("pt-BR")}${meta ? ` • ${meta}` : ""} • ${linhas.length} registro(s)</div>
    <table><thead><tr>${th}</tr></thead><tbody>${body}</tbody>${tfoot}</table>
    <script>window.onload=()=>window.print();<\/script>
  </body></html>`;

  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) {
    toast.error("Permita pop-ups para imprimir");
    return;
  }
  w.document.write(html);
  w.document.close();
}
