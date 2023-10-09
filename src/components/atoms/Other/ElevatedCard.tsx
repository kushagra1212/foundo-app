import { Text, View } from 'react-native';

import { COLORS, FONTS } from '../../../constants/theme';
type props = {
  title: string;
  description: string;
  elevation?: number;
  elevationCardStyle?: any;
};
const ElevatedCard: React.FC<props> = ({
  title,
  description,
  elevationCardStyle,
  elevation = 10,
}) => {
  return (
    <View
      style={{
        width: '80%',
        backgroundColor: COLORS.white,
        zIndex: 3,
        padding: 20,
        elevation,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: '80%',
        ...elevationCardStyle,
      }}>
      <Text style={FONTS.h1}>{title}</Text>
      <Text style={FONTS.body4}>{description}</Text>
    </View>
  );
};

export default ElevatedCard;
