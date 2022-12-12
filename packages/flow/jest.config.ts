import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  rootDir: './src',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  preset: 'ts-jest',
  // see: https://stackoverflow.com/questions/73203367/jest-syntaxerror-unexpected-token-export-with-uuid-library
  moduleNameMapper: { '^uuid$': 'uuid' }
};

export default config;
