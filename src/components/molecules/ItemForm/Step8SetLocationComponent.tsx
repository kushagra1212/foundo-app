import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector } from 'react-redux';

import { MaterialIcons } from '../../../constants/icons';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost, ILocation, Post } from '../../../interfaces';
import { useAddItemPostMutation } from '../../../redux/services/post-service';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import PickMapComponent from '../../atoms/Map/PickMapComponent';
import SingleCardComponent from '../Item/Card/SingleCardComponent';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
  closeThisScreen: () => void; // <--- Add this line
  navigation: any;
};
const Step8SetLocationComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  setFieldValue,
  errors,
  navigation,
  setValues,
  closeThisScreen,
  resetForm,
}) => {
  const user = useSelector(selectCurrentUser);
  const [showMap, setShowMap] = React.useState(true);
  const [addItem, { isLoading }] = useAddItemPostMutation();

  useEffect(() => {
    isValidHandler(!errors.location);
  }, [errors.location]);

  const save = () => {
    setShowMap(false);
  };
  const addPost = async () => {
    try {
      const res = await addItem(values).unwrap();

      Toast.show({
        type: 'success',
        props: {
          text: 'Post Added !',
          message: res.message,
        },
      });
      closeThisScreen();
    } catch (e: any) {
      console.log(e);
      Toast.show({
        type: 'error',
        props: {
          text: 'Error !',
          message: e.data.errorMessage,
        },
      });
    }
  };
  const item: Post = {
    fk_userId: user.id,
    itemName: values.itemName,
    category: values.category,
    description: values.description,
    thumbnail: values.pictures[0].image,
    firstName: user.firstName,
    dateTime: values.dateTime,
    color: values.color,
    brand: values.brand,
    city: values.city,
    isFounded: values.isFounded,
  };
  return (
    <View style={styles.main_container}>
      <Text style={{ ...FONTS.h2 }}>
        Set an approximate{' '}
        <Text style={{ color: COLORS.redPrimary }}>Location </Text>
        for your Item that you've lost
      </Text>
      {showMap ? (
        <View>
          <PickMapComponent
            coordinates={values.location}
            onConfirm={async (coordinates: ILocation) => {
              setFieldValue('location', coordinates);
              await Promise.resolve();
              save();
            }}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.location_button}
            onPress={() => setShowMap(true)}>
            <Text style={styles.location_button_text}>
              Reset Location{' '}
              <MaterialIcons
                name="location-pin"
                size={20}
                color={COLORS.redPrimary}
              />
            </Text>
          </TouchableOpacity>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.greenPrimary}
              animating={isLoading}
            />
          ) : null}
          <View style={{ elevation: 50 }}>
            <SingleCardComponent item={item} navigation={{}} />
            <TouchableOpacity
              style={[
                styles.post_button,
                {
                  backgroundColor: isLoading
                    ? COLORS.GrayPrimary
                    : COLORS.black,
                },
              ]}
              disabled={isLoading}
              onPress={addPost}>
              <Text style={styles.post_button_text}>Add Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    marginTop: '10%',
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location_button: {
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.GrayPrimary,
  },
  location_button_text: {
    ...FONTS.h2,
    color: COLORS.black,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  post_button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    elevation: 15,
    alignSelf: 'center',
  },
  post_button_text: {
    ...FONTS.h1,
    color: COLORS.white,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Step8SetLocationComponent;
