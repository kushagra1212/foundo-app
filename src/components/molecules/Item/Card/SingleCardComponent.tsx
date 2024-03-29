import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { memo, useCallback, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Entypo } from '../../../../constants/icons';
import { ITEM_STANDARD_COLORS } from '../../../../constants/item';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { Post } from '../../../../interfaces';
import { selectCurrentUserId } from '../../../../redux/slices/authSlice';
import { capitalizeEveryWord, capitalizeFirstLetter } from '../../../../utils';
import BackDropComponent from '../../Animation/BackDropComponent';
import ItemViewComponent from '../ItemViewComponent';

export type SingleCardProps = {
  item: Post;
  navigation: any;
};
const SingleCardComponent: React.FC<SingleCardProps> = ({
  item,
  navigation,
}) => {
  const currentUserId = useSelector(selectCurrentUserId);

  const itemViewBottomSheetRef = useRef<BottomSheetModal>(null);

  const isCurrentUser = currentUserId && item.fk_userId === currentUserId;
  const firstName = isCurrentUser ? 'You' : item.firstName;

  const closeItemViewBottomSheet = useCallback(() => {
    itemViewBottomSheetRef.current?.close();
  }, []);

  return (
    <View style={styles.card}>
      <BottomSheetModal
        ref={itemViewBottomSheetRef}
        index={1}
        snapPoints={['90%', '90%']}
        handleStyle={[styles.header_style, { backgroundColor: COLORS.white }]}
        backdropComponent={BackDropComponent}>
        <ItemViewComponent
          item={item}
          navigation={navigation}
          closeModal={closeItemViewBottomSheet}
        />
      </BottomSheetModal>

      <View style={styles.card_header}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      </View>
      <View style={styles.card_footer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.item_name}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.h3,
                fontWeight: '700',
              }}>
              {capitalizeFirstLetter(item.itemName)}
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={[FONTS.body3, { color: COLORS.black }]}>
              {capitalizeEveryWord(item.category)}
            </Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '400',
              textAlign: 'left',
            }}>
            {item.description}
          </Text>
        </View>
        <View style={styles.lost_when}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '400',
            }}>
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
              marginRight: 10,
            }}>
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
              {' ' + capitalizeFirstLetter(item.color)}
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body3,
              fontWeight: '600',
              textAlign: 'center',
              margin: 5,
            }}>
            {item.brand}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => itemViewBottomSheetRef.current?.present()}
            style={styles.view_details}
            testID="viewDetailsButton">
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
                textAlign: 'center',
              }}>
              View
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '45%',
            }}>
            <Text
              style={{
                fontSize: SIZES.body4,
              }}>
              <Text
                style={{
                  fontWeight: '300',
                }}>
                posted by
              </Text>{' '}
              {firstName}
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
    borderRadius: 20,
    elevation: 30,
    width: '90%',
    alignSelf: 'center',
    margin: 20,
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
    backgroundColor: COLORS.white,
  },
  item_name: {
    margin: 5,
    marginLeft: 10,
  },
  description: {
    margin: 5,
    marginLeft: 10,
  },
  lost_when: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginLeft: 10,
  },
  color_brand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
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
    elevation: 30,
    padding: 10,
    width: 100,
    height: 40,
    margin: 5,
    marginLeft: 10,
  },
  view_details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    elevation: 1,
    borderTopRightRadius: 30,
    width: '50%',
    height: 50,
    marginTop: 10,
  },
  category: {
    zIndex: 5,
    borderRadius: 5,
    padding: 1,
    transform: [{ rotate: '0 deg' }],
    margin: 10,
  },
  header_style: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default memo(SingleCardComponent);
