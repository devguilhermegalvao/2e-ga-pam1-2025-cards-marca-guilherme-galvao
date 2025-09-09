// src/app/contexto/CarrinhoContexto.tsx
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Produto } from "../tipos";

type ItemCarrinho = { produto: Produto; qtd: number };
type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (p: Produto, qtd?: number) => void;
  remover: (id: number) => void;
  limpar: () => void;
  total: number;
  quantidade: number;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvedor");
  return ctx;
}

export function CarrinhoProvedor({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionar = useCallback((produto: Produto, qtd = 1) => {
    setItens((prev) => {
      const idx = prev.findIndex((i) => i.produto.id === produto.id);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qtd: clone[idx].qtd + qtd };
        return clone;
      }
      return [...prev, { produto, qtd }];
    });
  }, []);

  const remover = useCallback((id: number) => setItens((prev) => prev.filter((i) => i.produto.id !== id)), []);
  const limpar = useCallback(() => setItens([]), []);

  const total = useMemo(() => itens.reduce((s, it) => s + it.produto.preco * it.qtd, 0), [itens]);
  const quantidade = useMemo(() => itens.reduce((s, it) => s + it.qtd, 0), [itens]);

  const value = useMemo(() => ({ itens, adicionar, remover, limpar, total, quantidade }), [itens, adicionar, remover, limpar, total, quantidade]);

  return <CarrinhoContext.Provider value={value}>{children}</CarrinhoContext.Provider>;
}
