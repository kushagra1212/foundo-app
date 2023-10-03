import * as Location from 'expo-location';
import { Dimensions } from 'react-native';

import { COLORS } from '../constants/theme';
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');
export const TAB_BAR_STYLE: any = {
  backgroundColor: COLORS.white,
  height: 70,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: 10,
  elevation: 50,
  borderRadius: 20,
  marginTop: -20,
};
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const capitalizeEveryWord = (str: string) => {
  return str
    .split(' ')
    .map((word: string) => capitalizeFirstLetter(word))
    .join(' ');
};
export const numToBool = (num: number): boolean => {
  return num === 1;
};
export const getBase64FromUrl = async (url: string): Promise<unknown> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
export const LinearGradientColorBlackToWhite: string[] = [
  '#FFFFFF00',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
];
export const getAddress = (response: Location.LocationGeocodedAddress[]) => {
  let address = '';
  for (const item of response) {
    //if (item?.name) address += `${item?.name}, `;
    if (item?.street) address += `${item?.street}, `;
    if (item?.postalCode) address += `${item?.postalCode}, `;
    if (item?.city) address += `${item?.city}, `;
    if (item?.subregion) address += `${item?.subregion}, `;
    if (item?.region) address += `${item?.region}, `;
    if (item?.country) address += `${item?.country}`;
  }
  return {
    address,
    name: response[0]?.name,
    street: response[0]?.street,
    postalCode: response[0]?.postalCode,
    city: response[0]?.city,
    subregion: response[0]?.subregion,
    region: response[0]?.region,
    country: response[0]?.country,
  };
};

export const handleErrors = (
  error: Error,
  stackTrace: string,
): void | undefined => {
  console.log('error', error);
  console.log('stackTrace', stackTrace);
};
