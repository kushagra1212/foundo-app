import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import ChatTextComponent from '../../components/atoms/ChatTextComponent';
import UserNotFound from '../../components/atoms/UserNotFound';
import MessageListComponent from '../../components/molecules/Message/MessageListComponent';
import { Ionicons } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { socket } from '../../socket_io/socket';
import { TAB_BAR_STYLE } from '../../utils';
export type props = {
  navigation?: any;
};
const LIMIT = 5;
const ChatScreen: React.FC<props> = ({ navigation }) => {
  const unmounted = useRef(false);
  const user = useSelector(selectCurrentUser);
  const [offset, setOffset] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const receiverId =
    navigation.getState().routes[1].params.contact.fk_user_Id_1 === user?.id
      ? navigation.getState().routes[1].params.contact.fk_user_Id_2
      : navigation.getState().routes[1].params.contact.fk_user_Id_1;
  console.log('receiverId', receiverId);
  const { isLoading, isError, error, isFetching, data, refetch } =
    useGetMessagesQuery({
      offset,
      limit: LIMIT,
      receiverId,
      senderId: user?.id,
    });

  const [sendMessage] = useSendMessageMutation();
  const messages = data?.messages || [];

  const loading = isLoading || isFetching;
  const fetchMessages = () => {
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

    if (messages.length && messages.length === messages[0].total_count) {
      setReachedEnd(true);
      return;
    }

    setOffset(prev => prev + LIMIT);
  };

  const handleSendMesssage = async (message: string) => {
    setOffset(0);
    await sendMessage({
      message,
      fk_senderId: user?.id,
      fk_receiverId: receiverId,
    });
    await refetch();
    socket.emit('send', {
      id: receiverId,
      messageBody: message,
    });
  };

  useEffect(() => {
    socket.emit('add-id', { id: user.id });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          ...TAB_BAR_STYLE,
          display: 'flex',
        },
      });
      unmounted.current = true;
    };
  }, []);

  socket.on('receive', async (data: any) => {
    console.log('data', data);
    setOffset(0);
    await refetch();
  });

  if (!user) {
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
            onPress={() => navigation.goBack()}
          />

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '90%',
            }}>
            <Text style={FONTS.h3}>
              {navigation.getState().routes[1].params.contact?.firstName +
                ' ' +
                navigation.getState().routes[1].params.contact?.lastName}
            </Text>
          </View>
        </View>
      </View>
      <MaskedView
        style={{ flex: 1, paddingBottom: 60 }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              marginTop: 0,
            }}>
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
              }}></LinearGradient>
          </View>
        }>
        <MessageListComponent
          fetchMessages={fetchMessages}
          loading={loading}
          messages={messages}
          reachedEnd={reachedEnd}
          messageFound={messages && messages.length > 0}
        />
      </MaskedView>

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
export default ChatScreen;
