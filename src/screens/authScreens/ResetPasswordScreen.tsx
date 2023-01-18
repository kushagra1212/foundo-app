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
import { COLORS, SIZES } from '../../constants/theme';
import { SimpleLineIcons, Ionicons } from '../../constants/icons';
import character2 from '../../assets/images/character2.png';
import tokenExpiredIcon from '../../assets/images/file.png';

import {
  useUserResetPasswordMutation,
  useUserVerifyResetPasswordQuery,
} from '../../redux/services/auth-service';
import {
  selectCurrentResetToken,
  selectCurrentUser,
} from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AnimationTranslateScale from '../../components/molecules/Animation/AnimationTranslateScale';

export type props = {
  navigation: any;
};
const ResetPasswordScreen: React.FC<props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const jwtResetToken = useSelector(selectCurrentResetToken);
  const currUser = useSelector(selectCurrentUser);

  const [secureTextEntry, setSecureTextEntry] = useState({ password: true });
  const [userResetPassword, {}] = useUserResetPasswordMutation();
  const {
    data: userCredentials,
    error,
    isLoading,
  } = useUserVerifyResetPasswordQuery({
    email: currUser?.email,
    token: jwtResetToken,
  });

  const handleSubmit = async ({ password }: { password: string }) => {
    try {
      const res = await userResetPassword({
        password,
        email: currUser?.email,
        token: jwtResetToken,
      }).unwrap();
      Toast.show({
        type: 'success',
        props: {
          text: 'Success',
          message: res.message,
        },
      });
      navigation.navigate('Signin');
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: 'error',
        props: {
          text: 'Error !',
          message: err.data.errorMessage,
        },
      });
    }
  };
  if (!userCredentials || error)
    return (
      <SafeAreaView
        style={{ backgroundColor: COLORS.redPrimary, ...styles.inner }}
      >
        <View>
          <AnimationTranslateScale>
            <Image
              source={tokenExpiredIcon}
              style={{
                width: 300,
                height: 300,
                position: 'absolute',
                zIndex: -1,
                right: 1,
              }}
            />
          </AnimationTranslateScale>
        </View>

        <View
          style={{
            ...styles.login_container,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 25 }}> Token Expired </Text>
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView>
        <AnimationTranslateScale>
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
        </AnimationTranslateScale>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.login_container}>
              <Text style={styles.login_text}>Enter Your New Password</Text>

              <Text style={styles.login_text2}></Text>
              <Formik
                validationSchema={ForgotPasswordValidationSchema}
                initialValues={{
                  password: '',
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
                      style={
                        isValid ? styles.login_btn_active : styles.login_btn_off
                      }
                      disabled={!isValid}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.login_btn_text}>Update Password</Text>
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
  email_text_container: {
    margin: 20,
    fontFamily: 'Roboto_400Regular',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    fontSize: SIZES.h2,
    marginTop: 450,
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
  email_sent: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: COLORS.lightGrayPrePrimary,
  },
});
const ForgotPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
export default ResetPasswordScreen;
