import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import { ReactTestInstance } from 'react-test-renderer';

import Error from '../../components/Error';
import { TEST_USER } from '../../configs/test.key.config';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import ForgotPasswordScreen from './ForgotPasswordScreen';
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('<ForgotPasswordScreen />', () => {
  let WrapperForgotPasswordScreen: React.ReactElement;
  let emailInputForgotPassword: ReactTestInstance;
  let sendButtonForgotPassword: ReactTestInstance;

  beforeAll(() => {
    WrapperForgotPasswordScreen = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <ForgotPasswordScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );

    const { getByTestId } = render(WrapperForgotPasswordScreen);

    emailInputForgotPassword = getByTestId('emailInputForgotPassword');

    sendButtonForgotPassword = getByTestId('sendButtonForgotPassword');
  });

  it('should render correctly', async () => {
    await waitFor(() => {
      expect(emailInputForgotPassword).toBeTruthy();
    });
  });
  it('should have email input', async () => {
    await waitFor(() => {
      expect(emailInputForgotPassword).toBeTruthy();
    });
  });
  it('should change email input', async () => {
    fireEvent.changeText(emailInputForgotPassword, TEST_USER.email);

    await waitFor(() => {
      expect(emailInputForgotPassword.props.value).toBe(TEST_USER.email);
    });
  });

  it('should have send button', async () => {
    expect(sendButtonForgotPassword).toBeTruthy();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });
});
