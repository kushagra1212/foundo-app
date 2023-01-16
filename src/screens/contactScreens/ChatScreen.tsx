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
import CardsComponent from '../../components/molecules/Item/Card/CardsComponent';

import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';
import {
  useGetContactsMutation,
  useGetMessagesMutation,
} from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import ContactListComponent from '../../components/molecules/Contact/ContactListComponent';
import { COLORS, FONTS } from '../../constants/theme';
import MessageListComponent from '../../components/molecules/Message/MessageListComponent';
import { useGetUserQuery } from '../../redux/services/profile-service';
import { Ionicons } from '../../constants/icons';
export type props = {
  navigation?: any;
};

const ChatScreen: React.FC<props> = ({ navigation }) => {
  const user = useSelector(selectCurrentUser);
  const [messageOption, setMessageOption] = useState({
    limit: 5,
    offset: 0,
  });
  const [getMessages, { isLoading }] = useGetMessagesMutation();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [messageFound, setMessageFound] = useState<boolean>(true);
  const fetchMessages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await getMessages({
        offset: messageOption.offset,
        limit: messageOption.limit,
        receiverId: user.id,
        senderId: navigation.getState().routes[1].params.contact.senderId,
      }).unwrap();
      if (res.length === 0) {
        setLoading(false);
        setReachedEnd(true);
        if (messages.length === 0) setMessageFound(false);
        return;
      }
      setMessageOption({
        ...messageOption,
        offset: messageOption.limit + messageOption.offset,
      });
      setMessages([...messages, ...res]);
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      setMessageFound(false);
      setReachedEnd(true);
    }
  };
  useEffect(() => {
    let unmouted = false;
    if (!unmouted) {
      setLoading(true);
      fetchMessages();
    }

    return () => {
      unmouted = true;
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightGrayPrePrimary,
      }}
    >
      <View>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '90%',
            }}
          >
            <Text style={FONTS.h3}>
              {navigation.getState().routes[1].params.contact?.firstName +
                ' ' +
                navigation.getState().routes[1].params.contact?.lastName}
            </Text>
          </View>
        </View>
      </View>
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
            marginBottom: 20,
          }}
        >
          <MessageListComponent
            fetchMessages={fetchMessages}
            loading={isLoading}
            messages={messages}
            reachedEnd={reachedEnd}
            messageFound={messageFound}
          />
        </View>
      </MaskedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 10,
  },
});
export default ChatScreen;
