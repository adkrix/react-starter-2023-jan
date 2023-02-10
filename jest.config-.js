const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' } )
};

// "jest": {
//  "collectCoverageFrom": [
//    "src/**/*.{js,jsx,ts,tsx}",
//    "!src/**/*.stories.{js,jsx,ts,tsx}",
//    "!src/stories/**",
//    "!src/test/**",
//    "!src/index.tsx",
//    "!src/reportWebVitals.ts"
//  ]
// },