import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { COLORS, FONTS, SIZES, STYLE } from '../../constants/theme';
import { SimpleLineIcons, Entypo } from '../../constants/icons';

const SigninScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState({ password: true });
  const handleLoginSubmit = (e) => {
    console.log(e);
    Toast.show({
      type: 'info',
      props: {
        text: 'Error !',
        message: 'wnfefjjew wfjejfe wefwefuhjewfewoif  wefhweiofewfh ',
      },
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.login_container}>
        <Text style={styles.login_text}>Login</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLoginSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <View style={styles.formik_view}>
              <View style={styles.email_input}>
                <Entypo
                  style={{ width: '10%', fontWeight: '100', opacity: 0.6 }}
                  name="email"
                  size={20}
                />
                <TextInput
                  style={{ width: '80%', fontSize: 20 }}
                  name="email"
                  placeholder="Email ID"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.password_input}>
                <SimpleLineIcons
                  style={{ width: '10%' }}
                  name="lock"
                  size={20}
                />
                <TextInput
                  name="password"
                  style={{ width: '80%', fontSize: 20 }}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={secureTextEntry.password}
                />
              </View>
              <TouchableOpacity
                style={isValid ? styles.login_btn_active : styles.login_btn_off}
                disabled={!isValid}
                onPress={handleSubmit}
              >
                <Text style={styles.login_btn_text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text style={styles.register_text}>New to Foundo? Register here</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login_container: {
    margin: 20,
    marginTop: 200,
    marginBottom: 100,
    height: '100%',
  },
  login_text: {
    fontSize: 40,
    fontWeight: '700',
  },
  email_input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.GrayPrimary,
    paddingBottom: 10,
    marginBottom: 30,

    marginTop: 30,
    width: '100%',
  },
  password_input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.GrayPrimary,
    paddingBottom: 10,
    marginBottom: 20,
    width: '100%',
  },
  formik_view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  login_btn_active: {
    marginTop: 20,
    height: 50,
    width: '80%',
    backgroundColor: COLORS.primary,
    elevation: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_btn_off: {
    marginTop: 20,
    height: 50,
    width: '80%',
    backgroundColor: COLORS.primary,
    opacity: 0.5,
    elevation: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_btn_text: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    fontWeight: '600',
  },

  register_text: {
    position: 'absolute',
    fontSize: SIZES.h4,
    fontWeight: '400',
    marginLeft: '15%',
    marginTop: '100%',
  },
});
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
export default SigninScreen;
