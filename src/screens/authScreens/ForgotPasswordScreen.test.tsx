import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { TEST_USER } from '../../configs/test.key.config';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import ForgotPasswordScreen from './ForgotPasswordScreen';

describe('<ForgotPasswordScreen />', () => {
  let WrapperForgotPasswordScreen: React.ReactElement;
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    WrapperForgotPasswordScreen = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <ForgotPasswordScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should render correctly', async () => {
    const { getByTestId } = render(WrapperForgotPasswordScreen);
    await waitFor(() => {
      expect(getByTestId('emailInputForgotPassword')).toBeTruthy();
    });
  });
  it('should have email input', async () => {
    const { getByTestId } = render(WrapperForgotPasswordScreen);
    await waitFor(() => {
      expect(getByTestId('emailInputForgotPassword')).toBeTruthy();
    });
  });
  it('should have send button', async () => {
    const { getByTestId } = render(WrapperForgotPasswordScreen);
    await waitFor(() => {
      expect(getByTestId('sendButtonForgotPassword')).toBeTruthy();
    });
  });
  it('should change email input & send', async () => {
    const { getByTestId } = render(WrapperForgotPasswordScreen);
    await waitFor(() => {
      expect(getByTestId('emailInputForgotPassword')).toBeTruthy();
    });
    fireEvent.changeText(
      getByTestId('emailInputForgotPassword'),
      TEST_USER.email,
    );

    await waitFor(() => {
      expect(getByTestId('emailInputForgotPassword').props.value).toBe(
        TEST_USER.email,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    store.dispatch({ type: 'RESET' });
  });
});
