import React, { useState, useRef } from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Alert, Dimensions, ActivityIndicator, SafeAreaView, Animated } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams, TelaDetalhesRouteProp } from '../tipos/navegacao';
import { useCarrinho } from "../contexto/CarrinhoContexto";
import { useTema } from "../tema/TemaContexto";
import { produtos } from "../dados/produtos";
import Cabecalho from "../componentes/Cabecalho";
import AvaliacaoEstrelas from "../componentes/AvaliacaoEstrelas";
import { formatarMoeda } from "../../utils/formatarMoeda";
import { coresCarros } from "../dados/cores";

const { width } = Dimensions.get("window");

export default function TelaDetalhes() {
  const route = useRoute<TelaDetalhesRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { adicionar } = useCarrinho();
  const { cores, tipografia } = useTema();

  const [quantidade, setQuantidade] = useState(1);
  const [corSelecionada, setCorSelecionada] = useState<string | null>(coresCarros[0]);
  const [carregando, setCarregando] = useState(false);

  const { id } = route.params;
  const produto = produtos.find(p => p.id === id);

  const scrollX = useRef(new Animated.Value(0)).current;

  if (!produto) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
        <Cabecalho
          titulo="Erro"
          onPerfil={() => navigation.navigate("TelaPerfil")}
          onCarrinho={() => navigation.navigate("TelaCarrinho")}
        />
        <View style={styles.erroContainer}>
          <Text style={[styles.textoErro, { color: cores.mutado }]}>
            Produto não encontrado.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const onButtonPress = (action: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(action);
  };

  const handleAdicionarAoCarrinho = async () => {
    if (produto.estoque === 0) {
      Alert.alert("Produto Indisponível", "Este item está fora de estoque.");
      return;
    }
    setCarregando(true);
    await adicionar(produto, quantidade);
    setCarregando(false);
    Alert.alert(
      "Adicionado ao Carrinho",
      `${quantidade}x ${produto.nome} foi adicionado ao seu carrinho.`
    );
  };

  const renderEspecificacoes = () => {
    return (
      <View style={styles.especificacoesContainer}>
        <Text style={[styles.subtitulo, { color: cores.primaria }]}>
          Especificações Técnicas
        </Text>
        {Object.entries(produto.especificacoes).map(([key, value]) => (
          <View key={key} style={styles.especificacaoItem}>
            <Text style={[tipografia.textoCorpo, { color: cores.mutado, textTransform: "capitalize" }]}>
              {key.replace(/([A-Z])/g, ' $1').trim().replace(/tracao/, 'Tração').replace(/transmissao/, 'Transmissão')}:
            </Text>
            <Text style={[tipografia.textoCorpo, { color: cores.texto, fontWeight: "bold" }]}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderGaleria = () => {
    return (
      <View style={styles.galeriaContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {produto.imagens.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.galeriaImagem} resizeMode="cover" />
          ))}
        </ScrollView>
        <View style={styles.indicadorContainer}>
          {produto.imagens.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return <Animated.View key={i} style={[styles.indicador, { opacity, backgroundColor: cores.texto }]} />;
          })}
        </View>
      </View>
    );
  };

  const renderSeletorCores = () => {
    return (
      <View style={styles.coresContainer}>
        <Text style={[styles.subtitulo, { color: cores.primaria, marginBottom: 10 }]}>Cores Disponíveis</Text>
        <View style={styles.listaCores}>
          {coresCarros.map((cor) => (
            <Pressable
              key={cor}
              onPress={() => setCorSelecionada(cor)}
              style={[
                styles.corItem,
                { backgroundColor: cor },
                cor === corSelecionada && styles.corSelecionada,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Selecionar cor ${cor}`}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderContador = () => {
    return (
      <View style={[styles.compraContainer, { backgroundColor: cores.superficie, borderTopColor: cores.contorno }]}>
        <View style={[styles.contador, { borderColor: cores.contorno }]}>
          <Pressable
            onPress={() => onButtonPress(() => setQuantidade(Math.max(1, quantidade - 1)))}
            style={styles.contadorBtn}
            disabled={quantidade <= 1}
          >
            <Text style={[styles.textoContador, { color: cores.texto }]}>-</Text>
          </Pressable>
          <Text style={[styles.textoContador, { color: cores.texto, marginHorizontal: 20 }]}>
            {quantidade}
          </Text>
          <Pressable
            onPress={() => onButtonPress(() => setQuantidade(quantidade + 1))}
            style={styles.contadorBtn}
          >
            <Text style={[styles.textoContador, { color: cores.texto }]}>+</Text>
          </Pressable>
        </View>
        <Pressable
          style={[
            styles.comprarBtn,
            {
              backgroundColor: cores.primaria,
              opacity: produto.estoque === 0 ? 0.5 : 1,
            },
          ]}
          onPress={handleAdicionarAoCarrinho}
          disabled={carregando || produto.estoque === 0}
        >
          {carregando ? (
            <ActivityIndicator color={cores.fundo} />
          ) : (
            <Text style={[styles.textoBotaoComprar, { color: cores.texto }]}>Adicionar</Text>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Cabecalho
        titulo={produto.nome}
        onPerfil={() => navigation.navigate("TelaPerfil")}
        onCarrinho={() => navigation.navigate("TelaCarrinho")}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderGaleria()}

        <View style={styles.conteudo}>
          <Text style={[styles.titulo, { color: cores.texto }]}>{produto.nome}</Text>
          <Text style={[tipografia.textoCorpo, { color: cores.mutado }]}>{produto.descricao}</Text>
          
          <View style={styles.avaliacaoContainer}>
            <AvaliacaoEstrelas avaliacao={produto.avaliacao ?? 0} />
            <Text style={[tipografia.textoCorpo, { color: cores.mutado, marginLeft: 8 }]}>
              ({produto.totalAvaliacoes} avaliações)
            </Text>
          </View>
          
          <View style={styles.precoContainer}>
             <Text style={[styles.precoTexto, { color: cores.primaria }]}>
              {formatarMoeda(produto.preco, 'BRL', 'pt-BR')}
            </Text>
            {produto.edicaoLimitada && (
              <View style={[styles.tag, { backgroundColor: cores.superficie }]}>
                <Text style={[styles.tagTexto, { color: cores.primaria }]}>EDIÇÃO LIMITADA</Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.subtitulo, { color: cores.primaria, marginTop: 20 }]}>
            Detalhes do Veículo
          </Text>
          <Text style={[tipografia.textoCorpo, { color: cores.mutado, marginTop: 10 }]}>
            {produto.descricaoCompleta}
          </Text>

          {renderEspecificacoes()}
          {renderSeletorCores()}
          
        </View>
      </ScrollView>
      {renderContador()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galeriaContainer: {
    position: 'relative',
    height: width * 0.7,
  },
  galeriaImagem: {
    width: width,
    height: '100%',
  },
  indicadorContainer: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  conteudo: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "900",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 20,
  },
  textoCorpo: {
    fontSize: 14,
  },
  avaliacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  precoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 10,
  },
  precoTexto: {
    fontSize: 24,
    fontWeight: "900",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tagTexto: {
    fontWeight: "800",
    fontSize: 12,
  },
  especificacoesContainer: {
    marginTop: 30,
  },
  especificacaoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  coresContainer: {
    marginTop: 30,
  },
  listaCores: {
    flexDirection: 'row',
    marginTop: 10,
  },
  corItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  corSelecionada: {
    borderColor: 'tema.cores.primaria',
  },
  compraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  contador: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  contadorBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textoContador: {
    fontSize: 18,
    fontWeight: "800",
  },
  comprarBtn: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoComprar: {
    fontSize: 16,
    fontWeight: "800",
  },
  erroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoErro: {
    fontSize: 18,
  },
});