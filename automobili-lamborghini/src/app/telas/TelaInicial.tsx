import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  Animated,
  ScrollView,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Cabecalho from "../componentes/Cabecalho";
import CardProduto from "../componentes/CardProduto";
import { produtos } from "../dados/produtos";
import { useTema } from "../tema/TemaContexto";
import { RootStackParams } from "../tipos/navegacao";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useCarrinho } from "../contexto/CarrinhoContexto";

// Tipagem da navegação
type NavProp = NativeStackNavigationProp<RootStackParams, "TelaInicial">;

export default function TelaInicial() {
  const nav = useNavigation<NavProp>();
  const { cores, tipografia, raio, sombraSuave } = useTema();
  const { quantidade, total, carregando } = useCarrinho();

  // Estado para filtro de categorias
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  // Animação para o hero header
  const heroAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heroAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [heroAnim]);

  // Filtrar produtos (apenas demonstrativo)
  const produtosFiltrados =
    categoriaAtiva === "Todos"
      ? produtos
      : produtos.filter((p) =>
          categoriaAtiva === "Limitados"
            ? p.edicaoLimitada
            : p.specs.engine.includes(categoriaAtiva)
        );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Cabecalho
        onCarrinho={() => nav.navigate("TelaCarrinho")}
        onPerfil={() => nav.navigate("TelaPerfil")}
      />

      {/* Hero */}
      <Animated.View
        style={[
          styles.hero,
          {
            opacity: heroAnim,
            backgroundColor: cores.superficie,
            ...sombraSuave,
            borderRadius: raio.lg,
          },
        ]}
      >
        <Text style={[styles.eyebrow, { color: cores.primaria }]}>
          COLEÇÃO EXCLUSIVA
        </Text>
        <Text
          style={[
            styles.title,
            { color: cores.texto, fontFamily: tipografia.titulo.fontFamily },
          ]}
        >
          Potência que você sente na pele.
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: cores.mutado, fontFamily: tipografia.textoCorpo.fontFamily },
          ]}
        >
          Modelos icônicos, edições limitadas e desempenho que redefine o
          impossível.
        </Text>
      </Animated.View>

      {/* Chips de filtro */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 12, marginTop: 8 }}
      >
        {["Todos", "V12", "V10", "SUV", "Limitados"].map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategoriaAtiva(c)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor:
                  categoriaAtiva === c ? cores.primaria : cores.card,
                borderRadius: raio.lg,
              },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: categoriaAtiva === c ? cores.fundo : cores.texto,
                },
              ]}
            >
              {c}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Lista de produtos */}
      {carregando ? (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color={cores.primaria} />
          <Text
            style={[
              tipografia.textoCorpo,
              { color: cores.mutado, marginTop: 10 },
            ]}
          >
            Carregando produtos...
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(p) => String(p.id)}
          renderItem={({ item }) => (
            <CardProduto
              produto={item}
              onPress={() => nav.navigate("TelaDetalhes", { id: item.id })}
            />
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        />
      )}

      {/* Botão flutuante do carrinho */}
      {quantidade > 0 && (
        <Pressable
          onPress={() => nav.navigate("TelaCarrinho")}
          style={[
            styles.fab,
            {
              backgroundColor: cores.primaria,
              ...sombraSuave,
              borderRadius: raio.lg,
            },
          ]}
        >
          <Text
            style={[
              styles.fabText,
              { color: cores.fundo, fontFamily: tipografia.titulo.fontFamily },
            ]}
          >
            {quantidade} •{" "}
            {Intl.NumberFormat
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)
              : `R$ ${total.toFixed(2)}`}
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    margin: 16,
    padding: 16,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 22,
    marginTop: 6,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  chip: {
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontWeight: "700",
  },
  fab: {
    position: "absolute",
    bottom: 18,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fabText: {
    fontWeight: "800",
    fontSize: 14,
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});