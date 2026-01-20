import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['dist', 'node_modules', 'coverage', '.env', '.env.*'],
  },
  {
    extends: [eslint.configs.recommended, nodePlugin.configs['flat/recommended-module']],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.node,
    },
    plugins: {
      n: nodePlugin,
    },
    rules: {
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-process-exit': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  prettierConfig,
);
