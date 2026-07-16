import{t as f}from"./index-CuxXmS33.js";function g({titulo:n,meta:a,colunas:e,linhas:o,rodape:l}){const d=e.map(t=>`<th style="text-align:${t.align??"left"}">${t.label}</th>`).join(""),s=o.length?o.map(t=>`<tr>${t.map((r,c)=>`<td style="text-align:${e[c]?.align??"left"}">${r??"—"}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" style="text-align:center;padding:24px;color:#888">Sem registros.</td></tr>`,p=l?`<tfoot><tr>${l.map((t,r)=>`<td style="text-align:${e[r]?.align??"left"}">${t??""}</td>`).join("")}</tr></tfoot>`:"",m=`<!doctype html><html><head><meta charset="utf-8"><title>${n} — Doces Lucelian</title>
  <style>
    body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#1a1a1a}
    h1{color:#c8102e;margin:0 0 4px;font-size:20px}
    .meta{color:#666;font-size:12px;margin-bottom:16px}
    table{width:100%;border-collapse:collapse;font-size:12px}
    th,td{padding:8px;border-bottom:1px solid #e5e5e5}
    th{background:#fafafa;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
    tfoot td{font-weight:700;border-top:2px solid #c8102e;border-bottom:none}
  </style></head><body>
    <h1>Doces Lucelian — ${n}</h1>
    <div class="meta">Emitido em ${new Date().toLocaleString("pt-BR")}${a?` • ${a}`:""} • ${o.length} registro(s)</div>
    <table><thead><tr>${d}</tr></thead><tbody>${s}</tbody>${p}</table>
    <script>window.onload=()=>window.print();<\/script>
  </body></html>`,i=window.open("","_blank","width=900,height=700");if(!i){f.error("Permita pop-ups para imprimir");return}i.document.write(m),i.document.close()}export{g as i};
