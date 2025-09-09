// src/app/contexto/AutenticacaoContexto.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Usuario } from "../tipos";

type AuthContextType = {
  usuario: Usuario | null;
  entrar: (email: string, senha: string) => Promise<boolean>;
  sair: () => void;
  carregando: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAutenticacao() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAutenticacao deve ser usado dentro de AutenticacaoProvedor");
  return ctx;
}

export function AutenticacaoProvedor({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function entrar(email: string, senha: string) {
    setCarregando(true);
    // Simulação: aqui integraria com backend real
    await new Promise((r) => setTimeout(r, 700));
    if (email && senha) {
      setUsuario({ id: "u1", nome: "Cliente Lamborghini", email, avatar: "https://i.pravatar.cc/200" });
      setCarregando(false);
      return true;
    }
    setCarregando(false);
    return false;
  }

  function sair() {
    setUsuario(null);
  }

  const value = useMemo(() => ({ usuario, entrar, sair, carregando }), [usuario, carregando]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
