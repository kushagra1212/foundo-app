import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Ionicons } from '../../../constants/icons';
import { COLORS, SIZES } from '../../../constants/theme';
type AnimationType = 'slide' | 'none' | 'fade' | undefined;
type Props = {
  isVisible: boolean;
  children: JSX.Element;
  onClose: (options?: any) => void;
  backgroundFilter: boolean;
  effect?: AnimationType;
  titleText?: string;
  refreshAvail?: boolean;
  reset?: () => void;
  height?: string | number;
  iconName?: string;
  backgroundColor?: string;
};
const BottomModal: React.FC<Props> = ({
  isVisible,
  children,
  onClose,
  backgroundFilter,
  reset,
  iconName = 'close-circle',
  height = '80%',
  effect = 'slide',
  titleText = '',
  refreshAvail = false,
  backgroundColor = COLORS.lightGrayPrePrimary,
}) => {
  return (
    <Modal
      animationType={effect}
      transparent={true}
      visible={isVisible}
      statusBarTranslucent={true}
      style={{ backgroundColor }}
      key={titleText}
      onRequestClose={onClose}>
      <View style={backgroundFilter ? styles.modal : { height: '100%' }}></View>
      <View style={[styles.modalContent, { height }]}>
        <View style={styles.titleContainer}>
          {refreshAvail && (
            <Pressable onPress={reset}>
              <Ionicons
                style={{
                  fontWeight: '500',
                }}
                name="refresh"
                size={35}
              />
            </Pressable>
          )}
          <Text style={styles.title}>{titleText}</Text>

          <TouchableWithoutFeedback onPressOut={onClose} testID="closeButton">
            <Ionicons
              style={{
                fontWeight: '500',
              }}
              name={iconName !== 'close-circle' ? iconName : 'close-circle'}
              size={45}
            />
          </TouchableWithoutFeedback>
        </View>
        {children}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    height: '100%',
    backgroundColor: COLORS.black,
    opacity: 0.8,
  },
  modalContent: {
    height: '80%',
    width: '100%',
    opacity: 1,
    backgroundColor: COLORS.lightGrayPrePrimary,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    alignSelf: 'center',
  },
  titleContainer: {
    height: 60,
    backgroundColor: COLORS.lightGrayPrePrimary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 50,
  },
  title: {
    fontSize: SIZES.body2,
    fontWeight: '500',
    width: '80%',
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

export default BottomModal;
