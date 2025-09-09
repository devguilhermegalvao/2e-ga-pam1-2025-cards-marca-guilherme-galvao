// src/app/dados/produtos.ts
import type { Produto } from "../tipos";

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Aventador SVJ",
    preco: 517770,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/aventador/aventador-svj/aventador-svj-1.jpg",
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/aventador/aventador-svj/aventador-svj-2.jpg",
    ],
    descricao: "O ápice da potência V12 com aerodinâmica ativa. Feito para quem se recusa a passar despercebido.",
    descricaoCompleta: `
O Aventador SVJ representa o ápice da era V12 da Lamborghini. Equipado com motor de 6,5 litros e 770 cv, acelera de 0 a 100 km/h em 2,8 segundos. Com sistema ALA 2.0 e direção nas quatro rodas, cada curva é pura precisão. Apenas 900 unidades foram produzidas, tornando-o uma obra-prima exclusiva de design e performance.
    `,
    especificacoes: {
      velocidadeMaxima: "350 km/h",
      potencia: "770 cv",
      zeroACem: "2.8 s",
      motor: "6.5L V12",
      peso: "1.525 kg",
      tracao: "AWD",
      transmissao: "ISR 7 vel."
    },
    edicaoLimitada: true,
    estoque: 3,
    avaliacao: 4.9,
    totalAvaliacoes: 241,
  },
  {
    id: 2,
    nome: "Huracán EVO",
    preco: 261274,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/huracan/huracan-evo/huracan-evo-1.jpg",
    ],
    descricao: "Direção afiada, motor V10 naturalmente aspirado e tecnologia LDVI.",
    descricaoCompleta: `
O Huracán EVO é a evolução do Huracán, combinando motor V10 de 5,2 litros com 640 cv e o sistema LDVI, que antecipa cada comando do motorista. Design agressivo e interior refinado oferecem emoção e conforto, tornando cada viagem uma experiência de superesportivo.
    `,
    especificacoes: {
      velocidadeMaxima: "325 km/h",
      potencia: "640 cv",
      zeroACem: "3.2 s",
      motor: "5.2L V10 NA",
      peso: "1.422 kg",
      tracao: "AWD"
    },
    edicaoLimitada: false,
    estoque: 8,
    avaliacao: 4.8,
    totalAvaliacoes: 512,
  },
  {
    id: 3,
    nome: "Urus",
    preco: 218009,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/urus/urus-1.jpg",
    ],
    descricao: "O Super SUV que redefine versatilidade sem abrir mão do DNA Lamborghini.",
    descricaoCompleta: `
O Urus combina luxo e desempenho de superesportivo com a versatilidade de um SUV. Motor V8 biturbo de 4,0 litros com 650 cv, acelera de 0 a 100 km/h em 3,6 segundos. Design imponente, interior sofisticado e tecnologia avançada garantem conforto e emoção em qualquer estrada.
    `,
    especificacoes: {
      velocidadeMaxima: "305 km/h",
      potencia: "650 cv",
      zeroACem: "3.6 s",
      motor: "4.0L V8 Bi-Turbo",
      peso: "2.200 kg",
      tracao: "AWD"
    },
    edicaoLimitada: false,
    estoque: 12,
    avaliacao: 4.7,
    totalAvaliacoes: 389,
  },
  {
    id: 4,
    nome: "Sián FKP 37",
    preco: 3600000,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/sian/sian-1.jpg",
    ],
    descricao: "Visão futurista híbrida com supercapacitores. Colecionável instantâneo.",
    descricaoCompleta: `
O Sián FKP 37 é o primeiro superesportivo híbrido da Lamborghini. Combinando o poder de um V12 e supercapacitores, entrega 819 cv e acelera a 100 km/h em menos de 2,8 segundos. Com apenas 63 unidades produzidas, seu design futurista e desempenho extremo fazem dele uma obra de arte sobre rodas.
    `,
    especificacoes: {
      velocidadeMaxima: "350 km/h",
      potencia: "819 cv",
      zeroACem: "2.8 s",
      motor: "6.5L V12 + híbrido",
      peso: "1.570 kg",
      tracao: "AWD"
    },
    edicaoLimitada: true,
    estoque: 1,
    avaliacao: 5,
    totalAvaliacoes: 74,
  },
  {
    id: 5,
    nome: "Countach LPI 800-4",
    preco: 2600000,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/countach/countach-1.jpg",
    ],
    descricao: "Lenda renascida. Nostalgia unida à inovação em edição hiper exclusiva.",
    descricaoCompleta: `
O Countach LPI 800-4 resgata a lenda do icônico Countach, combinando design clássico com tecnologia moderna. Motor V12 híbrido de 6,5 litros, 814 cv, 0 a 100 km/h em 2,8 segundos. Design arrojado e exclusividade tornam cada unidade desejada por colecionadores.
    `,
    especificacoes: {
      velocidadeMaxima: "355 km/h",
      potencia: "814 cv",
      zeroACem: "2.8 s",
      motor: "6.5L V12 + híbrido",
      peso: "1.595 kg",
      tracao: "AWD"
    },
    edicaoLimitada: true,
    estoque: 2,
    avaliacao: 5,
    totalAvaliacoes: 131,
  },
  {
    id: 6,
    nome: "Aventador Ultimae",
    preco: 509321,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/aventador/aventador-ultimae/aventador-ultimae-1.jpg",
    ],
    descricao: "Despedida épica do V12 puro. Um tributo à era dourada da combustão.",
    descricaoCompleta: `
O Aventador Ultimae marca a despedida definitiva do motor V12 aspirado. Com 780 cv, acelera de 0 a 100 km/h em 2,8 segundos. Limitado a 350 unidades coupé e 250 roadster, combina potência, emoção e exclusividade.
    `,
    especificacoes: {
      velocidadeMaxima: "355 km/h",
      potencia: "780 cv",
      zeroACem: "2.8 s",
      motor: "6.5L V12",
      peso: "1.565 kg",
      tracao: "AWD"
    },
    edicaoLimitada: true,
    estoque: 5,
    avaliacao: 4.9,
    totalAvaliacoes: 208,
  },
  {
    id: 7,
    nome: "Huracán STO",
    preco: 327838,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/huracan/huracan-sto/huracan-sto-1.jpg",
    ],
    descricao: "Do autódromo para a rua. Leve, visceral, simplesmente viciante.",
    descricaoCompleta: `
O Huracán STO traz a experiência das pistas para as ruas. Com motor V10 de 5,2 litros e 640 cv, seu peso reduzido e desempenho extremo proporcionam manuseio preciso e diversão máxima. Design agressivo e engenharia de corrida fazem dele o sonho de qualquer purista Lamborghini.
    `,
    especificacoes: {
      velocidadeMaxima: "310 km/h",
      potencia: "640 cv",
      zeroACem: "3.0 s",
      motor: "5.2L V10 NA",
      peso: "1.339 kg",
      tracao: "RWD"
    },
    edicaoLimitada: false,
    estoque: 7,
    avaliacao: 4.8,
    totalAvaliacoes: 164,
  },
  {
    id: 8,
    nome: "Terzo Millennio",
    preco: 0,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/terzo-millennio/terzo-1.jpg",
    ],
    descricao: "Manifesto elétrico com materiais autorreparáveis e aerodinâmica visionária.",
    descricaoCompleta: `
O Terzo Millennio é o conceito do futuro dos supercarros elétricos. Desenvolvido com o MIT, utiliza supercapacitores e materiais autorreparáveis, antecipando tendências de design e tecnologia. Cada detalhe é uma visão de inovação e performance.
    `,
    especificacoes: {
      velocidadeMaxima: "—",
      potencia: "—",
      zeroACem: "—",
      motor: "Elétrico + ultracapacitores",
      peso: "1.500 kg",
      tracao: "AWD"
    },
    edicaoLimitada: true,
    estoque: 0,
    avaliacao: 5,
    totalAvaliacoes: 56,
  },
  {
    id: 9,
    nome: "Veneno Roadster",
    preco: 4500000,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/veneno/veneno-1.jpg",
    ],
    descricao: "Radical, raro e absolutamente dramático. Um ícone de colecionador.",
    descricaoCompleta: `
O Veneno Roadster é uma edição máxima de exclusividade, com apenas 9 unidades produzidas. Motor V12 de 6,5 litros com 750 cv, 0 a 100 km/h em 2,9 segundos e velocidade máxima de 355 km/h. Um carro extremo e cobiçado por colecionadores de todo o mundo.
    `,
    especificacoes: {
      velocidadeMaxima: "355 km/h",
      potencia: "750 cv",
      zeroACem: "2.9 s",
      motor: "6.5L V12",
      peso: "1.490 kg",
      tracao: "AWD"
    },
    edicaoLimitada: true,
    estoque: 1,
    avaliacao: 5,
    totalAvaliacoes: 91,
  },
  {
    id: 10,
    nome: "Centenario LP 770-4",
    preco: 1900000,
    imagens: [
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/gateway-family/centenario/centenario-1.jpg",
    ],
    descricao: "Homenagem ao centenário de Ferruccio. Engenharia celebrativa e rara.",
    descricaoCompleta: `
O Centenario LP 770-4 celebra 100 anos do nascimento de Ferruccio Lamborghini. Motor V12 de 6,5 litros com 770 cv, desempenho impressionante e design futurista. Produção limitada e exclusividade tornam cada unidade um tesouro para colecionadores.
    `,
    especificacoes: {
      velocidadeMaxima: "350 km/h",
      potencia: "770 cv",
      zeroACem: "2.8 s",
      motor: "6.5L V12",
      peso: "1.520 kg",
      tracao: "AWD"
    },
    edicaoLimitada: true,
    estoque: 2,
    avaliacao: 4.9,
    totalAvaliacoes: 117,
  },
];
