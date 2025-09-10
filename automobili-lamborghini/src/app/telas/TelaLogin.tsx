import React, { useState, useRef } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, Animated } from "react-native";
import { useAutenticacao } from "../contexto/AutenticacaoContexto";
import { useTema } from "../tema/TemaContexto";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from '../tipos/navegacao';

export default function TelaLogin() {
  const { entrar, carregando, erro } = useAutenticacao();
  const { cores, tipografia, raio, sombraSuave } = useTema();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  
  const [email, setEmail] = useState("teste@teste.com");
  const [senha, setSenha] = useState("123");

  const handleLogin = async () => {
    // Validação inicial
    if (!email || !senha) {
      Alert.alert("Campos Obrigatórios", "Por favor, preencha seu email e senha.");
      return;
    }
    // Chamar a função de autenticação do contexto
    await entrar(email, senha);
  };
  
  const handleCadastro = () => {
    // Implemente a navegação para a tela de cadastro se houver
    Alert.alert("Cadastro", "Funcionalidade de cadastro ainda não implementada.");
  }

  // Animação para o botão de login
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const onButtonPress = (action: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(action);
  };

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <View style={estilos.conteudo}>
        <Text style={[tipografia.tituloSecundario, { color: cores.primaria }]}>BEM-VINDO</Text>
        <Text style={[tipografia.tituloPrimario, { color: cores.texto, marginTop: 8 }]}>Entre na sua conta</Text>

        <View style={estilos.formulario}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={cores.mutado}
            style={[estilos.input, { backgroundColor: cores.superficie, color: cores.texto, borderRadius: raio.md }]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor={cores.mutado}
            style={[estilos.input, { backgroundColor: cores.superficie, color: cores.texto, borderRadius: raio.md }]}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          
          {erro && <Text style={[estilos.textoErro, { color: cores.perigo }]}>{erro}</Text>}
          
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable
              onPress={() => onButtonPress(handleLogin)}
              style={[estilos.botao, { backgroundColor: cores.primaria, borderRadius: raio.md, opacity: carregando ? 0.7 : 1 }]}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color={cores.superficie} />
              ) : (
                <Text style={[tipografia.tituloSecundario, { color: cores.texto }]}>Entrar</Text>
              )}
            </Pressable>
          </Animated.View>
        </View>
        
        <Pressable onPress={handleCadastro} style={estilos.linkCadastro}>
          <Text style={[tipografia.textoCorpo, { color: cores.mutado }]}>Não tem uma conta? <Text style={{ color: cores.primaria, fontWeight: 'bold' }}>Cadastre-se</Text></Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  conteudo: {
    padding: 24,
  },
  formulario: {
    marginTop: 24,
  },
  input: {
    padding: 14,
    marginBottom: 12,
  },
  botao: {
    padding: 14,
    alignItems: "center",
    marginTop: 24,
  },
  textoErro: {
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkCadastro: {
    marginTop: 24,
    alignItems: 'center',
  },
});