module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
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
    '@typescript-eslint',
    'unused-imports',
    'simple-import-sort',
  ],
  ignorePatterns: ['dist/*'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-len': ['error', { code: 160 }],
    // 'no-unused-vars': ['error', { vars: 'local', args: 'none', ignoreRestSiblings: false }],
    // 'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-extra-semi': 'off',
    'unused-imports/no-unused-imports-ts': 2,
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'simple-import-sort/imports': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
