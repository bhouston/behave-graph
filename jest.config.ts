export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  resolver: 'ts-jest-resolver',
  testMatch: ['<rootDir>/packages/*/src/**/*.test.ts'],
  moduleNameMapper: { '^uuid$': 'uuid' } // see: https://stackoverflow.com/questions/73203367/jest-syntaxerror-unexpected-token-export-with-uuid-library
};
