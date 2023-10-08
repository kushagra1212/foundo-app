import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import ItemScreen from './ItemScreen';

describe('<ItemScreen />', () => {
  let ItemScreenRender: React.ReactElement;
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
    };

    ItemScreenRender = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <ItemScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  // it('should flat list render correctly', async () => {
  //   const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);
  //   await waitFor(() => {
  //     expect(getByTestId('card-list')).toBeTruthy();
  //   });
  // });

  it('should show the additonal filter option', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);
    await waitFor(() => {
      expect(getByTestId('additional-filter-option')).toBeTruthy();
    });
  });

  it('should click on the additonal filter option and show the modal', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);
    await waitFor(() => {
      expect(getByTestId('additional-filter-option')).toBeTruthy();
    });
    fireEvent.press(getByTestId('additional-filter-option'));

    await waitFor(() => {
      expect(getByText('Filter')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText('Brand')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText('Category')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByTestId('slideDownButtonColor')).toBeTruthy();
    });

    fireEvent.press(getByTestId('slideDownButtonColor'));

    await waitFor(() => {
      expect(getAllByText('black')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText('gray')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getAllByText('View All')).toBeTruthy();
    });
    fireEvent.press(getAllByText('View All')[0]);

    await waitFor(() => {
      expect(getByText('mobile phone')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText('tablets')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByText('laptop')).toBeTruthy();
    });

    fireEvent.press(getByText('laptop'));

    await waitFor(() => {
      expect(getByText('Add')).toBeTruthy();
    });
    fireEvent.press(getByText('Add'));
  });

  it('should check and click the searchButton', async () => {
    const { getByTestId } = render(ItemScreenRender);

    await waitFor(() => {
      expect(getByTestId('searchButton')).toBeTruthy();
    });
    fireEvent.press(getByTestId('searchButton'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('FeedSearchScreen');
    });
  });
  afterEach(() => {
    // Tear down global state or variables
    jest.clearAllMocks();
    jest.useFakeTimers();
    store.dispatch({ type: 'RESET' });
  });
});
