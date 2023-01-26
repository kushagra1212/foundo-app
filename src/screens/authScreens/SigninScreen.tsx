import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { SimpleLineIcons, Entypo, Ionicons } from '../../constants/icons';

import character1 from '../../assets/images/character1.png';
import { useUserLoginMutation } from '../../redux/services/auth-service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import AnimationTranslateScale from '../../components/molecules/Animation/AnimationTranslateScale';
import { updateFilter } from '../../redux/slices/postSlice';

export type props = {
  navigation: any;
};
const SigninScreen: React.FC<props> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState({ password: true });
  const [uri, setUri] = useState('./../assets/images/character1.svg');
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const dispatch = useDispatch();

  const handleLoginSubmit = async (data: object) => {
    try {
      const res = await userLogin(data).unwrap();
      Toast.show({
        type: 'success',
        props: {
          text: 'login success !',
          message: res.message,
        },
      });

      dispatch(updateFilter({ filterType: 0 }));
      dispatch(setCredentials({ user: res.user, jwtToken: res.jwtToken }));
      navigation.navigate('Home');
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
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <AnimationTranslateScale scaleRange={[1, 1.01]} scaleDuration={1000}>
        <Image
          source={character1}
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            zIndex: -1,
            right: 1,
          }}
        />
      </AnimationTranslateScale>
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
                  style={{
                    width: '80%',
                    fontSize: 20,
                    fontFamily: 'Roboto_400Regular',
                  }}
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
                  style={{ width: '80%', fontSize: 20 }}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={secureTextEntry.password}
                />
                <Ionicons
                  onPress={() =>
                    setSecureTextEntry({
                      ...secureTextEntry,
                      password: !secureTextEntry.password,
                    })
                  }
                  style={{ width: '10%' }}
                  name={secureTextEntry.password ? 'eye-off' : 'eye'}
                  size={20}
                />
              </View>
              <TouchableOpacity
                style={isValid ? styles.login_btn_active : styles.login_btn_off}
                disabled={!isValid}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.login_btn_text}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Forgotpassword')}
              >
                <Text
                  style={{
                    color: COLORS.blueSecondary,
                    fontSize: SIZES.h4,
                    marginTop: 20,
                    marginLeft: '50%',
                  }}
                >
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.register_view}>
          <Text
            style={{
              fontSize: SIZES.h4,
            }}
          >
            New to Foundo ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: COLORS.blueSecondary,
                fontSize: SIZES.h4,
              }}
            >
              {'  '}Register here
            </Text>
          </TouchableOpacity>
        </View>
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

  register_view: {
    position: 'absolute',
    fontWeight: '400',
    marginLeft: '15%',
    marginTop: '100%',
    display: 'flex',
    flexDirection: 'row',
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
