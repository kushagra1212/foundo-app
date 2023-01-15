import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
type props = {
  detailedItem: any;
};
const ItemExtraDetailComponent: React.FC<props> = ({ detailedItem }) => {
  return (
    <View style={{ backgroundColor: COLORS.lightGrayPrePrimary }}>
      <View style={styles.item_detail_content}>
        <Text style={[FONTS.body3, { color: COLORS.white }]}>Brand</Text>
        <Text style={[{ fontWeight: '800' }, { color: COLORS.white }]}>
          {detailedItem.brand}
        </Text>
      </View>
      <View style={styles.item_detail_content}>
        <Text style={[FONTS.body3, { color: COLORS.white }]}>Category</Text>
        <Text style={[{ fontWeight: '800' }, { color: COLORS.white }]}>
          {detailedItem.category}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item_detail_content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 20,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    padding: 20,
    margin: 5,
  },
});

export default ItemExtraDetailComponent;
