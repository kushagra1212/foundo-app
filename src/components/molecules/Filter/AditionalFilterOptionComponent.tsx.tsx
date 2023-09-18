import { StyleSheet, TouchableOpacity } from 'react-native';

import { AntDesign, FontAwesome } from '../../../constants/icons';
import { COLORS } from '../../../constants/theme';

type Props = {
  isFilterOptionSelected: boolean;
  onModalOpen: () => void;
};
const AdditionalFilterOptionComponent: React.FC<Props> = ({
  isFilterOptionSelected,
  onModalOpen,
}) => {
  return (
    <TouchableOpacity
      style={[styles.base_option]}
      onPress={onModalOpen}
      testID="additional-filter-option">
      {isFilterOptionSelected ? (
        <FontAwesome style={{ fontWeight: '100' }} name="filter" size={40} />
      ) : (
        <AntDesign style={{ fontWeight: '100' }} name="filter" size={40} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base_option: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    elevation: 80,
    backgroundColor: COLORS.white,
    height: 50,
    justifyContent: 'center',
  },
  selected_option_text: {
    color: COLORS.white,
  },
  not_selected_option_text: {
    color: COLORS.blackSecondary,
  },
});
export default AdditionalFilterOptionComponent;
