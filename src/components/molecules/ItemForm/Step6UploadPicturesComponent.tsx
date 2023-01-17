import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FormikProps } from 'formik';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '../../../constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBase64FromUrl } from '../../../utils';
import * as ImagePicker from 'expo-image-picker';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};

const Step6UploadPicturesComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  setFieldValue,
  errors,
}) => {
  const showImagePicker = async (id: number) => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const base64 = await getBase64FromUrl(result.uri);
      let temp = [...values.pictures];
      temp[id].image = base64;
      setFieldValue('pictures', temp);
    }
  };
  useEffect(() => {
    isValidHandler(!errors.pictures);
  }, [errors.pictures]);
  return (
    <SafeAreaView
      style={{
        marginTop: '10%',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      mode="margin"
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ ...FONTS.h1, lineHeight: 40 }}>
          Add{' '}
          <Text style={{ color: COLORS.bluePrimary, fontSize: 31 }}>
            Pictures
          </Text>{' '}
          or{' '}
          <Text style={{ color: COLORS.orangePrimary, fontSize: 31 }}>
            Something
          </Text>{' '}
        </Text>
      </View>
      <View style={{ margin: 50, marginBottom: 60 }}>
        <AnimationTranslateScale
          translateRange={[0, 0]}
          translateDuration={500}
          scaleRange={[1, 1.1]}
          scaleDuration={100}
          translateRangeX={[500, -20]}
          tension={100}
          friction={1000}
        >
          <View
            style={{
              width: 150,
              elevation: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={() => showImagePicker(0)}>
              {values.pictures[0].image !== '' ? (
                <Image
                  source={{ uri: values.pictures[0].image }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              ) : (
                <MaterialIcons
                  name="image"
                  size={150}
                  color={COLORS.orangePrimary}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 150,
              marginLeft: '50%',
              elevation: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              margin: 10,
            }}
          >
            <TouchableOpacity onPress={() => showImagePicker(1)}>
              {values.pictures[1].image !== '' ? (
                <Image
                  source={{ uri: values.pictures[1].image }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              ) : (
                <MaterialIcons
                  name="image"
                  size={150}
                  color={COLORS.greenPrimary}
                />
              )}
            </TouchableOpacity>
          </View>
        </AnimationTranslateScale>
      </View>
    </SafeAreaView>
  );
};

export default Step6UploadPicturesComponent;
