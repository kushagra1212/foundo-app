import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';

import phoneimage from '../../../assets/images/phone.png';
import { AntDesign } from '../../../constants/icons';
import { COLORS, FONTS } from '../../../constants/theme';
import {
  useResetOTPMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} from '../../../redux/services/otp-service';
import { updateUser } from '../../../redux/slices/authSlice';
import OTPInputBox from '../../atoms/Other/OTPInputBox';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
type props = {
  email: string;
  user: any;
  onClose: () => void;
};
const EmailComponent: React.FC<props> = ({ email, user, onClose }) => {
  const dispatch = useDispatch();
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const digitFirstF = useRef<TextInput>(null);
  const digitSecondF = useRef<TextInput>(null);
  const digitThirdF = useRef<TextInput>(null);
  const digitFourthF = useRef<TextInput>(null);
  const [sendOTP, { isLoading: isLoadingSetOtp }] = useSendOTPMutation();
  const [verifyOTP, { isError: otpError, isLoading }] = useVerifyOTPMutation();
  const [resetOTP] = useResetOTPMutation();
  const verifyEmailHandler = async () => {
    try {
      await sendOTP({ userId: user.id }).unwrap();
      setMinutes(1);
      setSeconds(10);
      setOtp(['', '', '', '']);
      setShowOtpInput(true);
      setTimerRunning(true);
    } catch (err) {
      console.log(err);
    }
  };
  const getStringOTP = () => {
    const optStr = otp.join('');
    return optStr;
  };

  const handleTextChange = (value: string, index: number) => {
    const currOtp = [...otp];
    currOtp[index] = value;
    if (value !== '') {
      if (index == 0) {
        digitSecondF.current?.focus();
      } else if (index === 1) {
        digitThirdF.current?.focus();
      } else if (index === 2) {
        digitFourthF.current?.focus();
      }
    } else {
      if (index === 1) {
        digitFirstF.current?.focus();
      } else if (index === 2) {
        digitSecondF.current?.focus();
      } else if (index === 3) {
        digitThirdF.current?.focus();
      }
    }

    setOtp(currOtp);
  };
  const verifyOTPHandler = async () => {
    try {
      const res = await verifyOTP({
        userId: user.id,
        otp: Number(getStringOTP()),
      }).unwrap();
      dispatch(updateUser({ user: res.user }));
      onClose();

      Toast.show({
        type: 'success',
        props: {
          text: 'Your is has been verified',
          message: res.message,
        },
        position: 'bottom',
      });
    } catch (err: any) {
      digitFirstF.current?.focus();
      setOtp(['', '', '', '']);
    }
  };
  useEffect(() => {
    digitFirstF.current?.focus();
  }, [showOtpInput]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setTimerRunning(false);
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <SafeAreaView>
      {user?.is_verified ? (
        <View style={styles.view}>
          <AnimationTranslateScale scaleRange={[2, 2]} scaleDuration={50}>
            <Image source={phoneimage} style={styles.phone_image} />
          </AnimationTranslateScale>
          <View style={styles.email_container}>
            <Text style={styles.email_text}>{email} </Text>
            <AntDesign
              style={{
                color: COLORS.redPrimary,
              }}
              name="checkcircle"
              size={25}
            />
          </View>
          <View style={styles.you_email_verified_container}>
            <Text>Your Email is Now Verified ! </Text>
          </View>
        </View>
      ) : !showOtpInput ? (
        <View style={styles.view}>
          <ActivityIndicator
            size="large"
            color={COLORS.greenPrimary}
            animating={isLoading}
          />
          <AnimationTranslateScale scaleRange={[2, 2]} scaleDuration={50}>
            <Image source={phoneimage} style={styles.phone_image} />
          </AnimationTranslateScale>
          <Text style={styles.email_text_of_modal}>{email}</Text>
          <View style={styles.not_verified_email_container}>
            <Text>We've noticed that you haven't verified your email </Text>
          </View>
          <TouchableOpacity
            style={[
              {
                ...styles.verify_email_but,
                ...styles.btn,
                height: 50,
                marginTop: 10,
              },
              isLoadingSetOtp ? { backgroundColor: COLORS.GrayPrimary } : {},
            ]}
            onPress={verifyEmailHandler}
            disabled={isLoading}>
            <Text style={[styles.verify_btn]}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={{ margin: 20 }}>
            <Text style={FONTS.h1}>Enter OTP</Text>
            <Text>
              A four digit code has been sent to{' '}
              <Text style={{ fontWeight: '800' }}> @{user.email}</Text>
            </Text>
          </View>
          <AnimationTranslateScale
            scaleRange={[1, 1.3]}
            translateDuration={1000}
            translateRangeX={[0, 200]}
            scaleDuration={1000}>
            <Image
              source={phoneimage}
              style={[
                styles.phone_image,
                {
                  opacity: 0.3,
                },
              ]}
            />
          </AnimationTranslateScale>
          <View style={styles.otp_box_container}>
            <OTPInputBox
              value={otp[0]}
              ref={digitFirstF}
              onChange={value => handleTextChange(value, 0)}
            />
            <OTPInputBox
              value={otp[1]}
              ref={digitSecondF}
              onChange={value => handleTextChange(value, 1)}
            />
            <OTPInputBox
              value={otp[2]}
              ref={digitThirdF}
              onChange={value => handleTextChange(value, 2)}
            />

            <OTPInputBox
              ref={digitFourthF}
              value={otp[3]}
              onChange={value => handleTextChange(value, 3)}
            />
          </View>
          <View>
            <View style={{ margin: 10 }}>
              {seconds > 0 || minutes > 0 ? (
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.primary,
                    fontWeight: '900',
                  }}>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              ) : (
                <View style={styles.didnt_recieve_code}>
                  <Text style={styles.did_recieve_code_text}>
                    Didn't recieve code?
                  </Text>
                  <TouchableOpacity
                    disabled={seconds > 0 || minutes > 0}
                    style={{
                      ...styles.btn,
                      backgroundColor: COLORS.black,
                    }}
                    onPress={() => {
                      verifyEmailHandler();
                    }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                      {' '}
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {otpError && (
            <View style={styles.failed_to_verify}>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Failed To Verify
              </Text>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                OTP didn't Match
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={{
              ...styles.btn,
              width: '80%',
              alignSelf: 'center',
              height: 50,
              marginTop: 80,
              ...(getStringOTP().length !== 4 || !timerRunning || isLoading
                ? { backgroundColor: COLORS.GraySecondary }
                : {}),
            }}
            disabled={getStringOTP().length !== 4 || !timerRunning}
            onPress={verifyOTPHandler}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
  },
  verify_email_but: {
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    elevation: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verify_btn: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  failed_to_verify: {
    backgroundColor: COLORS.redPrimary,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    elevation: 10,
  },
  phone_image: {
    width: 500,
    height: 500,
    position: 'absolute',
    zIndex: 0,
    right: 1,
  },
  email_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  email_text: {
    ...FONTS.h3,
    margin: 20,
    opacity: 0.7,
    textAlign: 'center',
  },
  you_email_verified_container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email_text_of_modal: {
    ...FONTS.h3,
    margin: 20,
    opacity: 0.7,
    textAlign: 'center',
  },
  not_verified_email_container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  didnt_recieve_code: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  did_recieve_code_text: {
    ...FONTS.body4,
    color: COLORS.redPrimary,
    fontWeight: '900',
  },
  otp_box_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
export default EmailComponent;
