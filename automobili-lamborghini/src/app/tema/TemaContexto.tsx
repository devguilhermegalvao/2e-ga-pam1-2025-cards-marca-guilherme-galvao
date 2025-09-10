import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Tema } from './tema';
import { temaPadrao } from './tema';

// Contexto do tema para o provedor
const TemaContexto = createContext<Tema | undefined>(undefined);

// Hook personalizado para consumir o tema de forma segura
export function useTema() {
  const contexto = useContext(TemaContexto);
  if (!contexto) {
    throw new Error('useTema deve ser usado dentro de um TemaProvedor');
  }
  return contexto;
}

// Provedor de tema, que você usaria no componente App.tsx
export function TemaProvedor({ children }: { children: React.ReactNode }) {
  const [tema] = useState<Tema>(temaPadrao);
  
  const value = useMemo(() => tema, [tema]);
  
  return (
    <TemaContexto.Provider value={value}>
      {children}
    </TemaContexto.Provider>
  );
}