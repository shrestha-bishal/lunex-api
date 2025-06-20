export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
}