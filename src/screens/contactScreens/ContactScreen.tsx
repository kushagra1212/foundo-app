import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';
import { useLazyGetContactsQuery } from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import ContactListComponent from '../../components/molecules/Contact/ContactListComponent';
import { COLORS } from '../../constants/theme';
import AnimatedComponent from '../../components/molecules/Animation/AnimatedComponent';
import AnimatedObject from '../../components/molecules/Animation/AnimatedObject';
import character4 from '../../assets/images/character4.png';
import object3 from '../../assets/images/object1.png';
import LogInButtonComponent from '../../components/atoms/LogInButtonComponent';
export type props = {
  navigation: any;
};

const ContactScreen: React.FC<props> = ({ navigation }) => {
  const user = useSelector(selectCurrentUser);
  const [contactOption, setContactOption] = useState({
    limit: 5,
    offset: 0,
  });
  const [getContacts, { isLoading, isError }] = useLazyGetContactsQuery();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [contactFound, setContactFound] = useState<boolean>(true);
  const fetchContacts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await getContacts({
        offset: contactOption.offset,
        limit: contactOption.limit,
        userId: user?.id,
      }).unwrap();
      console.log(res.length);
      if (res.length === 0) {
        setLoading(false);
        setReachedEnd(true);
        if (contacts.length === 0) setContactFound(false);
        else setContactFound(true);
        return;
      }
      setContactOption({
        ...contactOption,
        offset: contactOption.limit + contactOption.offset,
      });
      setContacts([...contacts, ...res]);
      setLoading(false);
      setContactFound(true);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      setReachedEnd(true);
      setContactFound(false);
    }
  };
  useEffect(() => {
    let unmouted = false;
    if (!unmouted) fetchContacts();
    return () => {
      unmouted = true;
    };
  }, [user?.id]);

  console.log(isError);
  if (user === null) {
    return (
      <SafeAreaView
        style={{
          height: '100%',
          backgroundColor: COLORS.lightGrayPrePrimary,
        }}
      >
        <View style={{ zIndex: 1, top: '60%' }}>
          <AnimatedObject width={300} height={300} source={object3} />
        </View>
        <AnimatedComponent
          title="Not Logged In"
          description="Please login to see your contacts"
          source={character4}
        />
        <View style={{ marginTop: '10%' }}>
          <LogInButtonComponent navigation={navigation} title="Log in" />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
      }}
    >
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              marginTop: 0,
            }}
          >
            <LinearGradient
              colors={[
                '#FFFFFF00',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
                '#FFFFFF',
              ]}
              style={{
                flex: 1,
                borderRadius: 5,
              }}
            ></LinearGradient>
          </View>
        }
      >
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <ContactListComponent
            fetchContacts={fetchContacts}
            loading={isLoading}
            contacts={contacts}
            reachedEnd={reachedEnd}
            contactFound={contactFound}
            navigation={navigation}
          />
        </View>
      </MaskedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_search_input: {
    width: '90%',
  },
});
export default ContactScreen;
