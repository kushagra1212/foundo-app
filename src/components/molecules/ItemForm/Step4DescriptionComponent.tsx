import { FormikProps } from 'formik';
import { View, Text, TextInput } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { AddPost } from '../../../interfaces';
import React, { useEffect } from 'react';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
type props = FormikProps<AddPost> & {
  isValidHandler: (isValid: boolean) => void;
};
const Step4DesciptionComponent: React.FC<props> = ({
  values,
  handleChange,
  handleBlur,
  isValidHandler,
  errors,
}) => {
  useEffect(() => {
    isValidHandler(!errors.description && values.description.trim().length > 0);
  }, [errors.description]);

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
          Write a{' '}
          <Text style={{ color: COLORS.purpleSecondary }}>Description</Text>
        </Text>
      </View>
      <AnimationTranslateScale
        translateRange={[500, 0]}
        translateDuration={500}
        scaleRange={[0.5, 1]}
        scaleDuration={1000}
      >
        <TextInput
          focusable={true}
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{
            fontFamily: 'Roboto_400Regular',
            backgroundColor: COLORS.lightGrayPrePrimary,
            alignSelf: 'center',
            margin: 10,
            marginTop: 100,
            height: 250,
            borderRadius: 10,
            padding: 5,
            fontSize: 35,
            fontWeight: '900',
            flexWrap: 'wrap',
            width: 350,
          }}
          placeholder="Description"
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          value={values.description.substring(0, 146)}
          keyboardType="email-address"
        />
      </AnimationTranslateScale>
    </View>
  );
};

export default Step4DesciptionComponent;
