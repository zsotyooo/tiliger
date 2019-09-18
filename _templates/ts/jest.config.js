require('dotenv-flow').config();

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{(j|t)s,(j|t)sx}'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  // testPathIgnorePatterns: ['lib/', 'node_modules/'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)']
};
