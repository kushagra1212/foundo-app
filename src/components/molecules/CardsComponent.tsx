import { StyleSheet, Text, View, TextInput } from 'react-native';
import { COLORS } from '../../constants/theme';
export type props = {};
import { ITEMS } from '../../Dummy/constants';
import SingleCardComponent from '../atoms/SingleCardComponent';
const CardsComponent: React.FC<props> = ({}) => {
  return (
    <View style={styles.cards}>
      <SingleCardComponent item={ITEMS[0]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default CardsComponent;
