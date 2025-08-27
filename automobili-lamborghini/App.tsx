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

// --- Design tokens simples
const theme = {
  color: {
    bg: "#0B0B0C",
    card: "#111214",
    text: "#F5F7FA",
    sub: "#C8CFD8",
    brand: "#FFD400", // destaque premium
    success: "#24C27A",
    danger: "#FF5C5C",
    line: "#1C1E22",
  },
  radius: 16,
  spacing: (n: number) => 8 * n,
};

// Mock de produtos (troque pelas suas URLs reais)
const MOCK = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: ["Edição Limitada", "Pro X", "Runner", "Heritage", "Carbon", "Edge", "Prime", "Classic", "Elite", "Fusion"][i],
  price: 1999 - i * 120,
  oldPrice: i % 3 === 0 ? 2299 - i * 80 : undefined,
  img: "https://via.placeholder.com/600x400.png?text=Produto+" + (i + 1),
  badge: i < 2 ? "Novo" : i % 4 === 0 ? "Limited" : undefined,
}));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<typeof MOCK>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setProducts(MOCK);
      setLoading(false);
    }, 800); // simula request + mostra skeleton
    return () => clearTimeout(t);
  }, []);

  const renderItem = ({ item }: { item: (typeof MOCK)[number] }) => (
    <ProductCard product={item} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.bg }}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>SUA MARCA</Text>
        <TouchableOpacity accessibilityLabel="Buscar produtos">
          <Text style={styles.link}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Mini “Hero” com CTA */}
      <View style={styles.hero}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>Coleção 2025</Text>
          <Text style={styles.heroSub}>Performance, design e autenticidade.</Text>
          <TouchableOpacity style={styles.cta}>
            <Text style={styles.ctaText}>Ver destaques</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: "https://via.placeholder.com/300x200.png?text=Hero" }}
          style={styles.heroImg}
        />
      </View>

      {/* Chips (mock) */}
      <View style={styles.chips}>
        {["Novidades", "Mais vendidos", "Promo", "Exclusivos"].map((c) => (
          <TouchableOpacity key={c} style={styles.chip}>
            <Text style={styles.chipText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid / Skeleton */}
      {loading ? (
        <View style={{ padding: theme.spacing(2) }}>
          <SkeletonGrid />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(it) => it.id}
          numColumns={2}
          columnWrapperStyle={{ gap: theme.spacing(2), paddingHorizontal: theme.spacing(2) }}
          contentContainerStyle={{ paddingVertical: theme.spacing(2), rowGap: theme.spacing(2) }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

function ProductCard({ product }: { product: typeof MOCK[number] }) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discount =
    hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : 0;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      accessibilityLabel={`Abrir ${product.name}`}
    >
      {/* Badge */}
      {product.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      )}

      {/* Imagem */}
      <Image source={{ uri: product.img }} style={styles.cardImg} />

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>R$ {product.price.toLocaleString("pt-BR")}</Text>
          {hasDiscount && (
            <Text style={styles.oldPrice}>R$ {product.oldPrice!.toLocaleString("pt-BR")}</Text>
          )}
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.buyBtn} accessibilityLabel={`Comprar ${product.name}`}>
          <Text style={styles.buyText}>{hasDiscount ? `Comprar -${discount}%` : "Comprar"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function SkeletonGrid() {
  // placeholders simples
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <View key={i} style={[styles.card, { backgroundColor: "#0F1012" }]}>
          <View style={[styles.cardImg, { backgroundColor: "#15171B" }]} />
          <View style={{ gap: 8, width: "100%" }}>
            <View style={{ height: 14, backgroundColor: "#15171B", borderRadius: 8 }} />
            <View style={{ height: 14, width: "60%", backgroundColor: "#15171B", borderRadius: 8 }} />
            <View style={[styles.buyBtn, { backgroundColor: "#15171B", height: 38 }]} />
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { color: theme.color.text, fontSize: 20, fontWeight: "800", letterSpacing: 1 },
  link: { color: theme.color.sub, fontSize: 14 },

  hero: {
    marginHorizontal: theme.spacing(2),
    backgroundColor: theme.color.card,
    borderRadius: theme.radius,
    padding: theme.spacing(2),
    flexDirection: "row",
    gap: theme.spacing(2),
    alignItems: "center",
  },
  heroTitle: { color: theme.color.text, fontSize: 22, fontWeight: "800" },
  heroSub: { color: theme.color.sub, marginTop: 4 },
  cta: {
    marginTop: theme.spacing(2),
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: theme.color.brand,
    alignSelf: "flex-start",
  },
  ctaText: { color: "#000", fontWeight: "800" },
  heroImg: { width: 120, height: 80, resizeMode: "cover", borderRadius: theme.radius },

  chips: {
    flexDirection: "row",
    gap: theme.spacing(1),
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(2),
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#121419",
    borderWidth: 1,
    borderColor: theme.color.line,
  },
  chipText: { color: theme.color.sub, fontWeight: "600" },

  card: {
    flex: 1,
    backgroundColor: theme.color.card,
    borderRadius: theme.radius,
    padding: theme.spacing(1.5),
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
    backgroundColor: "#212329",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: theme.color.line,
  },
  badgeText: { color: theme.color.sub, fontSize: 12, fontWeight: "700" },

  cardImg: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
    borderRadius: theme.radius,
    backgroundColor: "#0F1012",
    marginBottom: theme.spacing(1.5),
  },
  cardInfo: { gap: 6 },
  cardTitle: { color: theme.color.text, fontSize: 14, fontWeight: "700", minHeight: 36 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  price: { color: theme.color.text, fontSize: 16, fontWeight: "800" },
  oldPrice: {
    color: theme.color.sub,
    textDecorationLine: "line-through",
    fontSize: 12,
  },
  buyBtn: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.color.brand,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  buyText: { color: "#000", fontWeight: "800" },
});
