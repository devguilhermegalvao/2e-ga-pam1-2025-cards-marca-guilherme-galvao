import React, { useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, Pressable, StyleSheet, Alert, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Cabecalho from "../componentes/Cabecalho";
import { useAutenticacao } from "../contexto/AutenticacaoContexto";
import { useTema } from "../tema/TemaContexto";
import { RootStackParams } from '../tipos/navegacao';

export default function TelaPerfil() {
  const { usuario, sair } = useAutenticacao();
  const { cores, tipografia, raio, sombraSuave } = useTema();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Redireciona para a tela de login se o usuário não estiver autenticado.
  useEffect(() => {
    if (!usuario) {
      // Navega para a tela de login se o usuário não estiver logado
      // É uma prática comum em apps com rotas privadas
      // navigation.replace("TelaLogin");
    }
  }, [usuario, navigation]);

  const confirmarSaida = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: sair,
          style: "destructive",
        },
      ]
    );
  };
  
  // Animação para os botões de ação
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const onButtonPress = (action: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(action);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Cabecalho titulo="Perfil" />
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={[styles.cardUsuario, { backgroundColor: cores.card, borderRadius: raio.lg, ...sombraSuave }]}>
          <Image 
            source={{ uri: usuario?.avatar ?? "https://i.pravatar.cc/200" }} 
            style={[styles.avatar, { borderRadius: raio.lg * 2 }]}
            accessibilityRole="image"
            accessibilityLabel="Avatar do usuário"
          />
          <View style={styles.infoUsuario}>
            <Text style={[tipografia.tituloSecundario, { color: cores.texto, fontWeight: "900" }]}>
              {usuario?.nome ?? "Convidado"}
            </Text>
            <Text style={[tipografia.textoCorpo, { color: cores.mutado }]}>
              {usuario?.email ?? "—"}
            </Text>
          </View>
        </View>

        <View style={styles.opcoesContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable
              onPress={() => onButtonPress(() => alert("Editar perfil"))}
              style={({ pressed }) => [styles.botaoOpcao, { backgroundColor: cores.superficie, borderRadius: raio.md }, pressed && { opacity: 0.8 }]}
              accessibilityRole="button"
              accessibilityLabel="Editar perfil"
            >
              <Text style={[tipografia.textoCorpo, { color: cores.texto, fontWeight: "800" }]}>Editar perfil</Text>
            </Pressable>
          </Animated.View>

          <Pressable
            onPress={confirmarSaida}
            style={({ pressed }) => [styles.botaoOpcao, { backgroundColor: cores.perigo, borderRadius: raio.md }, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
          >
            <Text style={[tipografia.textoCorpo, { color: "#fff", fontWeight: "800" }]}>Sair</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    padding: 16,
  },
  cardUsuario: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 64,
    height: 64,
  },
  infoUsuario: {
    justifyContent: 'center',
  },
  opcoesContainer: {
    marginTop: 16,
  },
  botaoOpcao: {
    padding: 12,
    marginBottom: 12,
  },
});