import { memo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Feather } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../utils';
export type props = {
  navigation?: any;
  handleOnFocus?: () => void;
  handleSendMesssage: (searchString: string) => void;
};
const ChatTextComponent: React.FC<props> = ({
  handleOnFocus,
  handleSendMesssage,
  navigation,
}) => {
  const [input, setInput] = useState<string>('');

  const registerString = (searchString: string) => {
    setInput(searchString);
  };

  const disabled = input.length === 0;

  return (
    <View style={styles.chat_input}>
      <TextInput
        style={[styles.item_text_ip, FONTS.body3]}
        placeholder="Type a message ..."
        onFocus={handleOnFocus}
        autoFocus={true}
        onChangeText={registerString}
        testID="searchInput"
        value={input}
      />
      <TouchableOpacity
        onPress={() => {
          const prevInput = input;
          setInput('');
          handleSendMesssage(prevInput);
        }}
        disabled={disabled}
        testID="sendMessageButtonFromChat">
        <Feather
          name="send"
          size={35}
          color={disabled ? COLORS.GrayPrimary : COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chat_input: {
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 10,
    margin: 5,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH - 20,
    marginRight: 10,
    marginLeft: 10,
  },
  item_text_ip: {
    marginLeft: 10,
    width: '85%',
  },
});
export default memo(ChatTextComponent);
