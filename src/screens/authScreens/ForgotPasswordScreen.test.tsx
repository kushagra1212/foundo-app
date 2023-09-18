import { fireEvent, render } from '@testing-library/react-native';
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

  beforeEach(() => {
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
    expect(emailInputForgotPassword).toBeTruthy();
  });

  it('should have email input', async () => {
    expect(emailInputForgotPassword).toBeTruthy();
  });

  it('should change email input', async () => {
    fireEvent.changeText(emailInputForgotPassword, TEST_USER.email);
    expect(emailInputForgotPassword.props.value).toBe(TEST_USER.email);
  });

  it('should have send button', async () => {
    expect(sendButtonForgotPassword).toBeTruthy();
  });
});
