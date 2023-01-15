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
export type props = {
  contacts: Array<any>;
  reachedEnd: boolean;
  fetchContacts: () => void;
  loading: boolean;
  navigation: any;
  contactFound: boolean;
};
const ContactListComponent: React.FC<props> = ({
  reachedEnd,
  fetchContacts,
  loading,
  contacts,
  navigation,
  contactFound,
}) => {
  const onScroll = (event: any) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
  };
  if (!contactFound) {
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
      data={contacts}
      renderItem={({ item }) => (
        <SingleContactComponent
          navigation={navigation}
          key={item.senderId.toString()}
          contact={item}
        />
      )}
      onEndReached={reachedEnd ? null : fetchContacts}
      keyExtractor={(item) => item.senderId.toString()}
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
export default ContactListComponent;
