// Taxas de câmbio simuladas. Em um ambiente de produção, estes valores seriam obtidos de uma API em tempo real.
const TAXAS_CAMBIO = {
  BRL: 1,      // Base
  USD: 0.18,   // Valor de 1 BRL em USD
  EUR: 0.17    // Valor de 1 BRL em EUR
};

/**
 * `formatarMoeda` é uma função utilitária que formata um número para o formato de moeda,
 * com suporte para conversão de câmbio e tratamento de valores zero.
 * @param valor O valor numérico original, na moeda base (BRL).
 * @param moeda A moeda desejada para a formatação e conversão (ex: 'BRL', 'USD', 'EUR').
 * @param locale A localidade para a formatação (ex: 'pt-BR', 'en-US', 'de-DE').
 * @returns Retorna uma string formatada como moeda ou "Sob consulta" se o valor for zero.
 */
export const formatarMoeda = (valor: number, moeda: 'BRL' | 'USD' | 'EUR', locale: string): string => {
  if (valor === 0) {
    return "Sob consulta";
  }

  const taxa = TAXAS_CAMBIO[moeda];
  if (!taxa) {
    console.error(`Moeda "${moeda}" não suportada.`);
    return "Erro na conversão";
  }

  const valorConvertido = valor * taxa;

  return new Intl.NumberFormat(locale, { style: 'currency', currency: moeda }).format(valorConvertido);
};