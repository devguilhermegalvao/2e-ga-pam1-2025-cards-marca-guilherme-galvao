// src/app/telas/TelaCarrinho.tsx
import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import Cabecalho from "../componentes/Cabecalho";
import { useCarrinho } from "../contexto/CarrinhoContexto";
import { tema } from "../tema/tema";

export default function TelaCarrinho() {
  const carrinho = useCarrinho();

  const finalizar = () => {
    if (carrinho.itens.length === 0) return Alert.alert("Carrinho vazio");
    Alert.alert("Pedido confirmado", "Compra simulada. Equipe entrará em contato.");
    carrinho.limpar();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.cores.fundo }}>
      <Cabecalho titulo="Meu Carrinho" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {carrinho.itens.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Text style={{ color: tema.cores.mutado }}>Seu carrinho está vazio</Text>
          </View>
        ) : (
          carrinho.itens.map(({ produto, qtd }) => (
            <View key={produto.id} style={styles.item}>
              <Image source={{ uri: produto.imagens[0] }} style={{ width: 90, height: 64, borderRadius: 8 }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: tema.cores.texto, fontWeight: "800" }}>{produto.nome}</Text>
                <Text style={{ color: tema.cores.mutado }}>Qtd: {qtd} · {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(produto.preco)}</Text>
              </View>
              <Pressable onPress={() => carrinho.remover(produto.id)} style={({ pressed }) => [{ padding: 8, backgroundColor: tema.cores.perigo, borderRadius: 8 }, pressed && { opacity: 0.8 }]}>
                <Text style={{ color: "#fff" }}>Remover</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={{ color: tema.cores.mutado }}>Total</Text>
          <Text style={{ color: tema.cores.primaria, fontWeight: "900" }}>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(carrinho.total)}</Text>
        </View>
        <Pressable onPress={finalizar} style={({ pressed }) => [{ backgroundColor: tema.cores.primaria, padding: 14, borderRadius: 12 }, pressed && { opacity: 0.9 }]}>
          <Text style={{ fontWeight: "900" }}>Finalizar compra</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", backgroundColor: tema.cores.card, padding: 12, borderRadius: 12, marginBottom: 12 },
  checkoutBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: tema.cores.superficie, padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: tema.cores.contorno },
});
