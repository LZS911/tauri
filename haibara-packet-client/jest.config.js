module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'src/*.{ts,tsx}',
    '!src/api/**/*.{ts,tsx}',
    '!src/**/*.type.{ts,tsx}',
    '!src/**/*.d.{ts,tsx}',
    '!src/main.tsx',
    '!src/router/config.tsx',
    '!src/pages/**/component/index.ts',
    '!src/pages/**/components/index.ts',
    '!src/testUtils/*',
    '!src/locale/**/*',
    '!src/components/**/**/Demo/*',
    '!src/components/**/Demo/*',
    '!src/App.tsx',
    '!src/store/index.ts',
    '!src/router/router.config.tsx',
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
