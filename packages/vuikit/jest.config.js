module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  modulePaths: [
    '<rootDir>/../../node_modules',
    '<rootDir>/../../packages'
  ],
  'modulePathIgnorePatterns': [
    '<rootDir>/dist'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ]
}
