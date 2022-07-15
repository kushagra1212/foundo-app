import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const COLORS = {
  primary: '',
  secondary: '',

  white: '',
  black: '',
  green: '',
  red: '',
  gray: '',
  lightGrey1: '',
  lightGrey2: '',
};

export const SIZES = {
  //global
  base: 8,
  font: 14,
  radius: 20,
  padding: 24,

  //font Sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 10,
};

export const FONTS = {
  h1: {
    fontfamily: 'Roboto-black',
    fontsize: SIZES.h1,
    lineheight: 30,
  },
  h2: {
    fontfamily: 'Roboto-blold',
    fontsize: SIZES.h2,
    lineheight: 30,
  },
  h3: {
    fontfamily: 'Roboto-blold',
    fontsize: SIZES.h3,
    lineheight: 22,
  },
  h4: {
    fontfamily: 'Roboto-blold',
    fontsize: SIZES.h4,
    lineheight: 22,
  },
  body1: {
    fontfamily: 'Roboto-Regular',
    fontsize: SIZES.h1,
    lineheight: 30,
  },
  body2: {
    fontfamily: 'Roboto-Regular',
    fontsize: SIZES.body2,
    lineheight: 30,
  },
  body3: {
    fontfamily: 'Roboto-Regular',
    fontsize: SIZES.body3,
    lineheight: 22,
  },
  body4: {
    fontfamily: 'Roboto-Regular',
    fontsize: SIZES.body4,
    lineheight: 22,
  },
};

const appTheme = { FONTS, COLORS, SIZES };

export default appTheme;
