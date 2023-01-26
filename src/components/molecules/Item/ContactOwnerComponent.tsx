import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';
import { Formik } from 'formik';
import { AntDesign, Feather, MaterialIcons } from '../../../constants/icons';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import * as yup from 'yup';
import object2 from '../../../assets/images/object2.png';
import PickMapComponent from '../../atoms/Map/PickMapComponent';
import BottomModal from '../../atoms/BottomModal';
import { useSendMessageMutation } from '../../../redux/services/message-service';
import NotLoggedInProfileComponent from '../profile/NotLoggedInProfileComponent';
type props = {
  receiverId: number;
  close: () => void;
  navigation: any;
};
const ContactOwnerComponent: React.FC<props> = ({
  receiverId,
  close,
  navigation,
}) => {
  const [uri, setUri] = useState('./../assets/images/character1.svg');
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const user = useSelector(selectCurrentUser);
  const [sendMessage, { isLoading, isSuccess, isError, error }] =
    useSendMessageMutation();
  const handleMapClose = () => {
    setIsMapVisible(false);
  };
  const handleLoginSubmit = async (data: object) => {
    console.log(data);
    try {
      const res = await sendMessage(data).unwrap();
      Toast.show({
        type: 'success',
        props: {
          text: 'Message sent !',
          message: res.message,
        },
      });
      close();
    } catch (e: any) {
      console.log(e);
      Toast.show({
        type: 'error',
        props: {
          text: 'Error !',
          message: e.data.errorMessage,
        },
      });
      close();
    }
  };
  if (receiverId == null) {
    return (
      <SafeAreaView>
        <NotLoggedInProfileComponent navigation={navigation} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <AnimationTranslateScale scaleRange={[1, 1.01]} scaleDuration={1000}>
        <Image
          source={object2}
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            zIndex: -1,
            right: -100,
            opacity: 0.2,
          }}
        />
      </AnimationTranslateScale>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.redPrimary} />
      ) : null}
      <View style={styles.login_container}>
        <Text style={styles.login_text}>
          Send a message to the owner of this item
        </Text>
        <Formik
          enableReinitialize={true}
          validationSchema={messageSchema}
          initialValues={{
            senderId: user ? user.id : null,
            receiverId: receiverId,
            title: '',
            message: '',
            isFound: 0,
            location: {
              latitude: 0,
              longitude: 0,
            },
            isPhoneNoShared: 0,
          }}
          onSubmit={handleLoginSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            isValid,
          }) => (
            <View style={styles.formik_view}>
              <View style={styles.email_input}>
                <MaterialIcons
                  style={{ width: '10%', fontWeight: '100', opacity: 0.6 }}
                  name="title"
                  size={20}
                />
                <TextInput
                  style={{
                    width: '80%',
                    fontSize: 20,
                    fontFamily: 'Roboto_400Regular',
                  }}
                  placeholder="write a title"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
              </View>
              {values.title.length > 0 && (
                <Text style={{ color: COLORS.redPrimary }}>{errors.title}</Text>
              )}
              <View style={styles.password_input}>
                <AntDesign style={{ width: '10%' }} name="message1" size={20} />

                <TextInput
                  numberOfLines={4}
                  multiline={true}
                  style={{ width: '80%', fontSize: 20 }}
                  placeholder="write a message"
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values.message}
                />
              </View>
              {values.message.length > 0 && (
                <Text style={{ color: COLORS.redPrimary }}>
                  {errors.message}
                </Text>
              )}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View>
                  <Text>Is this item found ?</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor:
                        values.isFound === 1
                          ? COLORS.primary
                          : COLORS.GrayPrimary,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setFieldValue('isFound', 1);
                    }}
                  >
                    <Text
                      style={[
                        FONTS.body3,
                        {
                          color:
                            values.isFound === 1 ? COLORS.white : COLORS.black,
                        },
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor:
                        values.isFound === 0
                          ? COLORS.primary
                          : COLORS.GrayPrimary,
                    }}
                    onPress={() => {
                      setFieldValue('isFound', 0);
                    }}
                  >
                    <Text
                      style={[
                        FONTS.body3,
                        {
                          color:
                            values.isFound === 0 ? COLORS.white : COLORS.black,
                        },
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {values.isFound === 1 && (
                <TouchableOpacity
                  style={[styles.login_btn_active, { margin: 10 }]}
                  onPress={() => {
                    setIsMapVisible(true);
                  }}
                >
                  <Text style={[FONTS.h4, { color: COLORS.white }]}>
                    <Feather
                      style={{ marginRight: 10 }}
                      name="map-pin"
                      size={20}
                    />{' '}
                    {values.location.latitude === 0 &&
                    values.location.longitude === 0 ? ( // if location is not set
                      <Text>Select Location On Map</Text>
                    ) : (
                      <Text>Reselect Location On Map</Text>
                    )}
                  </Text>
                </TouchableOpacity>
              )}
              <View>
                <Text>Share your phone number with the owner of this item</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor:
                        values.isPhoneNoShared === 1
                          ? COLORS.primary
                          : COLORS.GrayPrimary,
                    }}
                    onPress={() => {
                      setFieldValue('isPhoneNoShared', 1);
                    }}
                  >
                    <Text
                      style={[
                        FONTS.body3,
                        {
                          color:
                            values.isPhoneNoShared === 1
                              ? COLORS.white
                              : COLORS.black,
                        },
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor:
                        values.isPhoneNoShared === 0
                          ? COLORS.primary
                          : COLORS.GrayPrimary,
                    }}
                    onPress={() => {
                      setFieldValue('isPhoneNoShared', 0);
                    }}
                  >
                    <Text
                      style={[
                        FONTS.body3,
                        {
                          color:
                            values.isPhoneNoShared === 0
                              ? COLORS.white
                              : COLORS.black,
                        },
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={
                  !isValid || isLoading
                    ? styles.login_btn_inactive
                    : styles.login_btn_active
                }
                disabled={!isValid || isLoading}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.login_btn_text}>Send Message</Text>
              </TouchableOpacity>
              <BottomModal
                isVisible={isMapVisible}
                onClose={handleMapClose}
                height={'90%'}
                iconName=""
                effect="slide"
                backgroundFilter={true}
                titleText="Select Location        "
              >
                <PickMapComponent
                  coordinates={values.location}
                  onConfirm={async (coordinates: {
                    latitude: number;
                    longitude: number;
                  }) => {
                    setFieldValue('location', coordinates);

                    handleMapClose();
                  }}
                />
              </BottomModal>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login_container: {
    margin: 20,
    marginTop: 10,
    marginBottom: 100,
    height: '100%',
  },
  login_text: {
    fontSize: 20,
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
    maxHeight: 300,
    overflow: 'scroll',
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
  login_btn_inactive: {
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
});
const messageSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Too Short!')
    .max(30, 'Too Long!'),
  message: yup.string().required('Message is required').min(10, 'Too Short!'),
  isFound: yup.number().required('isFound is required').optional(),
  isPhoneNoShared: yup
    .number()
    .required('isPhoneNoShared is required')
    .optional(),
  location: yup
    .object()
    .shape({
      latitude: yup.number().required('latitude is required').optional(),
      longitude: yup.number().required('longitude is required').optional(),
    })
    .optional(),
});
export default ContactOwnerComponent;
