/**
 * Additional setup code that should run before Jest starts.
 *
 * Note that this file is different from `jest.config.js`, as that file cannot
 * actually call any `jest` methods whereas this one can (each file gets loaded
 * during a different part of Jest's lifecycle).
 *
 * @module jestSetup
 * @see module:jestConfig
 */

/**
 * Prevent error 'expo-linking needs access to the expo-constants manifest' when
 * running unit tests.
 *
 * @see https://github.com/expo/expo/issues/18742
 */
jest.useFakeTimers();

jest.mock('expo-linking', () => {
  const module: typeof import('expo-linking') = {
    ...jest.requireActual('expo-linking'),
    createURL: jest.fn(),
  };

  return module;
});
