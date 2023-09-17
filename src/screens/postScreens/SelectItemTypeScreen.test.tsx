import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { store } from '../../redux/store';
import SelectItemTypeScreen from './SelectItemTypeScreen';

describe('<SelectItemTypeScreen />', () => {
  it('should SelectItemTypeScreen works', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectItemTypeScreen navigation={navigation} />
      </Provider>,
    );

    expect(getByTestId('lostItemButton')).toBeTruthy();
    expect(getByTestId('foundItemButton')).toBeTruthy();
  });

  it('should goto AddItemDetailsScreen when click on lostItemButton', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectItemTypeScreen navigation={navigation} />
      </Provider>,
    );

    const lostItemButton = getByTestId('lostItemButton');

    fireEvent.press(lostItemButton);

    expect(navigation.navigate).toHaveBeenCalledWith('AddItemDetailsScreen', {
      isFounded: false,
    });
  });
  it('should goto AddItemDetailsScreen when click on foundItemButton', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectItemTypeScreen navigation={navigation} />
      </Provider>,
    );

    const foundItemButton = getByTestId('foundItemButton');

    fireEvent.press(foundItemButton);

    expect(navigation.navigate).toHaveBeenCalledWith('AddItemDetailsScreen', {
      isFounded: true,
    });
  });
});
