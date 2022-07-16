import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const COLORS = {
  primary: '#0165FF',

  redPrimary: '#ED556F',
  redSecondary: '#DA445F ',

  orangePrimary: '#FC6E51',
  orangeSecondary: '#E9573F',

  yellowPrimary: '#FFCE54',
  yellowSecondary: '#FCBB42 ',

  greenPrimary: '#A0D468',
  greenSecondary: '#8CC152',

  mintPrimary: '#48CFAD',
  mintSecondary: '#37BC9B',

  lightbluePrimary: '#4FC1E9  ',
  lightblueSecondary: '#3BAFDA',

  bluePrimary: '#0D9CFF',
  blueSecondary: '#0A89FF',

  purplePrimary: '#AC92EC',
  purpleSecondary: '#967ADC',

  pinkPrimary: '#EC87C0',
  pinkSecond: '#D770AD',

  lightGrayPrimary: '#F5F7FA',
  lightGraySecondary: '#E6E9ED',

  GrayPrimary: '#CCD0D9',
  GraySecondary: '#AAB2BD',

  blackPrimary: '#656D78',
  blackSecondary: '#444955',
  black: '#0E0E0E',
  white: '#FFFFFF',
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
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 10,
  btnHeight1: 10,
  btnHeight2: 50,
};
export const STYLE = {
  elevation1: 10,
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
