import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Feather } from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
export type props = {
  item: any;
};
const SingleCardComponent: React.FC<props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.card_header}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.item_name}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h1,
              fontWeight: '700',
            }}
          >
            {item.itemName}
          </Text>
        </View>
        <View style={styles.mid}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'scroll',
    borderRadius: 10,
    elevation: 10,
    margin: 10,
  },
  card_header: {
    width: '100%',
    height: 'auto',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  item_name: {
    height: SIZES.title,
    bottom: 10,
    zIndex: 2,
    position: 'absolute',
  },
  mid: {
    height: 100,
    borderRadius: 10,
    bottom: 5,
    backgroundColor: COLORS.white,
  },
});
export default SingleCardComponent;
