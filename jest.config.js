/**
 * Jest config file for Expo projects.
 *
 * @module jestConfig
 * @see https://jestjs.io/docs/configuration
 * @see https://docs.expo.dev/guides/testing-with-jest/
 */

const { join } = require('node:path');
module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  /** @see module:jestSetup */
  setupFiles: [join(__dirname, 'jest.setup.ts')],
};
