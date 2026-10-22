export default {
  '*': 'vp fmt --no-error-on-unmatched-pattern',
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['vp lint'],
}
