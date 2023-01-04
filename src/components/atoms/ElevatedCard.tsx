import { COLORS, FONTS } from '../../constants/theme';
import { Text, View } from 'react-native';
type props = {
  title: string;
  description: string;
};
const ElevatedCard: React.FC<props> = ({ title, description }) => {
  return (
    <View
      style={{
        width: '80%',
        backgroundColor: COLORS.white,
        zIndex: 3,
        padding: 20,
        elevation: 10,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80%',
      }}
    >
      <Text style={FONTS.h1}>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default ElevatedCard;
