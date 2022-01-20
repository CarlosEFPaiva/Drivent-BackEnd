/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper,
};
