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
import SingleContactComponent from './SingleContactComponent';
import NotFoundComponent from '../../atoms/NotFoundComponent';
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
      <NotFoundComponent
        title="No Results"
        description={`You don't have any contacts yet`}
      />
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
