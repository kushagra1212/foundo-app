import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import AnimatedComponent from '../Animation/AnimatedComponent';
import character5 from '../../../assets/images/character5.png';
import object3 from '../../../assets/images/object3.png';
import AnimatedObject from '../Animation/AnimatedObject';
import LogInButtonComponent from '../../atoms/LogInButtonComponent';
import { View } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import NotLoggedInComponent from '../../atoms/NotLoggedInComponent';
type props = {
  navigation: any;
  characterSource?: ImageSourcePropType;
};
const NotLoggedInProfileComponent: React.FC<props> = ({
  navigation,
  characterSource = character5,
}) => {
  return (
    <NotLoggedInComponent
      navigation={navigation}
      title="Not Logged In"
      desciption="Please login to see your profile"
      characterSource={characterSource}
      objectSource={object3}
    />
  );
};

export default NotLoggedInProfileComponent;
