module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic/ts'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'comma-dangle': ['error', 'never'],
    'max-len': ["error", { "code": 100 }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@stylistic/ts/object-curly-spacing': ['error', 'always'],
    '@stylistic/ts/key-spacing': ['error', { beforeColon: false }]
  },
};