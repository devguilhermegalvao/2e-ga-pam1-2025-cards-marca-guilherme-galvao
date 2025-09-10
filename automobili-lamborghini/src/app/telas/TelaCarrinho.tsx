import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Cabecalho from "../componentes/Cabecalho";
import { useCarrinho } from "../contexto/CarrinhoContexto";
import { useTema } from "../tema/TemaContexto";
import type { Produto } from "../tipos/tipos";

// Nova interface para tipar as props do ItemCarrinho
interface ItemCarrinhoProps {
  produto: Produto;
  qtd: number;
  onRemover: () => void;
}

// Componente para um único item do carrinho, agora com tipagem de props
const ItemCarrinho: React.FC<ItemCarrinhoProps> = ({ produto, qtd, onRemover }) => {
  const { cores, tipografia, raio } = useTema();
  return (
    <View style={[styles.item, { backgroundColor: cores.card, borderRadius: raio.md, marginBottom: 12 }]}>
      <Image
        source={{ uri: produto.imagens[0] }}
        style={[styles.itemImagem, { borderRadius: raio.sm }]}
        accessibilityRole="image"
        accessibilityLabel={`Imagem do produto ${produto.nome}`}
      />
      <View style={styles.itemDetalhes}>
        <Text style={[tipografia.textoCorpo, { color: cores.texto, fontWeight: "800" }]}>
          {produto.nome}
        </Text>
        <Text style={[tipografia.textoCorpo, { color: cores.mutado }]}>
          Qtd: {qtd} · {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(produto.preco)}
        </Text>
      </View>
      <Pressable
        onPress={onRemover}
        style={({ pressed }) => [styles.botaoRemover, { backgroundColor: cores.perigo, borderRadius: raio.sm }, pressed && { opacity: 0.8 }]}
        accessibilityRole="button"
        accessibilityLabel={`Remover ${produto.nome} do carrinho`}
      >
        <Text style={styles.textoBotaoRemover}>Remover</Text>
      </Pressable>
    </View>
  );
};

export default function TelaCarrinho() {
  const carrinho = useCarrinho();
  const { cores, tipografia, raio } = useTema();

  const confirmarRemocao = (id: number, nomeProduto: string) => {
    Alert.alert(
      "Confirmar remoção",
      `Tem certeza que deseja remover "${nomeProduto}" do carrinho?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => carrinho.remover(id), style: "destructive" },
      ]
    );
  };

  const finalizar = () => {
    if (carrinho.itens.length === 0) {
      return Alert.alert("Carrinho vazio", "Adicione produtos para finalizar a compra.");
    }
    Alert.alert("Pedido confirmado", "Compra simulada. A equipe da Lamborghini entrará em contato em breve!");
    carrinho.limpar();
  };

  const renderConteudo = () => {
    if (carrinho.carregando) {
      return (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color={cores.primaria} />
          <Text style={[tipografia.textoCorpo, { color: cores.mutado, marginTop: 10 }]}>Carregando carrinho...</Text>
        </View>
      );
    }
    if (carrinho.itens.length === 0) {
      return (
        <View style={styles.vazioContainer}>
          <Text style={[tipografia.textoCorpo, { color: cores.mutado }]}>Seu carrinho está vazio</Text>
        </View>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.listaItens}>
        {carrinho.itens.map(({ produto, qtd }) => (
          <ItemCarrinho
            key={produto.id}
            produto={produto}
            qtd={qtd}
            onRemover={() => confirmarRemocao(produto.id, produto.nome)}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Cabecalho titulo="Meu Carrinho" onPerfil={() => {}} onCarrinho={() => {}} />
      {renderConteudo()}
      <View style={[styles.checkoutBar, { backgroundColor: cores.superficie, borderTopColor: cores.contorno }]}>
        <View>
          <Text style={[tipografia.textoCorpo, { color: cores.mutado }]}>Total</Text>
          <Text style={[tipografia.tituloSecundario, { color: cores.primaria, fontWeight: "900" }]}>
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(carrinho.total)}
          </Text>
        </View>
        <Pressable
          onPress={finalizar}
          style={({ pressed }) => [styles.botaoFinalizar, { backgroundColor: cores.primaria, borderRadius: raio.sm }, pressed && { opacity: 0.9 }]}
          accessibilityRole="button"
          accessibilityLabel="Finalizar compra"
        >
          <Text style={[tipografia.textoCorpo, { fontWeight: "900", color: cores.texto }]}>Finalizar compra</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listaItens: { padding: 16, paddingBottom: 120 },
  item: { flexDirection: "row", alignItems: "center", padding: 12 },
  itemImagem: { width: 90, height: 64 },
  itemDetalhes: { flex: 1, marginLeft: 12 },
  itemTitulo: { fontWeight: "800" },
  itemDescricao: {},
  botaoRemover: { padding: 8 },
  textoBotaoRemover: { color: "#fff" },
  carregandoContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoCarregando: { marginTop: 10 },
  vazioContainer: { alignItems: "center", marginTop: 60 },
  textoVazio: {},
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textoTotalTitulo: {},
  textoTotalValor: { fontWeight: "900" },
  botaoFinalizar: { padding: 14 },
  textoBotaoFinalizar: { fontWeight: "900" },
});