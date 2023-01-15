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
import {
  useGetContactsMutation,
  useGetMessagesMutation,
} from '../../redux/services/message-service';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import ContactListComponent from '../../components/molecules/ContactListComponent';
import { COLORS } from '../../constants/theme';
import MessageListComponent from '../../components/molecules/MessageListComponent';
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
    if (!unmouted) fetchMessages();
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
  search_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_search_input: {
    width: '90%',
  },
});
export default ChatScreen;
