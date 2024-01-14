module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-react'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { 'code': 100 }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    'eol-last': ['error', 'always'],
    'react/self-closing-comp': ['error', { 'component': true, 'html': true }],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned']
  },
};