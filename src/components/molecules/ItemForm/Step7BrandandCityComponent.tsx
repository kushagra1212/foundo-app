import { FormikProps } from 'formik';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import React, { useEffect } from 'react';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};
const Step7BrandandCityComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  errors,
}) => {
  useEffect(() => {
    isValidHandler(
      !errors.brand &&
        values.brand.trim().length > 0 &&
        !errors.city &&
        values.city.trim().length > 0
    );
  }, [errors.brand, errors.city]);

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
        <Text style={{ ...FONTS.h1 }}>
          Write <Text style={{ color: COLORS.primary }}>Brand </Text>
          of the Item and{' '}
          <Text style={{ color: COLORS.redPrimary }}> City </Text>
          from where you are{' '}
        </Text>
      </View>
      <AnimationTranslateScale
        translateRange={[500, 0]}
        translateDuration={500}
        scaleRange={[0.5, 1]}
        scaleDuration={1000}
      >
        <View>
          <TextInput
            focusable={true}
            autoFocus={true}
            style={{
              width: '100%',
              fontFamily: 'Roboto_400Regular',
              backgroundColor: COLORS.lightGrayPrePrimary,
              alignSelf: 'center',
              marginTop: 100,
              height: 100,
              borderRadius: 10,
              padding: 20,
              fontSize: 25,
              fontWeight: '900',
            }}
            placeholder="Brand"
            onChangeText={handleChange('brand')}
            onBlur={handleBlur('brand')}
            value={values.brand.substring(0, 13)}
            keyboardType="email-address"
          />
          <TextInput
            focusable={true}
            style={{
              width: '100%',
              fontFamily: 'Roboto_400Regular',
              backgroundColor: COLORS.lightGrayPrePrimary,
              alignSelf: 'center',
              height: 100,
              borderRadius: 10,
              padding: 20,
              fontSize: 25,
              fontWeight: '900',
            }}
            placeholder="City"
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city.substring(0, 13)}
            keyboardType="email-address"
          />
        </View>
      </AnimationTranslateScale>
    </View>
  );
};

export default Step7BrandandCityComponent;
