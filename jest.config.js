const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
  rootDir: 'resources/js',
  testMatch: [ "<rootDir>/__tests__/**/*.[jt]s?(x)"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};