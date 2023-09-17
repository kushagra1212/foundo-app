import { NavigationContainer } from '@react-navigation/native';
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { prefix } from '../../components/Foundo';
import { routesConfig } from '../../configs/routesConfig';
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
    <NavigationContainer
      linking={{
        prefixes: [prefix],
        config: routesConfig,
      }}>
      <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
        <SigninScreen navigation={navigation} />
      </ErrorBoundary>
    </NavigationContainer>
  </Provider>
);

describe('<SigninScreenRender />', () => {
  it('should SigninScreenRender works', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SigninScreenRender />,
    );

    waitFor(() => {
      expect(getByTestId('Signin')).toBeTruthy();
    });
  });

  it('should signin user', async () => {
    const { getByTestId } = render(<SigninScreenRender />);

    console.log(render(<SigninScreenRender />).toJSON());
    waitFor(() => {
      expect(screen.getByPlaceholderText('Email ID')).toBeTruthy();
      expect(screen.getByPlaceholderText('Password')).toBeTruthy();
      expect(getByTestId('signinButton')).toBeTruthy();
    });
    const emailInput = screen.getByPlaceholderText('Email ID');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signinButton = getByTestId('signinButton');

    fireEvent.changeText(emailInput, TEST_USER.email);
    fireEvent.changeText(passwordInput, TEST_USER.password);
    fireEvent.press(signinButton);

    waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
