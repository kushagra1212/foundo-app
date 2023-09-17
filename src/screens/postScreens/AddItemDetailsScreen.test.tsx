import { render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { BASE_URL } from '../../configs/key.config';
import { TEST_USER } from '../../configs/test.key.config';
import { setCredentials } from '../../redux/slices/authSlice';
import { updateFilter } from '../../redux/slices/postSlice';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import AddItemDetailsScreen from './AddItemDetailsScreen';
const getState = jest.fn();
getState.mockReturnValue({
  routes: [{}, { params: { isFounded: true } }],
});
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  getState,
};
describe('<AddItemDetailsScreen />', () => {
  let WrapperAddItemDetailsScreen: React.FC;

  beforeAll(async () => {
    const data = {
      email: TEST_USER.email,
      password: TEST_USER.password,
    };
    const res: any = await fetch(`${BASE_URL}/v1/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resJson = await res.json();

    store.dispatch(updateFilter({ filterType: 0 }));
    store.dispatch(
      setCredentials({ user: resJson?.user, jwtToken: resJson?.jwtToken }),
    );

    WrapperAddItemDetailsScreen = () => {
      return (
        <Provider store={store}>
          <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
            <AddItemDetailsScreen navigation={navigation} />
          </ErrorBoundary>
        </Provider>
      );
    };
  });

  it('should AddItemDetailsScreen works', async () => {
    const { getByTestId } = render(<WrapperAddItemDetailsScreen />);

    await waitFor(() => {
      expect(getByTestId('AddItemDetails')).toBeTruthy();
    });
  });

  it('should have itemNameInput', async () => {
    const { getByTestId } = render(<WrapperAddItemDetailsScreen />);

    await waitFor(() => {
      expect(getByTestId('itemNameInput')).toBeTruthy();
    });
  });

  afterEach(() => {
    // Tear down global state or variables
    jest.clearAllMocks();
  });
});
