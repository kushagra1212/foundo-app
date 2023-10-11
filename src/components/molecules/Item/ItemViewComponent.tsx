import { memo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
} from '../../../constants/icons';
import { ITEM_STANDARD_COLORS } from '../../../constants/item';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { useLazyGetIsAContactQuery } from '../../../redux/services/message-service';
import { useGetpostQuery } from '../../../redux/services/post-service';
import { useGetUserQuery } from '../../../redux/services/profile-service';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { capitalizeFirstLetter } from '../../../utils';
import ItemExtraDetailCompoent from '../../atoms/Item/ItemExtraDetailComponent';
import ShowMapComponent from '../../atoms/Map/ShowMapComponent';
import BottomModal from '../../atoms/Other/BottomModal';
import AnimatedImageComponent from '../Animation/AnimatedImageComponent';
import ContactOwnerComponent from './ContactOwnerComponent';
type props = {
  item: any;
  navigation: any;
  closeModal: () => void;
};

const ItemViewComponent: React.FC<props> = ({
  item,
  navigation,
  closeModal,
}) => {
  const { data: detailedItem, isLoading } = useGetpostQuery(item.id);

  const [getIsAContact] = useLazyGetIsAContactQuery();
  const { data: userWhoPosted } = useGetUserQuery({
    fk_userId: item.fk_userId,
  });
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  const user = useSelector(selectCurrentUser);
  const isCurrentUser = user?.id === item.fk_userId;
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };
  const closeMapView = () => {
    setShowMapView(false);
  };
  const closeContactModal = () => {
    setShowContactModal(false);
  };

  const showUserProfileHandler = () => {
    closeModal();
    setShowContactModal(false);
    setShowDetailsModal(false);
    setShowMapView(false);
    if (user?.id === item.fk_userId) {
      navigation.navigate('ProfileScreen');
    } else {
      navigation.navigate('UserProfileScreen', {
        fk_userId: item.fk_userId,
      });
    }
  };

  const handleShowContactModal = async () => {
    const { data: contact } = await getIsAContact(
      {
        currentUserId: user?.id,
        IdOfUserWhoPosted: item.fk_userId,
      },
      false,
    );
    if (contact) {
      closeModal();
      navigation.navigate('MessageScreen', {
        screen: 'ChatScreen',
        params: {
          contact,
        },
      });
    } else {
      setShowContactModal(true);
    }
  };
  const userWhoPostedFullName = isCurrentUser
    ? 'You'
    : `${userWhoPosted?.firstName} ${userWhoPosted?.lastName}`;
  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.main_view}>
          <View style={styles.profile_view}>
            <View style={styles.pic_container}>
              {userWhoPosted?.profilePhoto ? (
                <Image
                  source={{
                    uri: userWhoPosted?.profilePhoto,
                  }}
                  style={styles.profile_icon}
                />
              ) : (
                <View style={styles.person_icon}>
                  <Ionicons
                    name="person"
                    size={35}
                    color={COLORS.blackSecondary}
                  />
                </View>
              )}
              <TouchableOpacity
                style={[styles.btn_active, styles.view_profile_btn]}
                onPress={showUserProfileHandler}>
                <Text style={styles.fullname_text_container}>
                  <Text>{userWhoPostedFullName}</Text>
                  {'   '}
                  <Feather name="send" size={25} color={COLORS.white} />
                </Text>
              </TouchableOpacity>
            </View>
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
                height={300}
                width={300}
                urls={[
                  detailedItem.itemPictures[0].url,
                  detailedItem.itemPictures[1].url,
                ]}
              />
            </GestureHandlerRootView>
          </View>
          <ScrollView style={styles.second_view}>
            <View style={styles.item_container}>
              <View style={styles.item_name_container}>
                <Text style={[FONTS.body3, { color: COLORS.white }]}>
                  {detailedItem.itemName}
                </Text>
              </View>
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
                Said by <Text style={FONTS.h4}>{userWhoPostedFullName}</Text>
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
                  <Text>{'  '}See on map</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.date_outer_container}>
              <View style={styles.date_container}>
                <Text style={FONTS.body3}>Lost On </Text>
                <Text style={{ fontWeight: '800' }}>
                  {new Date(detailedItem.dateTime).toDateString()}
                </Text>
              </View>
              <View style={styles.date_container}>
                <Text style={FONTS.body3}>Posted On </Text>
                <Text style={{ fontWeight: '800' }}>
                  {new Date(detailedItem.createdAt).toDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.item_other_details}>
              <View style={styles.item_type_container}>
                <Text style={FONTS.body4}>
                  {detailedItem.isFounded === 0 ? 'Not Found yet' : 'found'}
                </Text>
              </View>
              <View style={styles.location_pin}>
                <Entypo name="location-pin" size={25} color={COLORS.primary} />
                <Text>{detailedItem.city}</Text>
              </View>
            </View>
            {isCurrentUser ? null : (
              <TouchableOpacity
                style={[styles.btn_active, styles.send_message_btn]}
                onPress={handleShowContactModal}>
                <Text style={styles.message_btn_text}>
                  <Entypo name="message" size={25} color={COLORS.white} />
                  {'   '}
                  <Text>Message {userWhoPosted?.firstName}</Text>
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={styles.view_details_btn}
              onTouchStart={() => setShowDetailsModal(true)}>
              <AntDesign name="upcircle" size={20} color={COLORS.primary} />
              <Text style={{ fontWeight: '800', marginLeft: 10 }}>
                View Details
              </Text>
            </View>
            <BottomModal
              backgroundColor={COLORS.black}
              height={'90%'}
              backgroundFilter={true}
              isVisible={showMapView}
              effect={'fade'}
              onClose={closeMapView}>
              <ShowMapComponent
                latitude={detailedItem.itemLocation.latitude}
                longitude={detailedItem.itemLocation.longitude}
              />
            </BottomModal>

            <BottomModal
              height={250}
              backgroundFilter={true}
              isVisible={showDetailsModal}
              effect={'fade'}
              onClose={closeDetailsModal}
              iconName={'close'}>
              <ItemExtraDetailCompoent detailedItem={detailedItem} />
            </BottomModal>

            <BottomModal
              height={Dimensions.get('window').height}
              backgroundFilter={true}
              isVisible={showContactModal}
              effect={'fade'}
              onClose={closeContactModal}
              iconName={'close'}>
              <ContactOwnerComponent
                navigation={navigation}
                close={closeContactModal}
                receiverId={user?.id ? item.fk_userId : null}
              />
            </BottomModal>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_view: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  courosel_view: {
    marginLeft: 50,
    height: 300,
    width: 300,
  },
  second_view: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
    marginTop: -19,
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
  profile_view: {
    width: '90%',
    zIndex: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  pic_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile_icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  view_profile_btn: {
    backgroundColor: COLORS.black,
    minWidth: '80%',
    borderRadius: 20,
    elevation: 10,
  },
  fullname_text_container: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    fontWeight: '600',
  },
  person_icon: {
    borderRadius: 30,
    backgroundColor: COLORS.GrayPrimary,
    padding: 5,
  },
  send_message_btn: {
    backgroundColor: COLORS.primary,
    width: '90%',
    margin: 5,
    alignSelf: 'center',
  },
  item_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item_name_container: {
    backgroundColor: COLORS.black,
    padding: 5,
    borderRadius: 20,
    elevation: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
  },
  view_details_btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  location_pin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item_type_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item_other_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
  },
  date_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  date_outer_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
  },
  message_btn_text: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    fontWeight: '600',
  },
});
export default memo(ItemViewComponent);
