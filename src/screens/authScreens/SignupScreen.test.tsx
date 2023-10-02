import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { TEST_USER } from '../../configs/test.key.config';
import { store } from '../../redux/store';
import SignupScreen from './SignupScreen';

describe('<SignupScreen/>', () => {
  let WrapperSignupScreen: React.ReactElement;
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    WrapperSignupScreen = (
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={Error}>
          <SignupScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should render SignupScreen', async () => {
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      expect(getByTestId('Signup')).toBeTruthy();
    });
  });

  it('should render signup button', async () => {
    const { getByTestId } = render(WrapperSignupScreen);
    await waitFor(() => {
      expect(getByTestId('signupButton')).toBeTruthy();
    });
  });

  it('should render first name input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);
    await waitFor(() => {
      expect(getByTestId('firstNameInput')).toBeTruthy();
    });
  });

  it('should render last name input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);
    await waitFor(() => {
      expect(getByTestId('lastNameInput')).toBeTruthy();
    });
  });

  it('should render email input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);
    await waitFor(() => {
      expect(getByTestId('emailInput')).toBeTruthy();
    });
  });

  it('should render password input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);
    await waitFor(() => {
      expect(getByTestId('passwordInput')).toBeTruthy();
    });
  });

  it('should fill email input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);
    fireEvent.changeText(getByTestId('emailInput'), TEST_USER.email);
    await waitFor(() => {
      expect(getByTestId('emailInput').props.value).toBe(TEST_USER.email);
    });
  });

  it('should fill password input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      expect(getByTestId('passwordInput')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('passwordInput'), TEST_USER.password);
    await waitFor(() => {
      expect(getByTestId('passwordInput').props.value).toBe(TEST_USER.password);
    });
  });

  it('should fill first name input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      expect(getByTestId('firstNameInput')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('firstNameInput'), TEST_USER.firstName);
    await waitFor(() => {
      expect(getByTestId('firstNameInput').props.value).toBe(
        TEST_USER.firstName,
      );
    });
  });

  it('should fill last name input', async () => {
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      expect(getByTestId('lastNameInput')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('lastNameInput'), TEST_USER.lastName);
    await waitFor(() => {
      expect(getByTestId('lastNameInput').props.value).toBe(TEST_USER.lastName);
    });
  });

  it('should submit form', async () => {
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      expect(getByTestId('signupButton')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('emailInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('passwordInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('firstNameInput')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('lastNameInput')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('emailInput'), TEST_USER.email);
    fireEvent.changeText(getByTestId('passwordInput'), TEST_USER.password);
    fireEvent.changeText(getByTestId('firstNameInput'), TEST_USER.firstName);
    fireEvent.changeText(getByTestId('lastNameInput'), TEST_USER.lastName);

    fireEvent.press(getByTestId('signupButton'));

    await waitFor(() => {
      expect(navigation.navigate).not.toHaveBeenCalledWith('Signin');
    });
  });

  it('should go to signin screen', async () => {
    const { getByTestId } = render(WrapperSignupScreen);

    await waitFor(() => {
      expect(getByTestId('gotToSigninButton')).toBeTruthy();
    });

    fireEvent.press(getByTestId('gotToSigninButton'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Signin');
    });
  });

  afterEach(() => {
    // Tear down global state or variables
    jest.clearAllMocks();
    jest.useFakeTimers();
    store.dispatch({ type: 'RESET' });
  });
});
