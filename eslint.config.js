const js = require('@eslint/js');
const { includeIgnoreFile } = require('@eslint/compat');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');

module.exports = [
  includeIgnoreFile(require('path').resolve(__dirname, '.gitignore'), 'Imported .gitignore patterns'),
  {
    ignores: ['dist-web-check/**', 'node_modules/**', '.expo/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals['react-native'],
        __DEV__: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-native': reactNative,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-key': 'off',
      'react-native/no-inline-styles': 'off',
      'react-native/no-unused-styles': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-dupe-keys': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
