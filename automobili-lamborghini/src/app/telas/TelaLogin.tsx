import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useAutenticacao } from "../contexto/AutenticacaoContexto";
import { tema } from "../tema/tema";

export default function TelaLogin() {
  const { entrar, carregando } = useAutenticacao();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) return Alert.alert("Preencha email e senha");
    const ok = await entrar(email, senha);
    if (!ok) Alert.alert("Falha", "Credenciais inválidas (simulado)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.cores.fundo }}>
      <View style={{ padding: 24 }}>
        <Text style={{ color: tema.cores.primaria, fontWeight: "800", fontSize: 12 }}>BEM-VINDO</Text>
        <Text style={{ color: tema.cores.texto, fontWeight: "900", fontSize: 24, marginTop: 8 }}>Entre na sua conta</Text>

        <View style={{ marginTop: 24 }}>
          <TextInput placeholder="Email" placeholderTextColor={tema.cores.mutado} style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput placeholder="Senha" placeholderTextColor={tema.cores.mutado} style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
          <Pressable onPress={handleLogin} style={({ pressed }) => [styles.botao, pressed && { opacity: 0.9 }]}>
            <Text style={{ fontWeight: "800" }}>{carregando ? "Entrando..." : "Entrar"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: "#161618", color: tema.cores.texto, padding: 12, marginBottom: 12, borderRadius: 10 },
  botao: { backgroundColor: tema.cores.primaria, padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
});
