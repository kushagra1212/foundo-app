import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useRef } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import LogoutButtonComponent from '../components/atoms/Auth/LogoutButtonComponent';
import { ListFilterItemViewAllType } from '../components/atoms/Item/ListItem';
import BackDropComponent from '../components/molecules/Animation/BackDropComponent';
import EmailComponent from '../components/molecules/profile/EmailComponent';
import NotLoggedInProfileComponent from '../components/molecules/profile/NotLoggedInProfileComponent';
import PhoneNumberComponent from '../components/molecules/profile/PhoneNumberComponent';
import UserAddressComponent from '../components/molecules/profile/UserAddressComponent';
import UserUpdatePrivacyComponent from '../components/molecules/profile/UserUpdatePrivacyComponent';
import { AntDesign, Entypo } from '../constants/icons';
import { COLORS, FONTS } from '../constants/theme';
import { useUserUpdateMutation } from '../redux/services/auth-service';
import { useGetUserSettingQuery } from '../redux/services/profile-service';
import { selectCurrentUser, updateUser } from '../redux/slices/authSlice';
import { getBase64FromUrl } from '../utils';
type props = {
  navigation: any;
};

const ProfileScreen: React.FC<props> = ({ navigation }) => {
  const user = useSelector(selectCurrentUser);
  const { data: userSetting, isLoading } = useGetUserSettingQuery({
    fk_userId: user ? user?.id : null,
  });
  const [userUpdate, { isLoading: uploadLoading }] = useUserUpdateMutation();
  const dispatch = useDispatch();

  const mailBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const phoneBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const residentialAddressBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const updatePrivacyBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const viewAllHandler = (
    value: 'email' | 'phoneNumber' | 'Residential Address' | 'Update Privacy',
  ) => {
    switch (value) {
      case 'email':
        mailBottomSheetModalRef.current?.present();
        break;
      case 'phoneNumber':
        phoneBottomSheetModalRef.current?.present();
        break;
      case 'Residential Address':
        residentialAddressBottomSheetModalRef.current?.present();
        break;
      case 'Update Privacy':
        updatePrivacyBottomSheetModalRef.current?.present();
        break;
      default:
    }
  };
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      const base64 = await getBase64FromUrl(result.assets[0].uri);
      try {
        const result = await userUpdate({
          userId: user?.id,
          update: { profilePhoto: base64 },
        }).unwrap();
        dispatch(updateUser({ user: result.user }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!user) {
    return <NotLoggedInProfileComponent navigation={navigation} />;
  }
  return (
    <ScrollView
      style={{ backgroundColor: COLORS.lightGrayPrimary, paddingTop: 40 }}>
      <View style={styles.profile_view}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={showImagePicker}>
          <AntDesign name="edit" size={25} style={{ color: COLORS.primary }} />
        </TouchableOpacity>
        <View>
          {user?.profilePhoto && !uploadLoading ? (
            <Image
              source={{ uri: user?.profilePhoto ? user?.profilePhoto : null }}
              style={{
                ...styles.profile_img,
                aspectRatio: 1,
              }}
            />
          ) : !uploadLoading ? (
            <View
              style={{
                ...styles.profile_img,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 45 }}>
                {user?.firstName.split()[0].split('')[0] +
                  user?.lastName.split()[0].split('')[0]}
              </Text>
            </View>
          ) : (
            <View
              style={{
                ...styles.profile_img,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                animating={uploadLoading}
                size="large"
                color={COLORS.white}
              />
            </View>
          )}
        </View>
        <View>
          <Text style={{ ...FONTS.h3, margin: 10 }}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
        </View>
      </View>
      <View
        style={{
          margin: 10,
        }}>
        <Text style={{ ...FONTS.h4, opacity: 0.6 }}>Contact Details</Text>
        <View
          style={{
            backgroundColor: COLORS.lightGrayPrePrimary,
            marginTop: 5,
          }}>
          <ListFilterItemViewAllType
            arrowText=""
            items={undefined}
            text="Email"
            icon={
              <View style={{ marginRight: 10, justifyContent: 'center' }}>
                <Entypo name="email" size={20} />
              </View>
            }
            viewAllHandler={() => viewAllHandler('email')}
          />

          <ListFilterItemViewAllType
            arrowText=""
            items={undefined}
            text="Phone Number"
            icon={
              <View style={{ marginRight: 10, justifyContent: 'center' }}>
                <Entypo name="phone" size={20} />
              </View>
            }
            viewAllHandler={() => viewAllHandler('phoneNumber')}
          />
          <ListFilterItemViewAllType
            arrowText=""
            items={undefined}
            text="Residential Address"
            icon={
              <View style={{ marginRight: 10, justifyContent: 'center' }}>
                <Entypo name="address" size={20} />
              </View>
            }
            viewAllHandler={() => viewAllHandler('Residential Address')}
          />
        </View>
      </View>
      <View
        style={{
          margin: 10,
        }}>
        <Text style={{ ...FONTS.h4, opacity: 0.6 }}>Privacy Setting</Text>
        <View
          style={{
            marginTop: 5,
          }}>
          <ListFilterItemViewAllType
            arrowText=""
            items={undefined}
            text="Update Privacy"
            icon={
              <View style={{ marginRight: 10, justifyContent: 'center' }}>
                <Entypo name="key" size={20} />
              </View>
            }
            viewAllHandler={() => viewAllHandler('Update Privacy')}
          />
        </View>
      </View>
      <LogoutButtonComponent navigation={navigation} />

      <BottomSheetModal
        ref={mailBottomSheetModalRef}
        index={1}
        snapPoints={['80%', '80%']}
        handleStyle={[styles.header_style, { backgroundColor: COLORS.white }]}
        backdropComponent={BackDropComponent}>
        <EmailComponent
          onClose={() => mailBottomSheetModalRef.current?.close()}
          email={user?.email}
          user={user}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={phoneBottomSheetModalRef}
        index={1}
        snapPoints={['80%', '80%']}
        handleStyle={styles.header_style}
        backdropComponent={BackDropComponent}>
        <PhoneNumberComponent
          onClose={() => phoneBottomSheetModalRef.current?.close()}
          phoneNumber={user?.phoneNo}
          userId={user?.id}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={residentialAddressBottomSheetModalRef}
        index={1}
        snapPoints={['30%', '30%']}
        handleStyle={styles.header_style}
        backdropComponent={BackDropComponent}>
        <UserAddressComponent
          onClose={() => residentialAddressBottomSheetModalRef.current?.close()}
          address={user?.address}
          userId={user?.id}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={updatePrivacyBottomSheetModalRef}
        index={1}
        snapPoints={['80%', '80%']}
        handleStyle={styles.header_style}
        backdropComponent={BackDropComponent}>
        <UserUpdatePrivacyComponent
          onClose={() => updatePrivacyBottomSheetModalRef.current?.close()}
          userSettings={userSetting}
          isLoading={isLoading}
          userId={user?.id}
        />
      </BottomSheetModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profile_view: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    marginTop: 10,
  },
  profile_img: {
    height: 150,
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  header_style: {
    backgroundColor: COLORS.lightGrayPrePrimary,
    borderRadius: 20,
  },
});
export default ProfileScreen;
