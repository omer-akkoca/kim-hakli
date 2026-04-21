const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
  globalIgnores(['dist/*', 'build/*', '.expo/*', 'node_modules/*', 'coverage/*']),
  expoConfig,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'warn',
    },
  },
]);
