import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import Error from '../../components/Error';
import { store } from '../../redux/store';
import { handleErrors } from '../../utils';
import ItemScreen from './ItemScreen';

const navigation = {
  navigate: jest.fn(),
};

describe('<ItemScreen />', () => {
  let ItemScreenRender: React.ReactElement;

  beforeAll(() => {
    ItemScreenRender = (
      <Provider store={store}>
        <ErrorBoundary onError={handleErrors} FallbackComponent={Error}>
          <ItemScreen navigation={navigation} />
        </ErrorBoundary>
      </Provider>
    );
  });

  it('should flat list render correctly', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);
    await waitFor(() => {
      expect(getByTestId('card-list')).toBeTruthy();
    });
  });
  it('should find the button with text lost and click', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);

    await waitFor(() => {
      expect(getByTestId('filter_option_Lost')).toBeTruthy();
    });
    fireEvent.press(getByTestId('filter_option_Lost'));
    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
  });

  it('should find the button with text found and click', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);

    await waitFor(() => {
      expect(getByTestId('filter_option_Found')).toBeTruthy();
    });
    fireEvent.press(getByTestId('filter_option_Found'));

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
  });

  it('should find the card with text posted by at the bottom', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);

    await waitFor(() => {
      expect(getByTestId('filter_option_Found')).toBeTruthy();
    });
    fireEvent.press(getByTestId('filter_option_Found'));
    await waitFor(() => {
      expect(getAllByText('posted by')).toBeTruthy();
    });
  });

  it('should find the button View and click and then find the button named Contact Owner', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);

    await waitFor(() => {
      expect(getByTestId('filter_option_Lost')).toBeTruthy();
    });
    fireEvent.press(getByTestId('filter_option_Lost'));

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
    fireEvent.press(getAllByText('View')[0]);

    await waitFor(() => {
      expect(getAllByText('Contact Owner')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('closeButton')).toBeTruthy();
    });
    fireEvent.press(getByTestId('closeButton'));
  });

  it('should find the button View and click and then find the button named See on map', async () => {
    const { getByTestId, getAllByText, getByText } = render(ItemScreenRender);
    await waitFor(() => {
      expect(getByTestId('filter_option_Lost')).toBeTruthy();
    });
    fireEvent.press(getByTestId('filter_option_Lost'));

    await waitFor(() => {
      expect(getAllByText('View')).toBeTruthy();
    });
    fireEvent.press(getAllByText('View')[0]);

    await waitFor(() => {
      expect(getAllByText('See on map')).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('closeButton')).toBeTruthy();
    });
    fireEvent.press(getByTestId('closeButton'));
  });

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
      expect(getAllByText('Black')).toBeTruthy();
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
});
afterEach(() => {
  // Tear down global state or variables
  jest.clearAllMocks();
  jest.useFakeTimers();
});
