import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import BottomModal from '../components/atoms/BottomModal';
import { ListFilterItemViewAllType } from '../components/atoms/ListItem';
import LogoutButtonComponent from '../components/atoms/LogoutButtonComponent';
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

interface OpenDialog {
  email: boolean;
  phoneNumber: boolean;
  residentialAddress: boolean;
  updatePrivacy: boolean;
}
const intitalOpenDialog = {
  email: false,
  phoneNumber: false,
  residentialAddress: false,
  updatePrivacy: false,
};
const ProfileScreen: React.FC<props> = ({ navigation }) => {
  const user = useSelector(selectCurrentUser);
  const { data: userSetting, isLoading } = useGetUserSettingQuery({
    fk_userId: user ? user?.id : null,
  });
  const [open, setOpen] = useState<OpenDialog>(intitalOpenDialog);
  const [userUpdate, { isLoading: uploadLoading }] = useUserUpdateMutation();
  const dispatch = useDispatch();
  const viewAllHandler = (
    value: 'email' | 'phoneNumber' | 'Residential Address' | 'Update Privacy',
  ) => {
    switch (value) {
      case 'email':
        setOpen({ ...intitalOpenDialog, email: true });
        break;
      case 'phoneNumber':
        setOpen({ ...intitalOpenDialog, phoneNumber: true });
        break;
      case 'Residential Address':
        setOpen({ ...intitalOpenDialog, residentialAddress: true });
        break;
      case 'Update Privacy':
        setOpen({ ...intitalOpenDialog, updatePrivacy: true });
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
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
      }}>
      <ScrollView>
        <View style={styles.profile_view}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={showImagePicker}>
            <AntDesign
              name="edit"
              size={25}
              style={{ color: COLORS.primary }}
            />
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
        {open.email && (
          <BottomModal
            height={user?.is_Verified ? '30%' : '90%'}
            backgroundFilter={true}
            isVisible={true}
            effect={'fade'}
            iconName="close"
            onClose={() => setOpen(intitalOpenDialog)}>
            <EmailComponent
              onClose={() => setOpen(intitalOpenDialog)}
              email={user?.email}
              user={user}
            />
          </BottomModal>
        )}
        {open.phoneNumber && (
          <BottomModal
            height={user?.phoneNo ? '30%' : '60%'}
            backgroundFilter={true}
            isVisible={true}
            effect={'fade'}
            onClose={() => setOpen(intitalOpenDialog)}>
            <PhoneNumberComponent
              onClose={() => setOpen(intitalOpenDialog)}
              phoneNumber={user?.phoneNo}
              userId={user?.id}
            />
          </BottomModal>
        )}
        {open.residentialAddress && (
          <BottomModal
            height={user?.address ? '40%' : '30%'}
            backgroundFilter={true}
            isVisible={true}
            effect={'fade'}
            iconName="close"
            onClose={() => setOpen(intitalOpenDialog)}>
            <UserAddressComponent
              onClose={() => setOpen(intitalOpenDialog)}
              address={user?.address}
              userId={user?.id}
            />
          </BottomModal>
        )}
        {open.updatePrivacy && (
          <BottomModal
            height="60%"
            backgroundFilter={true}
            isVisible={true}
            effect={'fade'}
            onClose={() => setOpen(intitalOpenDialog)}>
            <UserUpdatePrivacyComponent
              onClose={() => setOpen(intitalOpenDialog)}
              userSettings={userSetting}
              isLoading={isLoading}
              userId={user?.id}
            />
          </BottomModal>
        )}
      </ScrollView>
    </SafeAreaView>
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
  },
  profile_img: {
    height: 150,
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
});
export default ProfileScreen;
