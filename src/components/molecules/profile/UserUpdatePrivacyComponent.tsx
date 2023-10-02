import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../../constants/theme';
import { useUpdateUserSettingMutation } from '../../../redux/services/profile-service';
import { numToBool } from '../../../utils';
import ToggleComponent from '../../atoms/ToggleComponent';
type props = {
  userSettings: any;
  onClose: () => void;
  userId: number;
  isLoading: boolean;
};
interface UserSettings {
  displayPhoneNo: number;
  displayProfilePhoto: number;
  displayAddress: number;
}
const UserUpdatePrivacyComponent: React.FC<props> = ({
  userSettings,
  userId,
  isLoading,
}) => {
  const [updateUserSettings, { isLoading: settingUpdateLoader }] =
    useUpdateUserSettingMutation();
  const updatePrivacy = async (state: any) => {
    try {
      await updateUserSettings({
        fk_userId: userId,
        update: state,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <View>
          <Text style={styles.title}>Privacy Settings</Text>
          <ActivityIndicator
            animating={settingUpdateLoader}
            size="large"
            color={COLORS.primary}
          />
        </View>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>Allow others to see your Phone Number</Text>
          <ToggleComponent
            value={numToBool(userSettings.displayPhoneNo)}
            onChange={value => {
              updatePrivacy({
                displayPhoneNo: value ? 1 : 0,
              });
            }}
          />
        </View>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>
            Allow others to see your Profile Photo
          </Text>
          <ToggleComponent
            value={numToBool(userSettings.displayProfilePhoto)}
            onChange={value => {
              updatePrivacy({
                displayProfilePhoto: value ? 1 : 0,
              });
            }}
          />
        </View>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>Allow others to see your Address</Text>
          <ToggleComponent
            value={numToBool(userSettings.displayAddress)}
            onChange={value => {
              updatePrivacy({
                displayAddress: value ? 1 : 0,
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    height: '100%',

    backgroundColor: COLORS.lightGrayPrePrimary,
  },
  verify_email_but: {
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.blackPrimary,
    alignSelf: 'center',
    marginTop: 20,
  },
  toggle_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 40,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    height: 100,
  },
});
export default UserUpdatePrivacyComponent;
