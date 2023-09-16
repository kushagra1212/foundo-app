import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../../constants/theme';
import UserPostsRecommendationScreen from './UserPostsRecommendationScreen';
import UserPostsScreen from './UserPostsScreen';
const Stack = createNativeStackNavigator();

const UserPostsHomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="UserPosts">
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
          title: '',
          headerStyle: { backgroundColor: COLORS.white },
        }}
        name="UserPosts"
        component={UserPostsScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          headerShown: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.white },
        }}
        name="UserPostsRecommendation"
        component={UserPostsRecommendationScreen}
      />
    </Stack.Navigator>
  );
};

export default UserPostsHomeScreen;
