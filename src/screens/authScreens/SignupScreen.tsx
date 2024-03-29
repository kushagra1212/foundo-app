import { Formik } from 'formik';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import object1 from '../../assets/images/object1.png';
import AnimationTranslateScale from '../../components/molecules/Animation/AnimationTranslateScale';
import { Entypo, Ionicons, SimpleLineIcons } from '../../constants/icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useUserSignupMutation } from '../../redux/services/auth-service';
interface props {
  navigation: any;
}
const SignupScreen: React.FC<props> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState({ password: true });
  const [userSignup] = useUserSignupMutation();

  const handleSignupSubmit = async (data: any) => {
    try {
      const res = await userSignup(data).unwrap();
      Toast.show({
        type: 'success',
        props: {
          text: 'Signup Success !',
          message: res.message,
        },
      });
      navigation.navigate('Signin');
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
    <SafeAreaView style={{ backgroundColor: COLORS.white }} testID="Signup">
      <AnimationTranslateScale scaleRange={[10, 1]} translateRange={[0, 0]}>
        <Image
          source={object1}
          style={{
            width: 120,
            height: 120,
            position: 'absolute',
            zIndex: -1,
            right: 10,
          }}
        />
      </AnimationTranslateScale>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.login_container}>
              <Text style={styles.login_text}>Signup</Text>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                }}
                onSubmit={handleSignupSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <View style={styles.formik_view}>
                    <View style={styles.name_input}>
                      <Ionicons
                        style={{
                          width: '10%',
                          fontWeight: '100',
                          opacity: 0.6,
                        }}
                        name="person-outline"
                        size={20}
                      />
                      <TextInput
                        style={{ width: '80%', fontSize: 20 }}
                        placeholder="First Name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                        keyboardType="name-phone-pad"
                        testID="firstNameInput"
                      />
                    </View>
                    <View style={styles.name_input}>
                      <Ionicons
                        style={{
                          width: '10%',
                          fontWeight: '100',
                          opacity: 0.6,
                        }}
                        name="person-outline"
                        size={20}
                      />
                      <TextInput
                        style={{ width: '80%', fontSize: 20 }}
                        placeholder="Last Name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                        keyboardType="name-phone-pad"
                        testID="lastNameInput"
                      />
                    </View>
                    <View style={styles.email_input}>
                      <Entypo
                        style={{
                          width: '10%',
                          fontWeight: '100',
                          opacity: 0.6,
                        }}
                        name="email"
                        size={20}
                      />
                      <TextInput
                        style={{ width: '80%', fontSize: 20 }}
                        placeholder="Email ID"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        testID="emailInput"
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
                        testID="passwordInput"
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
                      style={
                        isValid ? styles.login_btn_active : styles.login_btn_off
                      }
                      disabled={!isValid}
                      onPress={() => handleSubmit()}
                      testID="signupButton">
                      <Text style={styles.login_btn_text}>Signup</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <View style={styles.register_view}>
                <Text
                  style={{
                    fontSize: SIZES.h4,
                    marginRight: 10,
                  }}>
                  Already have an account
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Signin')}
                  testID="gotToSigninButton">
                  <Text
                    style={{
                      color: COLORS.blueSecondary,
                      fontSize: SIZES.h4,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inner: {
    padding: 5,
    justifyContent: 'space-around',
    height: '100%',
  },
  login_container: {
    margin: 20,
    marginTop: 80,
    marginBottom: 100,
    height: '100%',
    fontFamily: 'Roboto_400Regular',
  },
  login_text: {
    fontSize: 40,
    fontWeight: '700',
  },
  name_input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.GrayPrimary,
    paddingBottom: 10,
    marginTop: 30,
    width: '100%',
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
    position: 'relative',
    fontWeight: '400',
    marginLeft: '15%',
    marginTop: 50,
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
export default SignupScreen;
