import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { useUserUpdateMutation } from '../../../redux/services/auth-service';
import { useGetUserQuery } from '../../../redux/services/profile-service';
import { updateUser } from '../../../redux/slices/authSlice';
import * as Location from 'expo-location';
import { getAddress } from '../../../utils';

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
  const dispatch = useDispatch();
  const [userUpdate] = useUserUpdateMutation();
  const { data: user } = useGetUserQuery({ userId });
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');

  const addAddress = async (address: string) => {
    try {
      const { user } = await userUpdate({
        userId,
        address,
      }).unwrap();
      dispatch(updateUser({ user }));

      onClose();
    } catch (err) {
      console.log(err);
      onClose();
    }
  };
  const CheckIfLocationEnabled = async () => {
    try {
      let enabled = await Location.hasServicesEnabledAsync();

      if (enabled) {
        setLocationServiceEnabled(enabled);
      }
    } catch (err) {
      console.log(err);
      onClose();
    }
  };
  useEffect(() => {
    let go = true;
    if (go && user) setDisplayCurrentAddress(user?.address);

    return () => {
      go = false;
    };
  }, [user]);
  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);
  const makeLocationRequest = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync();

      CheckIfLocationEnabled();
    } catch (err) {
      console.log(err);
    }
  };
  const GetCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        onClose();
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const { address } = getAddress(response);

        setDisplayCurrentAddress(address);
        await addAddress(address);
      }
    } catch (err) {
      onClose();
    }
  };
  return (
    <View style={styles.view}>
      {address === '' || !address ? (
        <View
          style={{
            width: '100%',
          }}
        >
          {!locationServiceEnabled ? (
            <View>
              <Text style={{ ...FONTS.body3, margin: 10 }}>
                Please enable location service to get your current address
              </Text>
              <TouchableOpacity
                style={{ ...styles.verify_email_but, width: '80%' }}
                onPress={() => {
                  makeLocationRequest();
                }}
              >
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  Enable Location Service
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={{ ...styles.verify_email_but, width: '80%' }}
                onPress={GetCurrentLocation}
              >
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  Get Your Adddress
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: COLORS.white,
            elevation: 30,
            margin: 1,
            borderRadius: 20,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ ...FONTS.h2, margin: 10 }}>
            Your current address is
          </Text>
          <Text style={{ ...FONTS.body3, margin: 10 }}>
            {displayCurrentAddress}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.lightGrayPrePrimary,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  verify_email_but: {
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    elevation: 10,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
  },
});
export default UserAddressComponent;
