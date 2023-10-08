import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import character4 from '../../../assets/images/character4.png';
import { COLORS } from '../../../constants/theme';
import { selectCurrentUserId } from '../../../redux/slices/authSlice';
import { contactType } from '../../../screens/contactScreens/ContactScreen';
import { SCREEN_HEIGHT } from '../../../utils';
import AnimatedComponent from '../Animation/AnimatedComponent';
import SingleContactComponent from './SingleContactComponent';

export type props = {
  contacts: contactType[];
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
  const currentUserId = useSelector(selectCurrentUserId);
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
          currentUserId={currentUserId}
          navigation={navigation}
          key={item.id.toString()}
          contact={item}
        />
      )}
      onEndReached={reachedEnd ? null : fetchContacts}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginBottom: 20 }}
            color={COLORS.primary}
          />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: COLORS.lightGrayPrePrimary,
    minHeight: SCREEN_HEIGHT * 0.9,
  },
});
export default ContactListComponent;
