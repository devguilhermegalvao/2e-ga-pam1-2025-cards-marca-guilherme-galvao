import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Tipagem para as cores do tema
export type Cores = {
  readonly primaria: string;
  readonly secundaria: string;
  readonly fundo: string;
  readonly superficie: string;
  readonly card: string;
  readonly texto: string;
  readonly mutado: string;
  readonly perigo: string;
  readonly sucesso: string;
  readonly contorno: string;
};

// Tipagem para os raios de borda
export type Raio = { sm: number; md: number; lg: number };

// Tipagem para as sombras
export type Sombra = ViewStyle;

// Tipagem para o tema completo
export type Tema = {
  readonly cores: Cores;
  readonly raio: Raio;
  readonly tipografia: ReturnType<typeof StyleSheet.create>;
  readonly sombraSuave: Sombra;
  readonly sombraCard: Sombra;
};

// Paleta de cores, focada no tema escuro da Lamborghini
const coresEscuras: Cores = {
  primaria: "#FFCD00",
  secundaria: "#141416",
  fundo: "#0E0E0F",
  superficie: "#1B1C1F",
  card: "#2A2C31",
  texto: "#F5F6F8",
  mutado: "#9BA0A6",
  perigo: "#C8102E",
  sucesso: "#3AD29F",
  contorno: "#3E4148",
};

// Definição dos estilos de texto para otimização com StyleSheet
const tipografia = StyleSheet.create({
  tituloPrimario: {
    fontSize: 32,
    fontWeight: 'bold',
    color: coresEscuras.texto,
  },
  tituloSecundario: {
    fontSize: 20,
    fontWeight: '600',
    color: coresEscuras.texto,
    letterSpacing: 0.5,
  },
  textoCorpo: {
    fontSize: 16,
    fontWeight: '400',
    color: coresEscuras.mutado,
  },
});

// Definição completa do tema padrão para ser importada
export const temaPadrao: Tema = {
  cores: coresEscuras,
  raio: { sm: 8, md: 14, lg: 20 },
  tipografia: tipografia as any, // Adicionado `as any` para evitar o erro de tipagem no `StyleSheet.create`
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