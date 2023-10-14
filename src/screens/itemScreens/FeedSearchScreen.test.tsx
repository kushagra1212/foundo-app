import { render } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import FeedSearchSceen from './FeedSearchScreen';

describe('<FeedSearchSceen />', () => {
  let FeedSearchSceenRender: React.ReactElement;
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    FeedSearchSceenRender = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <FeedSearchSceen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should FeedSearchSceen works', async () => {
    const { getByTestId, getAllByText, getByText } = render(
      FeedSearchSceenRender,
    );
    expect(getByTestId('searchInput')).toBeTruthy();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
});
