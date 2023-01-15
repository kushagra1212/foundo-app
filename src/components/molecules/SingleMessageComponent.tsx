import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { boolean } from 'yup';
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIconsCommunity,
} from '../../constants/icons';
import { ITEM_STANDARD_COLORS } from '../../constants/item';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { Post } from '../../interfaces';
import { useState } from 'react';
import { capitalizeFirstLetter } from '../../utils';
import ItemComponent from './ItemComponent';
export type props = {
  message: any;
};
const SingleMessageComponent: React.FC<props> = ({ message }) => {
  console.log(message, 'message');
  const [readMore, setReadMore] = useState<boolean>(false);
  return (
    <View style={styles.message}>
      <View style={{ borderBottomWidth: 1, width: '100%' }}>
        <Text style={(FONTS.h3, { margin: 10 })}>{message.title}</Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          maxHeight: readMore ? '100%' : 200,
        }}
      >
        {message.message.length > 100 && !readMore ? (
          <Text style={(FONTS.h3, { margin: 10 })}>
            {message.message.substring(0, 100)}
            <Text
              style={{ color: COLORS.redPrimary }}
              onPress={() => setReadMore(true)}
            >
              {' '}
              read more
            </Text>
          </Text>
        ) : message.message.length > 100 && readMore ? (
          <Text style={(FONTS.h3, { margin: 10 })}>
            {message.message}
            <Text
              style={{ color: COLORS.redPrimary }}
              onPress={() => setReadMore(false)}
            >
              read less
            </Text>
          </Text>
        ) : (
          <Text style={(FONTS.h3, { margin: 10 })}>{message.message}</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: COLORS.white,
    overflow: 'scroll',
    borderRadius: 10,
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
export default SingleMessageComponent;
