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
  const [updateUserSettings] = useUpdateUserSettingMutation();

  const updatePrivacy = async (state: any) => {
    try {
      await updateUserSettings({
        userId,
        ...state,
      }).unwrap();
      console.log('updated');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text style={styles.title}>Privacy Settings</Text>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>Allow others to see your Phone Number</Text>
          <ToggleComponent
            value={numToBool(userSettings.displayPhoneNo)}
            onChange={(value) => {
              setTimeout(
                () =>
                  updatePrivacy({
                    displayPhoneNo: value ? 1 : 0,
                  }),
                500
              );
            }}
          />
        </View>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>
            Allow others to see your Profile Photo
          </Text>
          <ToggleComponent
            value={numToBool(userSettings.displayProfilePhoto)}
            onChange={(value) => {
              setTimeout(
                () =>
                  updatePrivacy({
                    displayProfilePhoto: value ? 1 : 0,
                  }),
                100
              );
            }}
          />
        </View>
        <View style={styles.toggle_view}>
          <Text style={FONTS.body3}>Allow others to see your Address</Text>
          <ToggleComponent
            value={numToBool(userSettings.displayAddress)}
            onChange={(value) => {
              setTimeout(
                () =>
                  updatePrivacy({
                    displayAddress: value ? 1 : 0,
                  }),
                500
              );
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
