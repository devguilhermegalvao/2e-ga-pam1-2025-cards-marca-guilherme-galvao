import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const tema = {
  cor: {
    fundo: "#0B0B0C",       // fundo carbono
    card: "#111214",        // fundo card
    texto: "#F5F7FA",       // texto claro
    textoSec: "#C8CFD8",    // texto secundário
    marca: "#FFD700",       // dourado Lamborghini
    sucesso: "#24C27A",
    erro: "#FF5C5C",
    linha: "#1C1E22",
  },
  raio: 18,
  espaco: (n: number) => 8 * n,
};

// 🏎️ Produtos Lamborghini (mock realista)
const PRODUTOS = [
  {
    id: "1",
    nome: "Lamborghini Revuelto",
    preco: 3800000,
    img: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/models/revuelto/2023/05_19_revuelto/hero/hero_01.jpg",
    selo: "Novo",
  },
  {
    id: "2",
    nome: "Huracán STO",
    preco: 2500000,
    img: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/models/huracan/huracan-sto/gallery/huracan-sto-2.jpg",
    selo: "Edição Limitada",
  },
  {
    id: "3",
    nome: "Urus Performante",
    preco: 1600000,
    img: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/models/urus/urus-performante/gallery/urus-performante-1.jpg",
  },
  {
    id: "4",
    nome: "Jaqueta Oficial Squadra Corse",
    preco: 2999,
    precoAntigo: 3499,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dw25cdaaa6/images/large/9015308YYB000000XX/F.jpg",
  },
  {
    id: "5",
    nome: "Boné Automobili Lamborghini",
    preco: 799,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dw6b5b4cf7/images/large/9009982CCU000000XX/F.jpg",
  },
  {
    id: "6",
    nome: "Mochila Carbon Fiber",
    preco: 4999,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dw9b77aa93/images/large/9015242CCU000000XX/F.jpg",
  },
  {
    id: "7",
    nome: "Miniatura Aventador 1:18",
    preco: 1199,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dw8b87686f/images/large/9015285MMB000000XX/F.jpg",
  },
  {
    id: "8",
    nome: "Tênis Automobili Lamborghini",
    preco: 2499,
    precoAntigo: 2999,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dw56db56d4/images/large/9015230JJF000000XX/F.jpg",
  },
  {
    id: "9",
    nome: "Óculos Lamborghini x Master Italia",
    preco: 1799,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dwdfe26f89/images/large/9015313CCU000000XX/F.jpg",
  },
  {
    id: "10",
    nome: "Carteira Couro Lamborghini",
    preco: 1399,
    img: "https://www.lamborghinistore.com/dw/image/v2/BJBC_PRD/on/demandware.static/-/Sites-lamborghini-master-catalog/default/dw2a237890/images/large/9015257YYB000000XX/F.jpg",
  },
];

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [produtos, setProdutos] = useState<typeof PRODUTOS>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setProdutos(PRODUTOS);
      setCarregando(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const renderizarProduto = ({ item }: { item: (typeof PRODUTOS)[number] }) => (
    <CartaoProduto produto={item} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.cor.fundo }}>
      <StatusBar style="light" />

      {/* Cabeçalho */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.marca}>LAMBORGHINI STORE</Text>
        <TouchableOpacity accessibilityLabel="Buscar produtos">
          <Text style={estilos.link}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Hero */}
      <View style={estilos.hero}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.heroTitulo}>Coleção 2025</Text>
          <Text style={estilos.heroSub}>Performance. Luxo. Exclusividade.</Text>
          <TouchableOpacity style={estilos.cta}>
            <Text style={estilos.ctaTexto}>Explorar</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: PRODUTOS[0].img }} style={estilos.heroImg} />
      </View>

      {/* Categorias */}
      <View style={estilos.categorias}>
        {["Novidades", "Carros", "Acessórios", "Exclusivos"].map((c) => (
          <TouchableOpacity key={c} style={estilos.categoria}>
            <Text style={estilos.categoriaTexto}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de produtos */}
      {carregando ? (
        <ActivityIndicator size="large" color={tema.cor.marca} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
        data={produtos}
        renderItem={renderizarProduto}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: tema.espaco(2),
          marginBottom: tema.espaco(2), // espaçamento entre linhas
        }}
        contentContainerStyle={{ paddingVertical: tema.espaco(2) }}
        showsVerticalScrollIndicator={false}
      />
      )}
    </SafeAreaView>
  );
}

function CartaoProduto({ produto }: { produto: typeof PRODUTOS[number] }) {
  const temDesconto = produto.precoAntigo && produto.precoAntigo > produto.preco;
  const desconto = temDesconto
    ? Math.round(((produto.precoAntigo! - produto.preco) / produto.precoAntigo!) * 100)
    : 0;

  return (
    <TouchableOpacity style={estilos.card} activeOpacity={0.85} accessibilityLabel={`Abrir ${produto.nome}`}>
      {produto.selo && (
        <View style={estilos.selo}>
          <Text style={estilos.seloTexto}>{produto.selo}</Text>
        </View>
      )}

      <Image source={{ uri: produto.img }} style={estilos.cardImg} />

      <View style={estilos.cardInfo}>
        <Text style={estilos.cardTitulo} numberOfLines={2}>
          {produto.nome}
        </Text>

        <View style={estilos.linhaPreco}>
          <Text style={estilos.preco}>R$ {produto.preco.toLocaleString("pt-BR")}</Text>
          {temDesconto && <Text style={estilos.precoAntigo}>R$ {produto.precoAntigo!.toLocaleString("pt-BR")}</Text>}
        </View>

        <TouchableOpacity style={estilos.botaoComprar} accessibilityLabel={`Comprar ${produto.nome}`}>
          <Text style={estilos.textoComprar}>{temDesconto ? `Comprar -${desconto}%` : "Comprar"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    paddingHorizontal: tema.espaco(2),
    paddingVertical: tema.espaco(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  marca: { color: tema.cor.marca, fontSize: 20, fontWeight: "800", letterSpacing: 2 },
  link: { color: tema.cor.textoSec, fontSize: 14 },

  hero: {
    marginHorizontal: tema.espaco(2),
    backgroundColor: tema.cor.card,
    borderRadius: tema.raio,
    padding: tema.espaco(2),
    flexDirection: "row",
    gap: tema.espaco(2),
    alignItems: "center",
  },
  heroTitulo: { color: tema.cor.texto, fontSize: 22, fontWeight: "800" },
  heroSub: { color: tema.cor.textoSec, marginTop: 4 },
  cta: {
    marginTop: tema.espaco(2),
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: tema.cor.marca,
    alignSelf: "flex-start",
  },
  ctaTexto: { color: "#000", fontWeight: "800" },
  heroImg: { width: 120, height: 80, resizeMode: "cover", borderRadius: tema.raio },

  categorias: {
    flexDirection: "row",
    gap: tema.espaco(1),
    paddingHorizontal: tema.espaco(2),
    paddingVertical: tema.espaco(2),
  },
  categoria: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#121419",
    borderWidth: 1,
    borderColor: tema.cor.linha,
  },
  categoriaTexto: { color: tema.cor.textoSec, fontWeight: "600" },

  card: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: tema.cor.card,
    borderRadius: tema.raio,
    padding: tema.espaco(1.5),
    overflow: "hidden",
    minHeight: 280,
  },
  
  cardImg: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: tema.raio,
    marginBottom: tema.espaco(1.5),
    backgroundColor: "#0F1012",
  },  
  
  selo: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
    backgroundColor: "#212329",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: tema.cor.linha,
  },
  seloTexto: { color: tema.cor.textoSec, fontSize: 12, fontWeight: "700" },

  cardInfo: { gap: 6 },
  cardTitulo: { color: tema.cor.texto, fontSize: 14, fontWeight: "700", minHeight: 36 },
  linhaPreco: { flexDirection: "row", alignItems: "center", gap: 8 },
  preco: { color: tema.cor.marca, fontSize: 16, fontWeight: "800" },
  precoAntigo: { color: tema.cor.textoSec, textDecorationLine: "line-through", fontSize: 12 },
  botaoComprar: {
    marginTop: tema.espaco(1),
    backgroundColor: tema.cor.marca,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  textoComprar: { color: "#000", fontWeight: "800" },
});
