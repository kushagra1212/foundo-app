import React, { Ref, forwardRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';

import { COLORS, SIZES } from '../../../constants/theme';
// type props = {
//   value: string;
//   onChange: (value: string) => void;
//   focusElement: HTMLInputElement;
// };

const OTPInputBox = forwardRef(
  (
    {
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    },
    ref: Ref<TextInput>,
  ) => {
    return (
      <TextInput
        style={{
          height: 70,
          width: 80,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          elevation: 5,
          padding: 10,
          textAlign: 'center',
          fontSize: SIZES.h1,
          zIndex: 4,
        }}
        ref={ref}
        maxLength={1}
        keyboardType={'numeric'}
        value={value}
        onChangeText={onChange}
      />
    );
  },
);
export default OTPInputBox;
