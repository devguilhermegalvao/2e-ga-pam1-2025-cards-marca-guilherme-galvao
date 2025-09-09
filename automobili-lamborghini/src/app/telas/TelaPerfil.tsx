// src/app/telas/TelaPerfil.tsx
import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, Pressable } from "react-native";
import Cabecalho from "../componentes/Cabecalho";
import { useAutenticacao } from "../contexto/AutenticacaoContexto";
import { tema } from "../tema/tema";

export default function TelaPerfil() {
  const { usuario, sair } = useAutenticacao();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.cores.fundo }}>
      <Cabecalho titulo="Perfil" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: tema.cores.card, padding: 16, borderRadius: 12 }}>
          <Image source={{ uri: usuario?.avatar ?? "https://i.pravatar.cc/200" }} style={{ width: 64, height: 64, borderRadius: 32 }} />
          <View>
            <Text style={{ color: tema.cores.texto, fontWeight: "900" }}>{usuario?.nome ?? "Convidado"}</Text>
            <Text style={{ color: tema.cores.mutado }}>{usuario?.email ?? "—"}</Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Pressable onPress={() => alert("Editar perfil")} style={{ backgroundColor: tema.cores.superficie, padding: 12, borderRadius: 12, marginBottom: 12 }}>
            <Text style={{ color: tema.cores.texto, fontWeight: "800" }}>Editar perfil</Text>
          </Pressable>
          <Pressable onPress={sair} style={{ backgroundColor: tema.cores.perigo, padding: 12, borderRadius: 12 }}>
            <Text style={{ color: "#fff", fontWeight: "800" }}>Sair</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
