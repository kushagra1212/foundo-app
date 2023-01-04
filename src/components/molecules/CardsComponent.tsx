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

import SingleCardComponent from '../atoms/SingleCardComponent';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { boolean } from 'yup';
import { FilterItemOn, Post } from '../../interfaces';
import AnimationTranslateScale from './Animations/AnimationTranslateScale';

import character13 from '../../assets/images/character13.png';
import ElevatedCard from '../atoms/ElevatedCard';
export type props = {
  postFound: boolean;
  posts: Array<Post>;
  reachedEnd: boolean;
  fetchPosts: () => void;
  loading: boolean;
};
const CardsComponent: React.FC<props> = ({
  postFound,
  reachedEnd,
  fetchPosts,
  loading,
  posts,
}) => {
  const onScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
  };

  if (!postFound) {
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
          description={`Sorry We couldn't found anything`}
        />
      </View>
    );
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <SingleCardComponent key={item.id.toString()} item={item} />
      )}
      onEndReached={reachedEnd ? null : fetchPosts}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="large" color={COLORS.greenPrimary} />
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
export default CardsComponent;
