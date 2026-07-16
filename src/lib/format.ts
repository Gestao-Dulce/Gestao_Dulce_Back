export const brl = (v: number | string) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const dataBR = (d: string | Date | null | undefined) =>
  d ? new Date(d).toLocaleDateString("pt-BR", { timeZone: "UTC" }) : "—";

export const hoje = () => new Date().toISOString().slice(0, 10);

export const addDias = (dias: number, base?: string) => {
  const d = base ? new Date(base) : new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
};

export const addMeses = (meses: number, base?: string) => {
  const d = base ? new Date(base) : new Date();
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
};

export const formatCPFCNPJ = (v: string) => {
  const digits = v.replace(/\D/g, "");
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

export const formatPhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
};
