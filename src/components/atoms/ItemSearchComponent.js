import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Feather } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
const ItemSearchComponent = () => {
  return (
    <View style={styles.item_search}>
      <Feather name="search" size={25} />
      <TextInput
        style={[styles.item_text_ip, FONTS.body3]}
        name="searchItem"
        placeholder="Search Items here.."
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
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  item_text_ip: {
    marginLeft: 10,
  },
});
export default ItemSearchComponent;
