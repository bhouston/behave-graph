export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '/src/**/*.{js,jsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  rootDir: './src'
};
