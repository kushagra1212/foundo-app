import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useUserUpdateMutation } from '../../redux/services/auth-service';
import {
  useGetUserQuery,
  useUpdateUserSettingMutation,
} from '../../redux/services/profile-service';
import { updateUser } from '../../redux/slices/authSlice';
import { numToBool } from '../../utils';
import ToggleComponent from '../atoms/ToggleComponent';
type props = {
  userSettings: any;
  onClose: () => void;
  userId: number;
};
interface UserSettings {
  displayPhoneNo: number;
  displayProfilePhoto: number;
  displayAddress: number;
}
const UserUpdatePrivacyComponent: React.FC<props> = ({
  userSettings,
  onClose,
  userId,
}) => {
  const [updateUserSettings] = useUpdateUserSettingMutation();

  const updatePrivacy = async (state: any) => {
    try {
      console.log(state, 'state');
      await updateUserSettings({
        userId,
        ...state,
      }).unwrap();
      console.log('updated');
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   let unmount = false;
  //   if (!unmount && userSettings) {
  //     setUserSettingsState({ ...userSetttingsState, ...userSettings });
  //   }

  //   return () => {
  //     unmount = true;
  //   };
  // }, [userSettings]);
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text style={styles.title}>Privacy Settings</Text>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>Allow others to see your Phone Number</Text>
          <ToggleComponent
            value={numToBool(userSettings?.displayPhoneNo)}
            onChange={() => {
              updatePrivacy({
                ...userSettings,
                displayPhoneNo: !userSettings?.displayPhoneNo ? 1 : 0,
              });
            }}
          />
        </View>
        <ToggleComponent value={true} onChange={() => {}} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    height: '100%',
    backgroundColor: COLORS.white,
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
    color: COLORS.primary,
    alignSelf: 'center',
    marginTop: 20,
  },
  toggle_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 100,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 30,
  },
});
export default UserUpdatePrivacyComponent;
