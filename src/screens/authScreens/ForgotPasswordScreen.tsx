import { StatusBar } from 'expo-status-bar';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { COLORS, FONTS, SIZES, STYLE } from '../../constants/theme';
import { SimpleLineIcons, Entypo, Ionicons } from '../../constants/icons';
import character2 from '../../assets/images/character2.png';

export type props = {
  navigation: any;
};
const ForgotPasswordScreen: React.FC<props> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState({ password: true });
  const handleSubmit = (e: any) => {
    console.log(e);
    Toast.show({
      type: 'error',
      props: {
        text: 'Error !',
        message: 'wnfefjjew wfjejfe wefwefuhjewfewoif  wefhweiofewfh ',
      },
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView>
        <Image
          source={character2}
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            zIndex: -1,
            right: 1,
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.login_container}>
              <Text style={styles.login_text}>Forgot Password ?</Text>

              <Text style={styles.login_text2}>
                Don't worry, Please enter your Email
              </Text>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  email: '',
                }}
                onSubmit={handleSubmit}
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
                        placeholder="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                      />
                    </View>

                    <TouchableOpacity
                      style={
                        isValid ? styles.login_btn_active : styles.login_btn_off
                      }
                      disabled={!isValid}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.login_btn_text}>Send Email</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
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
    margin: 5,
    marginTop: 50,
    fontFamily: 'Roboto_400Regular',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 10,
    padding: 20,
  },
  login_text: {
    fontSize: 30,
    fontWeight: '700',
  },
  login_text2: {
    fontSize: 15,
    fontFamily: 'Roboto_300Light',
    marginTop: 10,
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
export default ForgotPasswordScreen;
