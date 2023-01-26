import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';
import { useGetMessagesMutation } from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { COLORS, FONTS } from '../../constants/theme';
import MessageListComponent from '../../components/molecules/Message/MessageListComponent';

import { Ionicons } from '../../constants/icons';
export type props = {
  navigation?: any;
};

const ChatScreen: React.FC<props> = ({ navigation }) => {
  const unmounted = useRef(false);
  const user = useSelector(selectCurrentUser);
  const [messageOption, setMessageOption] = useState({
    limit: 5,
    offset: 0,
  });
  const [getMessages, { isLoading, isError }] = useGetMessagesMutation();
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
      if (unmounted.current) return;
      if (res.length === 0) {
        setLoading(false);
        setReachedEnd(true);
        if (messages.length === 0) setMessageFound(false);
        return;
      }
      if (unmounted.current) return;
      setMessageOption({
        ...messageOption,
        offset: messageOption.limit + messageOption.offset,
      });
      setMessages([...messages, ...res]);
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      if (unmounted.current) return;
      setLoading(false);
      setMessageFound(false);
      setReachedEnd(true);
    }
  };
  useEffect(() => {
    if (!unmounted.current) {
      setLoading(true);
      fetchMessages();
    }

    return () => {
      unmounted.current = true;
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
