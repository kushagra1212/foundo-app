import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { store } from '../../redux/store';
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
  it('should AddItemDetailsScreen works', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AddItemDetailsScreen navigation={navigation} />
      </Provider>,
    );
  });

  //   it('should add item name when user type in itemNameInput', async () => {
  //     const { getByTestId } = render(
  //       <Provider store={store}>
  //         <AddItemDetailsScreen navigation={navigation} />
  //       </Provider>,
  //     );
  //     waitFor(() => {
  //       expect(getByTestId('itemNameInput')).toBeTruthy();
  //     });

  //     const itemNameInput = getByTestId('itemNameInput');

  //     fireEvent.changeText(itemNameInput, 'laptop');

  //     expect(itemNameInput.props.value).toBe('laptop');
  //   });
});
