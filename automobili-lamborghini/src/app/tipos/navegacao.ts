// src/app/tipos/navegacao.ts

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Produto } from "./tipos";

// Mapeamento de nomes de tela para seus parâmetros
export type RootStackParams = {
  TelaInicial: undefined;
  TelaDetalhes: { id: number }; // Corrigido para `number` para corresponder ao ID do produto
  TelaCarrinho: undefined;
  TelaPerfil: undefined;
  TelaLogin: undefined;
};

// Tipagem para a propriedade `route` da tela de detalhes
export type TelaDetalhesRouteProp = RouteProp<RootStackParams, 'TelaDetalhes'>;

// Tipagem para a propriedade `navigation` de todas as telas
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams>;