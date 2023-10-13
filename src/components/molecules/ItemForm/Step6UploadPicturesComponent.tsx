import * as ImagePicker from 'expo-image-picker';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialIcons } from '../../../constants/icons';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import { getBase64FromUrl } from '../../../utils';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';

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
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      const base64 = await getBase64FromUrl(result.assets[0].uri);
      const temp = [...values.pictures];
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
      mode="margin">
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
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
      <View style={{ margin: 100, marginTop: 50, marginBottom: 60 }}>
        <AnimationTranslateScale
          translateRange={[0, 0]}
          translateDuration={500}
          scaleRange={[1, 1.1]}
          scaleDuration={100}
          translateRangeX={[500, -20]}
          tension={100}
          friction={1000}>
          <View
            style={{
              width: 150,
              elevation: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={() => showImagePicker(0)}>
              {values.pictures[0].image !== '' ? (
                <Image
                  source={{ uri: values.pictures[0].image }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              ) : (
                <MaterialIcons name="image" size={150} color={COLORS.black} />
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
            }}>
            <TouchableOpacity onPress={() => showImagePicker(1)}>
              {values.pictures[1].image !== '' ? (
                <Image
                  source={{ uri: values.pictures[1].image }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              ) : (
                <MaterialIcons name="image" size={150} color={'lightblue'} />
              )}
            </TouchableOpacity>
          </View>
        </AnimationTranslateScale>
      </View>
    </SafeAreaView>
  );
};

export default Step6UploadPicturesComponent;
