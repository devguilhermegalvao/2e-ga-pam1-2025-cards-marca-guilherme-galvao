import React, { useRef } from "react";
import { View, Text, Image, Animated, Pressable, StyleSheet } from "react-native";
import type { Produto } from "../tipos";
import { tema } from "../tema/tema";
import AvaliacaoEstrelas from "./AvaliacaoEstrelas";
import { formatarMoeda } from "<div styleName={} />
<div styleName={}></div>/utils/formatarMoeda";

export default function CardProduto({ produto, onPress }: { produto: Produto; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], marginBottom: 14 }}>
      <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} style={({ pressed }) => [estilos.card, pressed && { opacity: 0.95 }]}>
        <Image source={{ uri: produto.imagens[0] }} style={estilos.imagem} />
        <View style={estilos.corpo}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={estilos.titulo}>{produto.nome}</Text>
            {produto.edicaoLimitada && <View style={estilos.tagLimitada}><Text style={{ color: tema.cores.primaria, fontWeight: "800" }}>LIMITED</Text></View>}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <Text style={estilos.preco}>{formatarMoeda(produto.preco)}</Text>
            <AvaliacaoEstrelas avaliacao={produto.avaliacao ?? 0} />
          </View>
          {!!produto.estoque && produto.estoque <= 3 && <Text style={estilos.estoqueAviso}>Últimas {produto.estoque} unidades</Text>}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: tema.cores.card,
    borderRadius: tema.raio.lg,
    overflow: "hidden",
    ...tema.sombraSuave,
  },
  imagem: { width: "100%", height: 160 },
  corpo: { padding: 12 },
  titulo: { color: tema.cores.texto, fontSize: 16, fontWeight: "800" },
  preco: { color: tema.cores.primaria, fontWeight: "800" },
  tagLimitada: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: tema.cores.superficie },
  estoqueAviso: { marginTop: 8, color: tema.cores.perigo, fontWeight: "700" },
});
