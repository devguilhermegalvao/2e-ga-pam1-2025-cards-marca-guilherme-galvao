export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagens: string[];
  video?: string;
  descricaoCompleta: string;
  descricao: string;
  especificacoes: {
    velocidadeMaxima: string;
    potencia: string;
    zeroACem: string;
    motor: string;
    peso: string;
    tracao?: string;
    torque?: string;
    transmissao?: string;
  };
  edicaoLimitada?: boolean;
  estoque?: number;
  avaliacao?: number;
  totalAvaliacoes?: number;
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
};