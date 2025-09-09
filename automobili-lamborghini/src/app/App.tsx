import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AutenticacaoProvedor } from './contexto/AutenticacaoContexto';
import { CarrinhoProvedor } from './contexto/CarrinhoContexto';
import TelaLogin from './telas/TelaLogin';
import TelaInicial from './telas/TelaInicial';
import TelaDetalhes from './telas/TelaDetalhes';
import TelaCarrinho from './telas/TelaCarrinho';
import TelaPerfil from './telas/TelaPerfil';
import { tema } from './tema/tema';

export type RootStackParams = {
  TelaLogin: undefined;
  TelaInicial: undefined;
  TelaDetalhes: { id: number } | undefined;
  TelaCarrinho: undefined;
  TelaPerfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: tema.cores.fundo,
    card: tema.cores.superficie,
    text: tema.cores.texto,
    border: tema.cores.contorno,
    primary: DefaultTheme.colors.primary,
    notification: DefaultTheme.colors.notification,
  },
};

export default function App() {
  return (
    <AutenticacaoProvedor>
      <CarrinhoProvedor>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TelaLogin" component={TelaLogin} />
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} />
            <Stack.Screen name="TelaCarrinho" component={TelaCarrinho} />
            <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoProvedor>
    </AutenticacaoProvedor>
  );
}
