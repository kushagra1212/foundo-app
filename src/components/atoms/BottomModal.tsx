import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '../../constants/icons';
import { COLORS, SIZES } from '../../constants/theme';
type AnimationType = 'slide' | 'none' | 'fade' | undefined;
type Props = {
  isVisible: boolean;
  children: JSX.Element;
  onClose: (options: any) => void;
  backgroundFilter: boolean;
  effect?: AnimationType;
  titleText?: string;
  refreshAvail?: boolean;
  reset?: () => void;
  height?: string | number;
  iconName?: string;
};
const BottomModal: React.FC<Props> = ({
  isVisible,
  children,
  onClose,
  backgroundFilter,
  reset,
  iconName = 'chevron-back',
  height = '80%',
  effect = 'slide',
  titleText = '',
  refreshAvail = false,
}) => {
  return (
    <Modal
      animationType={effect}
      transparent={true}
      visible={isVisible}
      statusBarTranslucent={true}
      style={{ backgroundColor: COLORS.lightGrayPrePrimary }}
    >
      <View style={backgroundFilter ? styles.modal : { height: '100%' }}></View>
      <View style={[styles.modalContent, { height }]}>
        <View style={styles.titleContainer}>
          <Pressable onPress={onClose}>
            <Ionicons
              style={{
                fontWeight: '500',
              }}
              name={iconName !== 'chevron-back' ? iconName : 'chevron-back'}
              size={35}
            />
          </Pressable>
          <Text style={styles.title}>{titleText}</Text>
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
