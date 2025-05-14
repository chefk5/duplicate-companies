import tslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintRecommended from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ...eslintRecommended.configs.recommended,
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tslint,
    },
    rules: {
      ...tslint.configs.recommended.rules,
    },
  },

  {
    rules: {
      ...prettier,
    },
  },
];
