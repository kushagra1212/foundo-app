import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo, Ionicons } from '../../constants/icons';
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
};
const BottomModal: React.FC<Props> = ({
  isVisible,
  children,
  onClose,
  backgroundFilter,
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
    >
      <View style={backgroundFilter ? styles.modal : { height: '100%' }}></View>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Pressable onPress={onClose}>
            <Ionicons
              style={{
                fontWeight: '500',
              }}
              name="chevron-back"
              size={30}
            />
          </Pressable>
          <Text style={styles.title}>{titleText}</Text>
          {refreshAvail && (
            <Pressable onPress={onClose}>
              <Ionicons
                style={{
                  fontWeight: '500',
                }}
                name="refresh"
                size={30}
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
    height: '30%',
    backgroundColor: COLORS.black,
    opacity: 0.8,
  },
  modalContent: {
    height: '80%',
    width: '100%',
    opacity: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
  },
  titleContainer: {
    height: '10%',
    backgroundColor: COLORS.white,
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
