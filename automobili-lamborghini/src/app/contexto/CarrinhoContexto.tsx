import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import type { Produto } from "../tipos/tipos";

// Chave para armazenar os itens do carrinho no AsyncStorage
const CHAVE_ARMAZENAMENTO_CARRINHO = '@CarrinhoProvedor:itens';

type ItemCarrinho = { produto: Produto; qtd: number };
type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (p: Produto, qtd?: number) => void;
  remover: (id: number) => void;
  limpar: () => void;
  total: number;
  quantidade: number;
  carregando: boolean;
};

// Criação do contexto com valor inicial indefinido
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) {
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvedor");
  }
  return ctx;
}

export function CarrinhoProvedor({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Efeito para carregar os itens salvos no AsyncStorage quando o provedor é montado.
  useEffect(() => {
    async function carregarItensDoCarrinho() {
      try {
        const itensSalvos = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO_CARRINHO);
        if (itensSalvos) {
          setItens(JSON.parse(itensSalvos));
        }
      } catch (e) {
        console.error("Falha ao carregar o carrinho do AsyncStorage", e);
        Alert.alert("Erro", "Não foi possível carregar o carrinho de compras.");
      } finally {
        setCarregando(false);
      }
    }
    carregarItensDoCarrinho();
  }, []);

  // Função para salvar os itens no AsyncStorage.
  const salvarItens = useCallback(async (novosItens: ItemCarrinho[]) => {
    try {
      await AsyncStorage.setItem(CHAVE_ARMAZENAMENTO_CARRINHO, JSON.stringify(novosItens));
    } catch (e) {
      console.error("Falha ao salvar o carrinho no AsyncStorage", e);
      Alert.alert("Erro", "Não foi possível salvar as alterações no carrinho.");
    }
  }, []);

  const adicionar = useCallback((produto: Produto, qtd = 1) => {
    setItens((prev) => {
      const idx = prev.findIndex((i) => i.produto.id === produto.id);
      let novosItens;
      if (idx >= 0) {
        novosItens = [...prev];
        novosItens[idx] = { ...novosItens[idx], qtd: novosItens[idx].qtd + qtd };
      } else {
        novosItens = [...prev, { produto, qtd }];
      }
      salvarItens(novosItens);
      return novosItens;
    });
  }, [salvarItens]);

  const remover = useCallback((id: number) => {
    setItens((prev) => {
      const novosItens = prev.filter((i) => i.produto.id !== id);
      salvarItens(novosItens);
      return novosItens;
    });
  }, [salvarItens]);

  const limpar = useCallback(() => {
    setItens([]);
    salvarItens([]);
  }, [salvarItens]);

  const total = useMemo(() => itens.reduce((s, it) => s + it.produto.preco * it.qtd, 0), [itens]);
  const quantidade = useMemo(() => itens.reduce((s, it) => s + it.qtd, 0), [itens]);

  const value = useMemo(
    () => ({ itens, adicionar, remover, limpar, total, quantidade, carregando }),
    [itens, adicionar, remover, limpar, total, quantidade, carregando]
  );

  return <CarrinhoContext.Provider value={value}>{children}</CarrinhoContext.Provider>;
}