import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, lazyPlugins } from 'vite-plus'

import { deferOxlintConfig } from './scripts/oxlint.rules.ts'

// https://vitejs.dev/config/
export default defineConfig({
  fmt: {
    ignorePatterns: ['dist/**', 'src/routeTree.gen.ts', 'src/comm/openapi/schema.d.ts', 'pnpm-lock.yaml'],
    printWidth: 120,
    semi: false,
    singleQuote: true,
    sortImports: true,
    sortTailwindcss: true,
  },
  lint: {
    categories: {
      correctness: 'error',
    },
    env: {
      builtin: true,
      es2025: true,
    },
    ignorePatterns: ['dist/', 'src/api/', 'src/routeTree.gen.ts', 'schema.d.ts'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }, ...deferOxlintConfig.jsPlugins],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['react', 'import', 'react-perf', 'oxc', 'promise', 'typescript', 'unicorn', 'node'],
    rules: {
      ...deferOxlintConfig.rules,
      'unicorn-js/name-replacements': 'off',
      'unicorn-js/no-top-level-side-effects': 'off',
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
  },
  plugins: lazyPlugins(() => [tanstackRouter(), react(), tailwindcss()]) ?? [],
  resolve: {
    tsconfigPaths: true,
  },
  devtools: {
    enabled: false,
  },
})
