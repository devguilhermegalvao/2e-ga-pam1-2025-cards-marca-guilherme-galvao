import React, { useRef, useMemo } from "react";
import { View, Text, Image, Animated, Pressable, StyleSheet } from "react-native";
import type { Produto } from "../tipos/tipos";
import { useTema } from "../tema/TemaContexto";
import AvaliacaoEstrelas from "./AvaliacaoEstrelas";
import { formatarMoeda } from "../../utils/formatarMoeda";

interface CardProdutoProps {
  produto: Produto;
  onPress: () => void;
}

export default function CardProduto({ produto, onPress }: CardProdutoProps) {
  const { cores, raio, sombraSuave } = useTema();
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const estoqueBaixo = useMemo(() => produto.estoque && produto.estoque <= 3, [produto.estoque]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[estilos.card, { backgroundColor: cores.card, borderRadius: raio.lg, ...sombraSuave, marginBottom: 14 }]}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalhes do produto ${produto.nome}`}
      >
        <Image
          source={{ uri: produto.imagens[0] }}
          style={estilos.imagem}
          accessibilityRole="image"
          accessibilityLabel={`Imagem de ${produto.nome}`}
        />
        <View style={estilos.corpo}>
          <View style={estilos.cabecalhoCorpo}>
            <Text style={[estilos.titulo, { color: cores.texto }]}>{produto.nome}</Text>
            {produto.edicaoLimitada && (
              <View style={[estilos.tagLimitada, { backgroundColor: cores.superficie, borderRadius: raio.md, marginLeft: 8 }]}>
                <Text style={[estilos.tagTexto, { color: cores.primaria }]}>LIMITED</Text>
              </View>
            )}
          </View>
          <View style={estilos.detalhesPreco}>
            <Text style={[estilos.preco, { color: cores.primaria }]}>
              {formatarMoeda(produto.preco, 'BRL', 'pt-BR')} 
            </Text>
            <AvaliacaoEstrelas avaliacao={produto.avaliacao ?? 0} />
          </View>
          {estoqueBaixo && (
            <Text style={[estilos.estoqueAviso, { color: cores.perigo }]}>
              Últimas {produto.estoque} unidades
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  imagem: {
    width: "100%",
    height: 160,
  },
  corpo: {
    padding: 12,
  },
  cabecalhoCorpo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "800",
    flexShrink: 1,
  },
  preco: {
    fontWeight: "800",
  },
  detalhesPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  tagLimitada: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagTexto: {
    fontWeight: "800",
  },
  estoqueAviso: {
    marginTop: 8,
    fontWeight: "700",
  },
});