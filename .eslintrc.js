module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'max-len': ['error', { code: 160 }],
    'no-unused-vars': ['error', { vars: 'local', args: 'none', ignoreRestSiblings: false }],
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-extra-semi': 'off',
  },
};
