import React from 'react';
import { ImageSourcePropType } from 'react-native';
import character5 from '../../../assets/images/character5.png';
import object3 from '../../../assets/images/object3.png';
import NotLoggedInComponent from '../../atoms/Auth/NotLoggedInComponent';
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
