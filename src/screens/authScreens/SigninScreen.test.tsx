import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { TEST_USER } from '../../configs/test.key.config';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import SigninScreen from './SigninScreen';

describe('<SigninScreenRender />', () => {
  let SigninScreenRender: React.ReactElement;
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    SigninScreenRender = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <SigninScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should SigninScreenRender works', async () => {
    const { getByTestId } = render(SigninScreenRender);

    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
  });
  it('should no signin user', async () => {
    const { getByTestId, getAllByText } = render(SigninScreenRender);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('emailInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('passwordInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('signinButton')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('emailInput'), TEST_USER.email);
    fireEvent.changeText(
      getByTestId('passwordInput'),
      TEST_USER.password + '1434',
    );

    fireEvent.press(getByTestId('signinButton'));

    await waitFor(() => {
      expect(navigation.navigate).not.toHaveBeenCalledWith('Home');
    });
  });

  it('should go to forgotPassword', async () => {
    const { getByTestId } = render(SigninScreenRender);
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
    const { getByTestId } = render(SigninScreenRender);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('gotToSignupButton')).toBeTruthy();
    });

    fireEvent.press(getByTestId('gotToSignupButton'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Signup');
    });
  });

  it('should signin user', async () => {
    const { getByTestId } = render(SigninScreenRender);
    await waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('emailInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('passwordInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('signinButton')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('emailInput'), TEST_USER.email);
    fireEvent.changeText(getByTestId('passwordInput'), TEST_USER.password);
    fireEvent.press(getByTestId('signinButton'));

    jest.useRealTimers();

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });

  afterEach(() => {
    // Tear down global state or variables
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
});
