import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { TEST_USER } from '../../configs/test.key.config';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import SigninScreen from './SigninScreen';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const SigninScreenRender = () => (
  <Provider store={store}>
    <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
      <SigninScreen navigation={navigation} />
    </ErrorBoundary>
  </Provider>
);

describe('<SigninScreenRender />', () => {
  it('should SigninScreenRender works', async () => {
    const { getByTestId } = render(<SigninScreenRender />);

    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
  });
  it('should no signin user', async () => {
    const { getByTestId, getAllByText } = render(<SigninScreenRender />);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('emailInput')).toBeTruthy();
      expect(getByTestId('passwordInput')).toBeTruthy();
      expect(getByTestId('signinButton')).toBeTruthy();
    });

    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const signinButton = getByTestId('signinButton');
    const consoleLogMock = jest.fn();
    jest.spyOn(console, 'log').mockImplementation(consoleLogMock);
    fireEvent.changeText(emailInput, TEST_USER.email);
    fireEvent.changeText(passwordInput, TEST_USER.password + '1434');

    fireEvent.press(signinButton);
    await waitFor(() => {
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });

    expect(navigation.navigate).not.toHaveBeenCalledWith('Home');
  });

  it('should go to forgotPassword', async () => {
    const { getByTestId } = render(<SigninScreenRender />);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('gotToForgotPasswordButton')).toBeTruthy();
    });

    const gotToForgotPasswordButton = getByTestId('gotToForgotPasswordButton');

    fireEvent.press(gotToForgotPasswordButton);

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Forgotpassword');
    });
  });

  it('should go to Signup', async () => {
    const { getByTestId } = render(<SigninScreenRender />);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('gotToSignupButton')).toBeTruthy();
    });

    const gotToSignupButton = getByTestId('gotToSignupButton');

    fireEvent.press(gotToSignupButton);

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Signup');
    });
  });

  it('should signin user', async () => {
    const { getByTestId } = render(<SigninScreenRender />);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('emailInput')).toBeTruthy();
      expect(getByTestId('passwordInput')).toBeTruthy();
      expect(getByTestId('signinButton')).toBeTruthy();
    });

    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const signinButton = getByTestId('signinButton');

    fireEvent.changeText(emailInput, TEST_USER.email);
    fireEvent.changeText(passwordInput, TEST_USER.password);
    fireEvent.press(signinButton);

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });

  afterEach(() => {
    // Tear down global state or variables
    navigation.navigate.mockReset();
    navigation.goBack.mockReset();
    jest.clearAllMocks();
  });
});
