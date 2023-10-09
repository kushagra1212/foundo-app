import { Text, View } from 'react-native';

type props = {
  contentText: string;
};

const ContentBar: React.FC<props> = ({ contentText }) => {
  return (
    <View>
      <Text>{contentText}</Text>
    </View>
  );
};

export default ContentBar;
