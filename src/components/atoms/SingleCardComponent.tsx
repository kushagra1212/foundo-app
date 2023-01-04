import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, Ionicons } from '../../constants/icons';
import { ITEM_STANDARD_COLORS } from '../../constants/item';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { Post } from '../../interfaces';
import { capitalizeFirstLetter } from '../../utils';
export type props = {
  item: Post;
};
const SingleCardComponent: React.FC<props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.card_header}>
        <View style={styles.category}>
          <Text style={{ color: COLORS.white }}>{item.category}</Text>
        </View>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      </View>
      <View style={styles.card_footer}>
        <View style={styles.item_name}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h3,
              fontWeight: '700',
            }}
          >
            {capitalizeFirstLetter(item.itemName)}
          </Text>
        </View>
        <View style={styles.description}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '400',
              textAlign: 'left',
            }}
          >
            {item.description}
          </Text>
        </View>

        <View style={styles.lost_when}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '400',
            }}
          >
            <Entypo
              style={{ width: '10%', fontWeight: '100', opacity: 0.6 }}
              name="clock"
              size={15}
            />{' '}
            {new Date(item.dateTime).toDateString()}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '400',
            }}
          >
            <Entypo
              style={{ width: '10%', fontWeight: '100', opacity: 0.8 }}
              name="location-pin"
              size={20}
            />
            {item.city}
          </Text>
        </View>
        <View style={styles.color_brand}>
          <View style={styles.color_view}>
            <View
              style={{
                ...styles.color,
                backgroundColor: ITEM_STANDARD_COLORS.get(item.color),
              }}
            />

            <Text style={{ ...FONTS.body3, lineHeight: 20 }}>
              {capitalizeFirstLetter(item.color)}
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '600',
              textAlign: 'center',
              margin: 5,
            }}
          >
            {item.brand}
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={styles.view_details}>
            <Text>View</Text>
            <Ionicons
              style={{ opacity: 0.9, margin: 5 }}
              name="ios-open"
              size={25}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: SIZES.body4,
                alignSelf: 'flex-end',
                margin: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: '300',
                }}
              >
                posted by
              </Text>{' '}
              {item.firstName}
            </Text>
          </View>
        </View>
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
    position: 'relative',
  },
  card_footer: {
    backgroundColor: COLORS.white,
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  item_name: {
    margin: 5,
  },
  description: {
    margin: 5,
  },
  lost_when: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  color_brand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  color_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    elevation: 2,
    padding: 10,
    width: 100,
    height: 40,
    margin: 5,
  },
  view_details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGraySecondary,
    elevation: 1,
    borderRadius: 10,
    margin: 5,
    paddingLeft: 5,
  },
  category: {
    fontSize: SIZES.h2,
    backgroundColor: COLORS.black,
    position: 'absolute',
    zIndex: 5,
    elevation: 30,
    borderRadius: 5,
    padding: 1,
    alignSelf: 'flex-end',
    transform: [{ rotate: '15 deg' }],
    marginTop: 10,
  },
});
export default SingleCardComponent;
