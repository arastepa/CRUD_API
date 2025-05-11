// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const compat = new FlatCompat({
  baseDirectory: './',
   recommendedConfig: {
    extends: ['eslint:recommended'],
  },
});

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];