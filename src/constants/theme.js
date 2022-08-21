import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
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

  lightGrayPrePrimary: '#F5F7FF',
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
  title: 50,
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
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h1,
    lineHeight: 30,
  },
  h2: {
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h3,
    lineHeight: 26,
  },
  h4: {
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  body1: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.h1,
    lineHeight: 30,
  },
  body2: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = { FONTS, COLORS, SIZES };

export default appTheme;
