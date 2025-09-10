import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "../tema/TemaContexto"; // Importação do hook de tema

// Definimos uma interface para as props do componente.
interface AvaliacaoEstrelasProps {
  avaliacao?: number; // Valor da avaliação, de 0 a `maxEstrelas`.
  tamanho?: number; // Tamanho do ícone das estrelas.
  maxEstrelas?: number; // O número total de estrelas a serem exibidas.
}

/**
 * Componente que exibe uma classificação por estrelas.
 * Renderiza um conjunto de estrelas cheias ou vazias com base em uma avaliação.
 */
export default function AvaliacaoEstrelas({
  avaliacao = 0,
  tamanho = 14,
  maxEstrelas = 5,
}: AvaliacaoEstrelasProps) {
  const { cores } = useTema(); // Usando o hook para acessar as cores do tema

  // Arredondamos a avaliação para o número inteiro mais próximo, que será usado para preencher as estrelas.
  const estrelasPreenchidas = Math.round(avaliacao);

  // A função para determinar qual ícone de estrela usar.
  const getIconeEstrela = (index: number) => {
    return index < estrelasPreenchidas ? "star" : "star-outline";
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: maxEstrelas }).map((_, i) => (
        <Ionicons
          key={i}
          name={getIconeEstrela(i)}
          size={tamanho}
          color={cores.primaria} // Usando a cor do tema via hook
          accessibilityLabel={`${estrelasPreenchidas} de ${maxEstrelas} estrelas`}
        />
      ))}
    </View>
  );
}