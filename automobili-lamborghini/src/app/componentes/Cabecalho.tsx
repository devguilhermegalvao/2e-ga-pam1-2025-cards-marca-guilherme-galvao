import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "../tema/TemaContexto"; // Importamos o hook useTema

// Definimos uma interface para as props para clareza e tipagem.
interface CabecalhoProps {
  titulo?: string;
  onCarrinho?: () => void;
  onPerfil?: () => void;
  logoUri?: string;
}

/**
 * Componente de Cabeçalho da aplicação.
 * Exibe o logo, título e botões de ação para carrinho e perfil.
 */
export default function Cabecalho({ 
  titulo, 
  onCarrinho, 
  onPerfil,
  logoUri = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lamborghini_Logo.svg/640px-Lamborghini_Logo.svg.png" 
}: CabecalhoProps) {
  
  const { cores } = useTema(); // Acessamos o tema via hook

  // Função para aplicar o estilo de pressionado com opacidade
  const getBotaoEstilo = ({ pressed }: { pressed: boolean }) => [
    styles.botaoIcone,
    { backgroundColor: cores.superficie }, // Usamos a cor do tema
    pressed && { opacity: 0.7 }
  ];

  return (
    <View style={[styles.header, { backgroundColor: cores.superficie, borderBottomColor: cores.contorno }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image 
          source={{ uri: logoUri }} 
          style={styles.logo} 
          accessibilityRole="image"
          accessibilityLabel="Logo da Automobili Lamborghini"
        />
        <Text style={[styles.titulo, { color: cores.texto }]}>{titulo ?? "Automobili Lamborghini"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable 
          onPress={onPerfil} 
          style={getBotaoEstilo}
          accessibilityRole="button"
          accessibilityLabel="Acessar perfil do usuário"
        >
          <Ionicons name="person-circle-outline" size={24} color={cores.texto} />
        </Pressable>
        <Pressable 
          onPress={onCarrinho} 
          style={getBotaoEstilo}
          accessibilityRole="button"
          accessibilityLabel="Acessar carrinho de compras"
        >
          <Ionicons name="cart-outline" size={22} color={cores.texto} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { width: 28, height: 36, marginRight: 8 },
  titulo: { fontSize: 18, fontWeight: "800" },
  botaoIcone: { marginLeft: 8, padding: 6, borderRadius: 10 },
});