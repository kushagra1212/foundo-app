import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useUserUpdateMutation } from '../../redux/services/auth-service';
import { useGetUserQuery } from '../../redux/services/profile-service';
import { updateUser } from '../../redux/slices/authSlice';
type props = {
  address: string | null;
  onClose: () => void;
  userId: number;
};
const UserAddressComponent: React.FC<props> = ({
  address,
  onClose,
  userId,
}) => {
  const [addressState, setAddressState] = useState<string | null>('');
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [userUpdate] = useUserUpdateMutation();
  const { data: user } = useGetUserQuery({ userId });
  const setAddress = (value: string) => {
    setAddressState(value);
    if (value.length >= 30 && value.length <= 100) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const addAddress = async () => {
    if (isValid) {
      try {
        const { user } = await userUpdate({
          userId,
          address: addressState,
        }).unwrap();
        dispatch(updateUser({ user }));

        onClose();
      } catch (err) {
        console.log(err);

        onClose();
      }
    }
  };
  useEffect(() => {
    let go = true;
    if (go && user) setAddressState(user?.address);

    return () => {
      go = false;
    };
  }, [user]);
  return (
    <View style={styles.view}>
      {address === '' || !address ? (
        <View>
          <TextInput
            placeholder={'Write your Residential Address'}
            onChangeText={setAddress}
            value={addressState === null ? undefined : addressState}
            autoFocus
            numberOfLines={5}
            multiline={true}
            placeholderTextColor={COLORS.GraySecondary}
            textContentType="addressState"
            style={{
              backgroundColor: COLORS.white,
              elevation: 40,
              borderRadius: 10,
              padding: 10,
              fontSize: SIZES.h3,
              margin: 10,
              color: COLORS.black,
              textTransform: 'capitalize',
            }}
          />

          <View
            style={{
              ...styles.verify_email_but,
              ...(!isValid ? { backgroundColor: COLORS.GraySecondary } : {}),
            }}
            onTouchStart={isValid ? addAddress : undefined}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Add</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={{ ...FONTS.body3, margin: 10 }}>
            Your Residential Address
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              margin: 10,
              opacity: 0.7,
            }}
          >
            {addressState}
          </Text>
        </View>
      )}
    </View>
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
});
export default UserAddressComponent;
