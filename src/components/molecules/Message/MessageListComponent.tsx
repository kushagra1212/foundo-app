import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS } from '../../../constants/theme';

import SingleCardComponent from '../Item/Card/SingleCardComponent';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { boolean } from 'yup';
import { FilterItemOn, Post } from '../../../interfaces';
import AnimationTranslateScale from '../Animation/AnimationTranslateScale';

import ElevatedCard from '../../atoms/ElevatedCard';
import SingleContactComponent from '../Contact/SingleContactComponent';
import SingleMessageComponent from './SingleMessageComponent';
import NotFoundComponent from '../../atoms/NotFoundComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
export type props = {
  messages: Array<any>;
  reachedEnd: boolean;
  fetchMessages: () => void;
  loading: boolean;
  messageFound: boolean;
};
const MessageListComponent: React.FC<props> = ({
  reachedEnd,
  fetchMessages,
  loading,
  messages,
  messageFound,
}) => {
  const onScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
  };
  if (!messageFound) {
    return (
      <NotFoundComponent
        title={'No Results'}
        description={"You don't have any messages yet"}
      />
    );
  }
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <SingleMessageComponent key={item.id.toString()} message={item} />
      )}
      inverted={true}
      onEndReached={reachedEnd ? null : fetchMessages}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <SafeAreaView>
            <ActivityIndicator
              size="large"
              style={{ marginBottom: 20 }}
              color={COLORS.primary}
            />
          </SafeAreaView>
        ) : null
      }
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: COLORS.GrayPrimary,
  },
});
export default MessageListComponent;
