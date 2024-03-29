import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import UserNotFound from '../../components/atoms/Auth/UserNotFound';
import ChatTextComponent from '../../components/atoms/Other/ChatTextComponent';
import MessageListComponent from '../../components/molecules/Message/MessageListComponent';
import { Ionicons } from '../../constants/icons';
import { WHITE_GRADIENT } from '../../constants/item';
import { COLORS, FONTS } from '../../constants/theme';
import { ChatMessage } from '../../interfaces';
import {
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { socket } from '../../socket_io/socket';
import { TAB_BAR_STYLE } from '../../utils';
export type props = {
  navigation?: any;
  route?: any;
};
const LIMIT = 15;
const ChatScreen: React.FC<props> = ({ navigation, route }) => {
  const [getMessages] = useLazyGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();
  const user = useSelector(selectCurrentUser);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const contact = route.params.contact;
  const receiverId =
    contact?.fk_user_Id_1 === user?.id
      ? contact?.fk_user_Id_2
      : contact?.fk_user_Id_1;
  const messageFound = (messages && messages.length > 0) || loading;

  const fetchMessages = async () => {
    if (loading || reachedEnd) return;

    if (messages.length && messages.length === messages[0].total_count) {
      setReachedEnd(true);
      return;
    }

    setLoading(true);
    const { data: _messages } = await getMessages({
      offset: offset + LIMIT,
      limit: LIMIT,
      receiverId,
      senderId: user?.id,
    });
    setMessages(prev => [...prev, ...(_messages ? _messages : [])]);
    setOffset(prev => prev + LIMIT);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const { data: _messages } = await getMessages({
      offset: 0,
      limit: LIMIT,
      receiverId,
      senderId: user?.id,
    });
    setMessages(_messages ? _messages : []);
    setOffset(0);
    setLoading(false);
  };

  const handleSendMesssage = async (message: string) => {
    socket.emit('send', {
      senderId: user?.id,
      receiverId,
      messageBody: message,
    });
    try {
      await sendMessage({
        message,
        fk_senderId: user?.id,
        fk_receiverId: receiverId,
      });
      await handleRefresh();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        props: {
          text: 'Error !',
          message: "Couldn't send message, please try again later",
        },
      });
    }
  };

  useEffect(() => {
    let unmounted = false;
    socket.emit('add-id', { id: user.id });
    navigation.getParent().setOptions({
      tabBarStyle: {
        ...TAB_BAR_STYLE,
        display: 'none',
      },
    });
    BackHandler.addEventListener('hardwareBackPress', onPressBack);

    if (!unmounted) {
      (async () => {
        await handleRefresh();
        setInitializing(false);
      })();
    }
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          ...TAB_BAR_STYLE,
          display: 'flex',
        },
      });
      BackHandler.removeEventListener('hardwareBackPress', onPressBack);
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    socket.on('receive', async (data: any) => {
      if (data?.senderId && data?.senderId === receiverId) {
        await handleRefresh();
      }
    });
  }, [socket]);

  const onPressBack = (): boolean | null | undefined => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MessageScreen' }],
    });
    return true;
  };

  if (!user && !loading) {
    return (
      <UserNotFound
        navigation={navigation}
        message="Please log in to view your messages"
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
      <View>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={onPressBack}
          />

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '90%',
            }}>
            <Text style={FONTS.h3}>
              {contact?.firstName + ' ' + contact?.lastName}
            </Text>
          </View>
        </View>
      </View>
      {!initializing ? (
        <MaskedView
          style={{ flex: 1, paddingBottom: 60 }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
              }}>
              <LinearGradient
                colors={WHITE_GRADIENT}
                style={{
                  flex: 1,
                  borderRadius: 5,
                }}></LinearGradient>
            </View>
          }>
          <MessageListComponent
            fetchMessages={fetchMessages}
            loading={loading}
            messages={messages}
            reachedEnd={reachedEnd}
            messageFound={messageFound}
          />
        </MaskedView>
      ) : null}

      <ChatTextComponent
        handleOnFocus={() => {}}
        handleSendMesssage={handleSendMesssage}
        navigation={navigation}
      />
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
export default memo(ChatScreen);
