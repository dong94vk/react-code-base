const { defaults } = require("jest-config");
function getConfig() {
  return {
    // modulePaths: ['<rootDir>/'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
    modulePaths: ["<rootDir>/src/"],
    rootDir: "../",
    setupFiles: ["<rootDir>/jest/setupTest.ts"],
    testMatch: [
      ...defaults.testMatch,
      "**/__tests__/**/*.ts?(x)",
      "**/?(*.)+(spec|test).ts?(x)",
    ],
    transform: { "^.+\\.tsx?$": "ts-jest" },
  };
}

module.exports = getConfig();
