import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import SingleContactComponent from './SingleContactComponent';
import AnimatedComponent from '../Animation/AnimatedComponent';
import character4 from '../../../assets/images/character4.png';
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
      <AnimatedComponent
        source={character4}
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
