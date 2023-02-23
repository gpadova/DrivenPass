module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/tests/**/*.(test|spec).ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/tests/$1",
    "axios": "axios/dist/node/axios.cjs"
  },
  restoreMocks: true,
};

// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: ["<rootDir>/tests/**/*.(test|spec).ts"],
//   testPathIgnorePatterns: ['/node_modules/'],
//   coverageDirectory: './coverage',
//   coveragePathIgnorePatterns: ['node_modules', 'src/database', 'src/test', 'src/types'],
//   reporters: ['default', 'jest-junit'],
//   globals: { 'ts-jest': { diagnostics: false } },
//   transform: {},
//   transformIgnorePatterns: [
//     "/node_modules/(?!test-component).+\\.js$"
//   ]
// };