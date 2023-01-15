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
import CardsComponent from '../../components/molecules/CardsComponent';

import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';
import { useGetContactsMutation } from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import ContactListComponent from '../../components/molecules/ContactListComponent';
import { COLORS } from '../../constants/theme';
export type props = {
  navigation: any;
};

const ContactScreen: React.FC<props> = ({ navigation }) => {
  const user = useSelector(selectCurrentUser);
  const [contactOption, setContactOption] = useState({
    limit: 5,
    offset: 0,
  });
  const [getContacts, { isLoading }] = useGetContactsMutation();
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
        userId: user.id,
      }).unwrap();
      if (res.length === 0) {
        setLoading(false);
        setReachedEnd(true);
        if (contacts.length === 0) setContactFound(false);
        return;
      }
      setContactOption({
        ...contactOption,
        offset: contactOption.limit + contactOption.offset,
      });
      setContacts([...contacts, ...res]);
      setLoading(false);
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
  }, []);
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
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
