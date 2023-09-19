import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import { ReactTestInstance } from 'react-test-renderer';

import Error from '../../components/Error';
import { TEST_USER } from '../../configs/test.key.config';
import { store } from '../../redux/store';
import SignupScreen from './SignupScreen';
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};
describe('<SignupScreen/>', () => {
  let WrapperSignupScreen: React.ReactElement;
  let emailInput: ReactTestInstance;
  let passwordInput: ReactTestInstance;
  let firstNameInput: ReactTestInstance;
  let lastNameInput: ReactTestInstance;
  let signupButton: ReactTestInstance;
  let gotToSigninButton: ReactTestInstance;

  beforeAll(async () => {
    WrapperSignupScreen = (
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={Error}>
          <SignupScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      emailInput = getByTestId('emailInput');
    });

    passwordInput = getByTestId('passwordInput');
    firstNameInput = getByTestId('firstNameInput');
    lastNameInput = getByTestId('lastNameInput');
    signupButton = getByTestId('signupButton');
    gotToSigninButton = getByTestId('gotToSigninButton');
  });

  it('should render SignupScreen', () => {
    const { getByTestId } = render(WrapperSignupScreen);
    const signupScreen = getByTestId('Signup');
    expect(signupScreen).toBeTruthy();
  });

  it('should render signup button', () => {
    expect(signupButton).toBeTruthy();
  });

  it('should render first name input', () => {
    expect(firstNameInput).toBeTruthy();
  });

  it('should render last name input', () => {
    expect(lastNameInput).toBeTruthy();
  });

  it('should render email input', () => {
    expect(emailInput).toBeTruthy();
  });

  it('should render password input', () => {
    expect(passwordInput).toBeTruthy();
  });

  it('should fill email input', () => {
    fireEvent.changeText(emailInput, TEST_USER.email);
    expect(emailInput.props.value).toBe(TEST_USER.email);
  });

  it('should fill password input', () => {
    fireEvent.changeText(passwordInput, TEST_USER.password);
    expect(passwordInput.props.value).toBe(TEST_USER.password);
  });

  it('should fill first name input', () => {
    fireEvent.changeText(firstNameInput, TEST_USER.firstName);
    expect(firstNameInput.props.value).toBe(TEST_USER.firstName);
  });

  it('should fill last name input', () => {
    fireEvent.changeText(lastNameInput, TEST_USER.lastName);
    expect(lastNameInput.props.value).toBe(TEST_USER.lastName);
  });

  it('should submit form', async () => {
    const consoleLogMock = jest.fn();
    jest.spyOn(console, 'log').mockImplementation(consoleLogMock);
    fireEvent.changeText(emailInput, TEST_USER.email);
    fireEvent.changeText(passwordInput, TEST_USER.password);
    fireEvent.changeText(firstNameInput, TEST_USER.firstName);
    fireEvent.changeText(lastNameInput, TEST_USER.lastName);

    fireEvent.press(signupButton);
    await waitFor(() => {
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });

    expect(navigation.navigate).not.toHaveBeenCalledWith('Signin');
  });

  it('should go to signin screen', async () => {
    fireEvent.press(gotToSigninButton);
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Signin');
    });
  });

  afterEach(() => {
    // Tear down global state or variables
    jest.useFakeTimers();
  });
});
