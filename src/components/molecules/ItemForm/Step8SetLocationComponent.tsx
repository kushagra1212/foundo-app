import { FormikProps } from 'formik';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost, ILocation } from '../../../interfaces';
import React, { useEffect } from 'react';
import PickMapComponent from '../../atoms/Map/PickMapComponent';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useAddItemPostMutation } from '../../../redux/services/post-service';
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
  closeThisScreen,
}) => {
  const [coordinates, setCoordinates] = React.useState(values.location);
  const [showMap, setShowMap] = React.useState(true);
  const [addItem, { isLoading }] = useAddItemPostMutation();
  useEffect(() => {
    isValidHandler(!errors.location);
  }, [errors.location]);
  const onChange = (coordinates: ILocation) => {
    setCoordinates(coordinates);
  };
  const save = () => {
    setFieldValue('location', coordinates);
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
  return (
    <View
      style={{
        marginTop: '10%',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{}}>
        <Text style={{ ...FONTS.h2 }}>
          Set an approximate{' '}
          <Text style={{ color: COLORS.redPrimary }}>Location </Text>
          for your Item that you've lost
        </Text>
      </View>
      {showMap ? (
        <View>
          <PickMapComponent
            coordinates={coordinates}
            onChange={onChange}
            onConfirm={save}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              borderRadius: 10,
              elevation: 10,
            }}
            onPress={() => setShowMap(true)}
          >
            <Text style={[FONTS.h2, { color: COLORS.black }]}>
              Reset Location
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: '80%', elevation: 50 }}>
            <TouchableOpacity
              style={{
                backgroundColor: isLoading
                  ? COLORS.GrayPrimary
                  : COLORS.primary,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                margin: 10,
                borderRadius: 10,
                height: 100,
                elevation: 50,
              }}
              disabled={isLoading}
              onPress={addPost}
            >
              <Text style={[FONTS.h1, { color: COLORS.white }]}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Step8SetLocationComponent;
