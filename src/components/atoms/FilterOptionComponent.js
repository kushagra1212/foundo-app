import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
export const FILTER_ITEMS = [
  { id: 1, text: 'lost' },
  { id: 2, text: 'founded' },
  { id: 3, text: 'add filter' },
];
const FilterOptionComponent = ({
  item,
  selectedFilterId,
  handleChangeFilter,
}) => {
  const isItemSelected = (id) => {
    return id === selectedFilterId;
  };

  return (
    <TouchableOpacity
      onPress={() => handleChangeFilter(item.id)}
      style={[
        styles.base_option,
        isItemSelected(item.id)
          ? styles.selected_option
          : styles.not_selected_option,
      ]}
    >
      <Text
        style={[
          FONTS.h4,
          isItemSelected(item.id)
            ? styles.selected_option_text
            : styles.not_selected_option_text,
        ]}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base_option: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,

    height: '80%',
  },
  selected_option: {
    backgroundColor: COLORS.primary,
    elevation: 10,
  },
  not_selected_option: {
    backgroundColor: COLORS.GrayPrimary,
  },
  selected_option_text: {
    color: COLORS.white,
  },
  not_selected_option_text: {
    color: COLORS.blackSecondary,
  },
});
export default FilterOptionComponent;
