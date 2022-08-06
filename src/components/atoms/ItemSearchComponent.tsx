import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Feather } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
export type props = {
  isItemScreenClick: boolean;
  navigation?: any;
};
const ItemSearchComponent: React.FC<props> = ({
  isItemScreenClick,
  navigation,
}) => {
  const handleOnFocus = () => {
    if (isItemScreenClick) navigation.navigate('FeedSearchScreen');
  };
  return (
    <View style={styles.item_search}>
      <Feather name="search" size={25} />
      <TextInput
        style={[styles.item_text_ip, FONTS.body3]}
        placeholder="Search Items here.."
        onFocus={handleOnFocus}
        autoFocus={!isItemScreenClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item_search: {
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    margin: 5,
    borderRadius: 10,
  },
  item_text_ip: {
    marginLeft: 10,
    width: '90%',
  },
});
export default ItemSearchComponent;
