import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useUserUpdateMutation } from '../../redux/services/auth-service';
import { useGetUserQuery } from '../../redux/services/profile-service';
import { updateUser } from '../../redux/slices/authSlice';
import * as Location from 'expo-location';

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
      onClose();
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

        for (let item of response) {
          let address = '';

          if (item?.name) address += `${item?.name}, `;
          if (item?.street) address += `${item?.street}, `;
          if (item?.postalCode) address += `${item?.postalCode}, `;
          if (item?.city) address += `${item?.city}, `;
          if (item?.subregion) address += `${item?.subregion}, `;
          if (item?.region) address += `${item?.region}, `;
          if (item?.country) address += `${item?.country}`;

          setDisplayCurrentAddress(address);
          await addAddress(address);
        }
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
              <View
                style={{ ...styles.verify_email_but, width: '80%' }}
                onTouchStart={() => {
                  makeLocationRequest();
                }}
              >
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  Enable Location Service
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{ ...styles.verify_email_but, width: '80%' }}
                onTouchStart={GetCurrentLocation}
              >
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  Get Your Adddress
                </Text>
              </View>
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
    backgroundColor: COLORS.white,
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
