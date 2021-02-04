module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}', '!<rootDir>/src/index.jsx'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [
    'text',
    'lcov',
    'clover',
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  rootDir: '../',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['<rootDir>/node_modules'],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  resetMocks: true,
  verbose: true,
  transform: {
    '^.+\\.(jsx|js)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest.fileTransformer.js',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
};
