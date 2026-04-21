const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = defineConfig([
  globalIgnores([
    'dist/*',
    'build/*',
    '.expo/*',
    'node_modules/*',
    'coverage/*',
  ]),
  expoConfig,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
    },
  },
]);