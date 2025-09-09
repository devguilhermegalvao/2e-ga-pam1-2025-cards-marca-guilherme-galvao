
export const formatarMoeda = (v: number) =>
  v === 0 ? "Sob consulta" : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" }).format(v);
