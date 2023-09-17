import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { AntDesign, Entypo, FontAwesome } from '../../../constants/icons';
import { ITEM_STANDARD_COLORS } from '../../../constants/item';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { useGetpostQuery } from '../../../redux/services/post-service';
import { useGetUserQuery } from '../../../redux/services/profile-service';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { capitalizeFirstLetter } from '../../../utils';
import BottomModal from '../../atoms/BottomModal';
import ItemExtraDetailCompoent from '../../atoms/ItemExtraDetailComponent';
import ShowMapComponent from '../../atoms/Map/ShowMapComponent';
import AnimatedImageComponent from '../Animation/AnimatedImageComponent';
import ContactOwnerComponent from './ContactOwnerComponent';

type props = {
  item: any;
  onClose: () => void;
  isVisible: boolean;
  navigation: any;
};
const ItemViewComponent: React.FC<props> = ({
  item,
  onClose,
  isVisible,
  navigation,
}) => {
  const call = useCallback(() => useGetpostQuery(item.id), [item.id]);
  const { data: detailedItem, isLoading } = call();

  const { data: userWhoPosted } = useGetUserQuery({
    userId: item.userId,
  });
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const user = useSelector(selectCurrentUser);
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };
  const closeMapView = () => {
    setShowMapView(false);
  };
  const closeContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <SafeAreaView>
      <BottomModal
        height={'90%'}
        backgroundFilter={true}
        isVisible={isVisible}
        effect={'fade'}
        onClose={onClose}
        iconName={'close'}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.main_view}>
            <View
              style={{
                width: '90%',
                position: 'absolute',
                zIndex: 5,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                height: '10%',
              }}>
              <TouchableOpacity
                style={[
                  styles.btn_active,
                  {
                    backgroundColor: COLORS.primary,
                    width: '100%',
                    margin: 0,
                  },
                ]}
                onPress={() => setShowContactModal(true)}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.h3,
                    fontWeight: '600',
                  }}>
                  <Entypo name="email" size={20} color={COLORS.white} />
                  {'   '}
                  <Text>Contact Owner</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {isLoading && (
              <ActivityIndicator
                size="large"
                style={{ marginBottom: 20 }}
                color={COLORS.primary}
              />
            )}
            <View style={styles.courosel_view}>
              <GestureHandlerRootView>
                <AnimatedImageComponent
                  urls={[
                    detailedItem.itemPictures[0].url,
                    detailedItem.itemPictures[1].url,
                  ]}
                />
              </GestureHandlerRootView>
            </View>
            <ScrollView style={styles.second_view}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={FONTS.h3}>{detailedItem.itemName}</Text>
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
              </View>
              <View style={styles.description_view}>
                <Text style={FONTS.body3}>
                  Said by{' '}
                  <Text style={FONTS.h4}>
                    {userWhoPosted?.firstName} {userWhoPosted?.lastName}
                  </Text>
                </Text>
                <ScrollView
                  style={{
                    maxHeight: 100,
                  }}>
                  <Text
                    style={{
                      fontWeight: '300',
                      textAlign: 'justify',
                    }}>
                    {detailedItem.description}
                  </Text>
                </ScrollView>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.btn_active}
                  onPress={() => setShowMapView(true)}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.h3,
                      fontWeight: '600',
                    }}>
                    <FontAwesome
                      name="location-arrow"
                      size={20}
                      color={COLORS.black}
                    />
                    <Text>See on map</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={FONTS.body3}>Lost On </Text>
                  <Text style={{ fontWeight: '800' }}>
                    {new Date(detailedItem.dateTime).toDateString()}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={FONTS.body3}>Posted On </Text>
                  <Text style={{ fontWeight: '800' }}>
                    {new Date(detailedItem.createdAt).toDateString()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text style={FONTS.body4}>
                    {detailedItem.isFounded === 0 ? 'Not Found yet' : 'found'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Entypo
                    name="location-pin"
                    size={25}
                    color={COLORS.primary}
                  />
                  <Text>{detailedItem.city}</Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onTouchStart={() => setShowDetailsModal(true)}>
                <AntDesign name="upcircle" size={20} color={COLORS.primary} />
                <Text style={{ fontWeight: '800', marginLeft: 10 }}>
                  View Details
                </Text>
              </View>
              {showMapView && (
                <BottomModal
                  height={'90%'}
                  backgroundFilter={true}
                  isVisible={true}
                  effect={'fade'}
                  onClose={closeMapView}
                  iconName={'close'}>
                  <ShowMapComponent
                    latitude={detailedItem.itemLocation.latitude}
                    longitude={detailedItem.itemLocation.longitude}
                  />
                </BottomModal>
              )}
              {showDetailsModal && (
                <BottomModal
                  height={250}
                  backgroundFilter={true}
                  isVisible={true}
                  effect={'fade'}
                  onClose={closeDetailsModal}
                  iconName={'close'}>
                  <ItemExtraDetailCompoent detailedItem={detailedItem} />
                </BottomModal>
              )}
              {showContactModal && (
                <BottomModal
                  height={Dimensions.get('window').height}
                  backgroundFilter={true}
                  isVisible={true}
                  effect={'fade'}
                  onClose={closeContactModal}
                  iconName={'close'}>
                  <ContactOwnerComponent
                    navigation={navigation}
                    close={closeContactModal}
                    receiverId={user?.id ? item.userId : null}
                  />
                </BottomModal>
              )}
            </ScrollView>
          </View>
        )}
      </BottomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_view: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
  },
  courosel_view: {
    marginTop: 80,
  },
  second_view: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '100%',
    height: '100%',
  },
  description_view: {
    backgroundColor: COLORS.white,
    elevation: 40,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
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
  btn_active: {
    backgroundColor: COLORS.white,
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 10,
  },
});
export default ItemViewComponent;
