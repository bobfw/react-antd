import { defineConfig } from 'oxlint'

import { deferOxlintConfig } from './scripts/oxlint.rules.ts'

export default defineConfig({
  categories: {
    correctness: 'error',
  },
  env: {
    builtin: true,
    es2025: true,
  },
  ignorePatterns: ['dist/', 'src/api/', 'src/routeTree.gen.ts', 'schema.d.ts'],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ['react', 'import', 'react-perf', 'oxc', 'promise', 'typescript', 'unicorn', 'node'],
  jsPlugins: deferOxlintConfig.jsPlugins,
  rules: {
    ...deferOxlintConfig.rules,
    'unicorn-js/name-replacements': 'off',
    'unicorn-js/no-top-level-side-effects': 'off',
  },
})
