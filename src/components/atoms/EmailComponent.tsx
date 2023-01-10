import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants/theme';
import AnimationTranslateScale from '../molecules/Animations/AnimationTranslateScale';
import ElevatedCard from './ElevatedCard';
import phoneimage from '../../assets/images/phone.png';
import OTPInputBox from './OTPInputBox';
import {
  useResetOTPMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} from '../../redux/services/otp-service';
import { number } from 'yup';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '../../constants/icons';
import { updateUser } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
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
  const [otp, setOtp] = useState<Array<string>>(['', '', '', '']);
  const digitFirstF = useRef<TextInput>(null);
  const digitSecondF = useRef<TextInput>(null);
  const digitThirdF = useRef<TextInput>(null);
  const digitFourthF = useRef<TextInput>(null);
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP, { isError: otpError }] = useVerifyOTPMutation();
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
    let optStr = otp.join('');
    return optStr;
  };

  const handleTextChange = (value: string, index: number) => {
    let currOtp = [...otp];
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
          text: 'Success',
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
            <Image
              source={phoneimage}
              style={{
                width: 500,
                height: 500,
                position: 'absolute',
                zIndex: 0,
                right: 1,
              }}
            />
          </AnimationTranslateScale>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                margin: 20,
                opacity: 0.7,
                textAlign: 'center',
              }}
            >
              {email}{' '}
            </Text>
            <AntDesign
              style={{
                color: COLORS.redPrimary,
              }}
              name="checkcircle"
              size={25}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Your Email is Now Verified ! </Text>
          </View>
        </View>
      ) : !showOtpInput ? (
        <View style={styles.view}>
          <AnimationTranslateScale scaleRange={[2, 2]} scaleDuration={50}>
            <Image
              source={phoneimage}
              style={{
                width: 500,
                height: 500,
                position: 'absolute',
                zIndex: 0,
                right: 1,
              }}
            />
          </AnimationTranslateScale>
          <Text
            style={{
              ...FONTS.h3,
              margin: 20,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            {email}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>We've noticed that you haven't verified your email </Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.verify_email_but,
              ...styles.btn,
              height: 50,
              marginTop: 10,
            }}
            onPress={verifyEmailHandler}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.white,
              }}
            >
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
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
            scaleDuration={1000}
          >
            <Image
              source={phoneimage}
              style={{
                width: 500,
                height: 500,
                position: 'absolute',
                zIndex: 0,
                right: 1,
                opacity: 0.3,
              }}
            />
          </AnimationTranslateScale>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}
          >
            <OTPInputBox
              value={otp[0]}
              ref={digitFirstF}
              onChange={(value) => handleTextChange(value, 0)}
            />
            <OTPInputBox
              value={otp[1]}
              ref={digitSecondF}
              onChange={(value) => handleTextChange(value, 1)}
            />
            <OTPInputBox
              value={otp[2]}
              ref={digitThirdF}
              onChange={(value) => handleTextChange(value, 2)}
            />

            <OTPInputBox
              ref={digitFourthF}
              value={otp[3]}
              onChange={(value) => handleTextChange(value, 3)}
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
                  }}
                >
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              ) : (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.redPrimary,
                      fontWeight: '900',
                    }}
                  >
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
                    }}
                  >
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
            <View
              style={{
                backgroundColor: COLORS.redPrimary,
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                borderRadius: 10,
                width: '80%',
                alignSelf: 'center',
                elevation: 100,
                padding: 10,
              }}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Fail to verify
              </Text>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                OPT didn't Match
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
              ...(getStringOTP().length !== 4 || !timerRunning
                ? { backgroundColor: COLORS.GraySecondary }
                : {}),
            }}
            disabled={getStringOTP().length !== 4 || !timerRunning}
            onPress={verifyOTPHandler}
          >
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
});
export default EmailComponent;
