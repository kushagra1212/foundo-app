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
import { COLORS, FONTS } from '../../constants/theme';

import SingleCardComponent from './SingleCardComponent';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { boolean } from 'yup';
import { FilterItemOn, Post } from '../../interfaces';
import AnimationTranslateScale from './Animations/AnimationTranslateScale';

import character13 from '../../assets/images/character13.png';
import ElevatedCard from '../atoms/ElevatedCard';
import SingleContactComponent from './SingleContactComponent';
import SingleMessageComponent from './SingleMessageComponent';
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
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            backgroundColor: COLORS.lightGraySecondary,
            width: '100%',
            height: '100%',
            borderRadius: 25,
          }}
        >
          <AnimationTranslateScale scaleRange={[1, 1.3]} scaleDuration={500}>
            <Image
              source={character13}
              style={{
                width: 500,
                height: 500,
                position: 'absolute',
                zIndex: 0,
                right: 1,
              }}
            />
          </AnimationTranslateScale>
        </View>
        <ElevatedCard
          title="No Results"
          description={`You don't have any contacts yet`}
        />
      </View>
    );
  }
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <SingleMessageComponent key={item.id.toString()} message={item} />
      )}
      onEndReached={reachedEnd ? null : fetchMessages}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginBottom: 20 }}
            color={COLORS.primary}
          />
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
