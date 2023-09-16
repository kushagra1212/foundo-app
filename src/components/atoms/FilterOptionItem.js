import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONTS } from '../../constants/theme';
export const LOST_ITEM = 0;
export const FOUND_ITEM = 1;
export const FILTER_ITEMS = [
  { id: LOST_ITEM, text: 'Lost' },
  { id: FOUND_ITEM, text: 'Found' },
];
const FilterOptionComponent = ({
  item,
  selectedFilterId,
  handleChangeFilter,
}) => {
  const isItemSelected = id => {
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
      disabled={isItemSelected(item.id)}>
      <Text
        style={[
          FONTS.h4,
          isItemSelected(item.id)
            ? styles.selected_option_text
            : styles.not_selected_option_text,
        ]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base_option: {
    borderRadius: 10,
    display: 'flex',
    padding: 15,
    elevation: 15,
    height: '80%',
    zIndex: 3,
    marginBottom: 20,
    marginTop: 20,
  },
  selected_option: {
    backgroundColor: COLORS.primary,
  },
  not_selected_option: {
    backgroundColor: COLORS.GrayPrimary,
  },
  selected_option_text: {
    color: COLORS.white,
  },
  not_selected_option_text: {
    color: COLORS.black,
  },
});
export default FilterOptionComponent;
