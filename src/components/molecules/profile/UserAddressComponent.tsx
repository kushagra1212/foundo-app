import * as Location from 'expo-location';
import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { COLORS, FONTS } from '../../../constants/theme';
import { useUserUpdateMutation } from '../../../redux/services/auth-service';
import { useGetUserQuery } from '../../../redux/services/profile-service';
import { updateUser } from '../../../redux/slices/authSlice';
import { getAddress } from '../../../utils';

type props = {
  address: string | null;
  onClose: () => void;
  userId: number;
};
const LocationServiceEnabledView: React.FC<any> = ({ GetCurrentLocation }) => (
  <View>
    <TouchableOpacity
      style={{ ...styles.verify_email_but, width: '80%' }}
      onPress={GetCurrentLocation}>
      <Text style={{ ...FONTS.body3, color: COLORS.white }}>
        Get Your Adddress
      </Text>
    </TouchableOpacity>
  </View>
);
const UserAddressComponent: React.FC<props> = ({
  address,
  onClose,
  userId,
}) => {
  const dispatch = useDispatch();
  const [userUpdate] = useUserUpdateMutation();
  const { data: user } = useGetUserQuery({ fk_userId: userId });
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const addAddress = async (address: string) => {
    try {
      const { user } = await userUpdate({
        userId,
        update: {
          address,
        },
      }).unwrap();
      dispatch(updateUser({ user }));
    } catch (err) {
      console.log(err);
    }
  };
  const CheckIfLocationEnabled = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        setLocationServiceEnabled(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let flag = true;
    if (flag && user?.address) setDisplayCurrentAddress(user?.address);

    return () => {
      flag = false;
    };
  }, [user]);
  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);
  const makeLocationRequest = async () => {
    try {
      setLoading(true);
      const { coords } = await Location.getCurrentPositionAsync();
      CheckIfLocationEnabled();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const GetCurrentLocation = async () => {
    try {
      setLoading(true);

      const { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;
        const response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const { address } = getAddress(response);

        setDisplayCurrentAddress(address);
        await addAddress(address);
      }
    } catch (err) {
      onClose();
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" color={COLORS.redPrimary} />
      </View>
    );
  }
  return (
    <View style={styles.view}>
      {address === '' || !address ? (
        <View
          style={{
            width: '100%',
          }}>
          {!locationServiceEnabled ? (
            <View>
              <Text style={{ ...FONTS.body3, margin: 10 }}>
                Please enable location service to get your current address
              </Text>
              <TouchableOpacity
                style={{ ...styles.verify_email_but, width: '80%' }}
                onPress={makeLocationRequest}>
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  Enable Location Service
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <LocationServiceEnabledView
              GetCurrentLocation={GetCurrentLocation}
            />
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
          }}>
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
export default memo(UserAddressComponent);
