// src/app/tema/tema.ts
export const tema = {
  cores: {
    primaria: "#FFCD00",
    secundaria: "#000000",
    fundo: "#0E0E0F",
    superficie: "#141416",
    card: "#1B1C1F",
    texto: "#F5F6F8",
    mutado: "#9BA0A6",
    perigo: "#C8102E",
    sucesso: "#3AD29F",
    contorno: "#2A2C31",
  },
  raio: { sm: 8, md: 14, lg: 20 },
  espacio: (n: number) => 8 * n,
  sombraSuave: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  sombraCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
};
