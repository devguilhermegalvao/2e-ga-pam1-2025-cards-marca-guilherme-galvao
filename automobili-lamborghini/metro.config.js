const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  // Ajuste o caminho para a raiz do seu projeto.
  // Isso permite que o Webpack e outros empacotadores resolvam os módulos corretamente.
  'App': `${__dirname}/src/app/App.tsx`,
};

module.exports = defaultConfig;