// src/app/telas/TelaDetalhes.tsx
import React, { useRef, useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Animated, Text, Pressable, StyleSheet, Alert } from "react-native";
import Cabecalho from "../componentes/Cabecalho";
import { produtos } from "../dados/produtos";
import { tema } from "../tema/tema";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCarrinho } from "../contexto/CarrinhoContexto";
import { formatarMoeda } from "../utils/formatarMoeda";

export default function TelaDetalhes() {
  const route = useRoute();
  // @ts-ignore
  const { id } = (route.params ?? {});
  const produto = produtos.find((p) => p.id === Number(id))!;
  const nav = useNavigation();
  const carrinho = useCarrinho();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [qtd, setQtd] = useState(1);

  if (!produto) return null;

  const adicionar = () => {
    carrinho.adicionar(produto, qtd);
    Alert.alert("Adicionado", `${produto.nome} x${qtd} adicionado ao carrinho.`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.cores.fundo }}>
      <Cabecalho titulo={produto.nome} onCarrinho={() => nav.navigate("TelaCarrinho" as any)} onPerfil={() => nav.navigate("TelaPerfil" as any)} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Animated.ScrollView horizontal pagingEnabled onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })} scrollEventThrottle={16}>
          {produto.imagens.map((uri, i) => <Image key={i} source={{ uri }} style={{ width: 360, height: 220 }} />)}
        </Animated.ScrollView>

        <View style={{ padding: 16 }}>
          <Text style={{ color: tema.cores.primaria, fontWeight: "800" }}>{produto.edicaoLimitada ? "Edição Limitada" : "Standard"}</Text>
          <Text style={{ color: tema.cores.texto, fontSize: 22, fontWeight: "900", marginTop: 8 }}>{produto.nome}</Text>
          <Text style={{ color: tema.cores.primaria, fontSize: 20, fontWeight: "900", marginTop: 8 }}>{formatarMoeda(produto.preco)}</Text>

          <Text style={{ color: tema.cores.mutado, marginTop: 12 }}>{produto.descricao}</Text>

          <View style={{ marginTop: 16 }}>
            <Text style={{ color: tema.cores.texto, fontWeight: "800", marginBottom: 8 }}>Especificações</Text>
            {Object.entries(produto.specs).map(([k, v]) => (
              <View key={k} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                <Text style={{ color: tema.cores.mutado }}>{k}</Text>
                <Text style={{ color: tema.cores.texto, fontWeight: "800" }}>{v}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <View>
          <Text style={{ color: tema.cores.mutado, fontSize: 12 }}>Oferta exclusiva</Text>
          <Text style={{ color: tema.cores.primaria, fontWeight: "900", fontSize: 18 }}>{formatarMoeda(produto.preco)}</Text>
        </View>
        <Pressable onPress={adicionar} style={({ pressed }) => [styles.buyBtn, pressed && { transform: [{ scale: 0.98 }] }]}>
          <Text style={{ fontWeight: "900" }}>Adicionar ao carrinho</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: tema.cores.superficie, padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: tema.cores.contorno },
  buyBtn: { backgroundColor: tema.cores.primaria, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, ...tema.sombraSuave },
});
