import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import UserNotFound from '../../components/atoms/UserNotFound';
import ContactListComponent from '../../components/molecules/Contact/ContactListComponent';
import { COLORS, SIZES } from '../../constants/theme';
import { useGetContactListQuery } from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';

export type props = {
  navigation: any;
};
export type contactType = {
  id: number;
  fk_user_Id_1: number;
  fk_user_Id_2: number;
  chat_enabled: number;
  firstName: string;
  lastName: string;
  email: string;
  total_count: number;
};
const LIMIT = 5;
const ContactScreen: React.FC<props> = ({ navigation }) => {
  const user = useSelector(selectCurrentUser);

  const [offset, setOffset] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { isLoading, isError, error, isFetching, data, refetch } =
    useGetContactListQuery({
      offset,
      limit: LIMIT,
      userId: user?.id,
    });
  const contacts = data?.contacts || [];
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const loading = isLoading || isFetching;
  const fetchContacts = () => {
    if (isError) {
      Toast.show({
        type: 'error',
        props: {
          text: 'Error !',
          message: error?.data?.message,
        },
      });
    }

    if (loading || isError || reachedEnd) return;

    if (contacts.length && contacts.length === contacts[0].total_count) {
      setReachedEnd(true);
      return;
    }

    setOffset(prev => prev + LIMIT);
  };

  const handleRefreshControl = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!user) {
    return (
      <UserNotFound
        navigation={navigation}
        message="Please login to see your contacts"
      />
    );
  }
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
      }}>
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              marginTop: 0,
            }}>
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
              ]}
              style={{
                flex: 1,
                borderRadius: 5,
              }}></LinearGradient>
          </View>
        }>
        <Text style={styles.chat_text}>Chats</Text>
        <View style={styles.contactList}>
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshControl}>
            <ContactListComponent
              fetchContacts={fetchContacts}
              loading={loading}
              contacts={contacts}
              reachedEnd={reachedEnd}
              contactFound={contacts && contacts.length > 0}
              navigation={navigation}
            />
          </RefreshControl>
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
  chat_text: {
    margin: 10,
    fontSize: SIZES.h1,
    marginBottom: 0,
    width: '90%',
    alignSelf: 'center',
  },
  contactList: {
    marginTop: 20,
    marginBottom: 75,
  },
});
export default ContactScreen;
