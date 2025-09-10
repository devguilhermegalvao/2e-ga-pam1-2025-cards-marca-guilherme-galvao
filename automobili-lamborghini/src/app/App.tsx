import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AutenticacaoProvedor, useAutenticacao } from './contexto/AutenticacaoContexto';
import { CarrinhoProvedor } from './contexto/CarrinhoContexto';
import { TemaProvedor, useTema } from './tema/TemaContexto';

// Importa as telas
import TelaLogin from './telas/TelaLogin';
import TelaInicial from './telas/TelaInicial';
import TelaDetalhes from './telas/TelaDetalhes';
import TelaCarrinho from './telas/TelaCarrinho';
import TelaPerfil from './telas/TelaPerfil';

// Importa o tipo de navegação de um arquivo centralizado
import { RootStackParams } from './tipos/navegacao';

const Stack = createNativeStackNavigator<RootStackParams>();

// Componente para rotas não autenticadas
const RotasNaoAutenticadas = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TelaLogin" component={TelaLogin} />
    </Stack.Navigator>
  );
};

// Componente para rotas autenticadas
const RotasAutenticadas = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TelaInicial" component={TelaInicial} />
      <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} />
      <Stack.Screen name="TelaCarrinho" component={TelaCarrinho} />
      <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
    </Stack.Navigator>
  );
  
};

// Componente que decide qual grupo de rotas renderizar
function Rotas() {
  const { usuario } = useAutenticacao();
  
  // Lógica de autenticação para renderizar as rotas corretas
  return usuario ? <RotasAutenticadas /> : <RotasNaoAutenticadas />;
}

// Configurações do tema para o NavigationContainer
const NavigationTheme = () => {
  const { cores } = useTema();
  
  const navTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: cores.fundo,
      card: cores.superficie,
      text: cores.texto,
      border: cores.contorno,
      primary: cores.primaria, // Corrigido para `cores.primaria`
    },
  };
  
  return (
    <NavigationContainer theme={navTheme}>
      <Rotas />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <TemaProvedor>
      <AutenticacaoProvedor>
        <CarrinhoProvedor>
          {/* Configuração da barra de status para um visual limpo em telas escuras */}
          <StatusBar style="light" />
          <NavigationTheme />
        </CarrinhoProvedor>
      </AutenticacaoProvedor>
    </TemaProvedor>
  );
}