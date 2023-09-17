import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ErrorProps = {
  error: Error;
  resetError: () => void;
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  const { name, message } = error || { name: '', message: '' };

  return (
    <SafeAreaView>
      <Text>{name}</Text>
      <Text>{message}</Text>
    </SafeAreaView>
  );
};

export default Error;
