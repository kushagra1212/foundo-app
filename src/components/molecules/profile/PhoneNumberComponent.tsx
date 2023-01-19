import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS, FONTS } from '../../../constants/theme';
import { useUserUpdateMutation } from '../../../redux/services/auth-service';
import { useGetUserQuery } from '../../../redux/services/profile-service';
import PhoneInput from 'react-native-phone-number-input';
import { updateUser } from '../../../redux/slices/authSlice';
type props = {
  phoneNumber: string | undefined;
  onClose: () => void;
  userId: number;
};
const PhoneNumberComponent: React.FC<props> = ({
  phoneNumber,
  onClose,
  userId,
}) => {
  const [phoneNumberState, setPhoneNumberState] = useState<string | undefined>(
    phoneNumber
  );
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [userUpdate] = useUserUpdateMutation();
  const user = useCallback(useGetUserQuery({ userId }).data, []);
  const phoneInput = useRef<PhoneInput>(null);
  const setPhoneNumber = (value: string) => {
    value = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
    setPhoneNumberState(value);
    const checkValid = phoneInput.current?.isValidNumber(value);
    setIsValid(checkValid ? checkValid : false);
  };
  const addPhoneNumber = async () => {
    if (isValid) {
      try {
        const { user } = await userUpdate({
          userId,
          phoneNo: phoneNumberState,
        }).unwrap();
        dispatch(updateUser({ user }));
      } catch (err) {
        console.log(err);
      }
      onClose();
    }
  };
  const verifyPhoneNumber = () => {};
  return (
    <View style={styles.view}>
      {phoneNumber === '' || !phoneNumber ? (
        <View style={{ width: '100%' }}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumberState}
            defaultCode="IN"
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            withShadow
            autoFocus
            containerStyle={{ width: '100%' }}
          />

          <TouchableOpacity
            style={{
              ...styles.verify_email_but,
              ...(!isValid ? { backgroundColor: COLORS.GraySecondary } : {}),
            }}
            onPress={isValid ? addPhoneNumber : undefined}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text
            style={{
              ...FONTS.h3,
              margin: 20,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            {phoneNumberState}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>
              We've noticed that you haven't verified your phone number{' '}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.verify_email_but,
              { backgroundColor: COLORS.GraySecondary },
            ]}
            disabled={true}
            onPress={verifyPhoneNumber}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              Verify Phone Number
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  },
});
export default PhoneNumberComponent;
