// src/app/componentes/Cabecalho.tsx
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tema } from "../tema/tema";

export default function Cabecalho({ titulo, onCarrinho, onPerfil }: { titulo?: string; onCarrinho?: () => void; onPerfil?: () => void }) {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lamborghini_Logo.svg/640px-Lamborghini_Logo.svg.png" }} style={styles.logo} />
        <Text style={styles.titulo}>{titulo ?? "Automobili Lamborghini"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={onPerfil} style={({ pressed }) => [styles.botaoIcone, pressed && { opacity: 0.7 }]}>
          <Ionicons name="person-circle-outline" size={24} color={tema.cores.texto} />
        </Pressable>
        <Pressable onPress={onCarrinho} style={({ pressed }) => [styles.botaoIcone, pressed && { opacity: 0.7 }]}>
          <Ionicons name="cart-outline" size={22} color={tema.cores.texto} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: tema.cores.superficie,
    borderBottomColor: tema.cores.contorno,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { width: 28, height: 36, marginRight: 8 },
  titulo: { color: tema.cores.texto, fontSize: 18, fontWeight: "800" },
  botaoIcone: { marginLeft: 8, padding: 6, borderRadius: 10, backgroundColor: "#17171A" },
});
