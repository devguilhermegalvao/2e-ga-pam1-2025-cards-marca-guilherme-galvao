// src/app/componentes/AvaliacaoEstrelas.tsx
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tema } from "../tema/tema";

export default function AvaliacaoEstrelas({ avaliacao = 0, tamanho = 14 }: { avaliacao?: number; tamanho?: number }) {
  const n = Math.round(avaliacao);
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons key={i} name={i < n ? "star" : "star-outline"} size={tamanho} color={tema.cores.primaria} />
      ))}
    </View>
  );
}
