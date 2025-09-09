import React, { useRef, useEffect } from "react";
import { SafeAreaView, Animated, ScrollView, FlatList, Pressable, Text, View, StyleSheet } from "react-native";
import Cabecalho from "../componentes/Cabecalho";
import CardProduto from "../componentes/CardProduto";
import { produtos } from "../dados/produtos";
import { tema } from "../tema/tema";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../AppStackTypes";
import { useCarrinho } from "../contexto/CarrinhoContexto";

type NavProp = NativeStackNavigationProp<RootStackParams, "TelaInicial">;

export default function TelaInicial() {
  const nav = useNavigation<NavProp>();
  const heroAnim = useRef(new Animated.Value(0)).current;
  const carrinho = useCarrinho();

  useEffect(() => {
    Animated.timing(heroAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.cores.fundo }}>
      <Cabecalho onCarrinho={() => nav.navigate("TelaCarrinho" as any)} onPerfil={() => nav.navigate("TelaPerfil" as any)} />
      <Animated.View style={[styles.hero, { opacity: heroAnim }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>COLEÇÃO EXCLUSIVA</Text>
          <Text style={styles.title}>Potência que você sente na pele.</Text>
          <Text style={styles.subtitle}>Modelos icônicos, edições limitadas e desempenho que redefine o impossível.</Text>
        </View>
      </Animated.View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 12, marginTop: 8 }}>
        {["Todos", "V12", "V10", "SUV", "Limitados"].map((c) => (
          <Pressable key={c} style={({ pressed }) => [styles.chip, pressed && { opacity: 0.8 }]}><Text style={{ color: tema.cores.texto, fontWeight: "700" }}>{c}</Text></Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={produtos}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => <CardProduto produto={item} onPress={() => nav.navigate("TelaDetalhes" as any, { id: item.id })} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />

      {carrinho.quantidade > 0 && (
        <Pressable onPress={() => nav.navigate("TelaCarrinho" as any)} style={styles.fab}>
          <Text style={{ fontWeight: "800" }}>{carrinho.quantidade} • {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(carrinho.total)}</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { margin: 16, padding: 16, borderRadius: tema.raio.lg, backgroundColor: tema.cores.superficie, ...tema.sombraSuave },
  eyebrow: { color: tema.cores.primaria, fontWeight: "800", fontSize: 12 },
  title: { color: tema.cores.texto, fontWeight: "900", fontSize: 20, marginTop: 6 },
  subtitle: { color: tema.cores.mutado, marginTop: 6 },
  chip: { marginRight: 10, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: tema.cores.card },
  fab: { position: "absolute", bottom: 18, right: 16, backgroundColor: tema.cores.primaria, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, ...tema.sombraSuave },
});
