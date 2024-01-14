import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: ['.*.spec.tsx'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts*'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['src/__tests__'],
  coverageReporters: ['text', 'html']
};

export default config;