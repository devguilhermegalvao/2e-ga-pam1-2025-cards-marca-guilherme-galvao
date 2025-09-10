import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Usuario } from "../tipos/tipos";

// Definimos as chaves para armazenar os dados no AsyncStorage
const CHAVE_ARMAZENAMENTO_USUARIO = '@AutenticacaoProvedor:usuario';

// Tipo de dados do contexto de autenticação, com a adição de um estado de erro.
type AuthContextType = {
  usuario: Usuario | null;
  entrar: (email: string, senha: string) => Promise<boolean>;
  sair: () => void;
  carregando: boolean;
  erro: string | null;
};

// Criamos o contexto, com um valor inicial undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para acessar o contexto de autenticação.
 * Garante que o hook seja usado apenas dentro do AutenticacaoProvedor.
 */
export function useAutenticacao() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAutenticacao deve ser usado dentro de AutenticacaoProvedor");
  }
  return ctx;
}

/**
 * Provedor de Autenticação.
 * Gerencia o estado de autenticação, incluindo a persistência.
 */
export function AutenticacaoProvedor({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Efeito para carregar o usuário salvo no AsyncStorage quando o app inicia.
  useEffect(() => {
    async function carregarUsuarioSalvo() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO_USUARIO);
        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (e) {
        console.error("Falha ao carregar usuário do AsyncStorage", e);
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuarioSalvo();
  }, []);

  async function entrar(email: string, senha: string) {
    setCarregando(true);
    setErro(null); // Limpa qualquer erro anterior
    try {
      // Simulação de chamada de API. Em produção, substitua por sua lógica de autenticação real.
      await new Promise((r) => setTimeout(r, 700));

      if (email === "teste@teste.com" && senha === "123") {
        const novoUsuario: Usuario = {
          id: "u1",
          nome: "Cliente Lamborghini",
          email,
          avatar: "https://i.pravatar.cc/200"
        };
        await AsyncStorage.setItem(CHAVE_ARMAZENAMENTO_USUARIO, JSON.stringify(novoUsuario));
        setUsuario(novoUsuario);
        setCarregando(false);
        return true;
      } else {
        const mensagemErro = "E-mail ou senha incorretos.";
        setErro(mensagemErro);
        Alert.alert("Erro de Login", mensagemErro);
        setCarregando(false);
        return false;
      }
    } catch (e) {
      console.error(e);
      const mensagemErro = "Erro ao tentar fazer login. Tente novamente.";
      setErro(mensagemErro);
      Alert.alert("Erro", mensagemErro);
      setCarregando(false);
      return false;
    }
  }

  async function sair() {
    try {
      await AsyncStorage.removeItem(CHAVE_ARMAZENAMENTO_USUARIO);
      setUsuario(null);
    } catch (e) {
      console.error("Falha ao remover usuário do AsyncStorage", e);
    }
  }

  // Memorizamos o valor do contexto para evitar re-renderizações desnecessárias.
  const value = useMemo(() => ({ usuario, entrar, sair, carregando, erro }), [usuario, carregando, erro]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}