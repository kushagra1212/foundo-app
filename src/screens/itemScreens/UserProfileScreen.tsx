import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { ListFilterItemViewAllType } from '../../components/atoms/ListItem';
import NotLoggedInProfileComponent from '../../components/molecules/profile/NotLoggedInProfileComponent';
import { Entypo, Ionicons } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';
import { useGetUserQuery } from '../../redux/services/profile-service';
type props = {
  navigation: any;
  route: any;
};

const UserProfileScreen: React.FC<props> = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUserQuery({
    fk_userId: route.params.fk_userId,
  });

  const handleRefreshControl = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleUserPostsButton = () => {
    navigation.navigate('PostsScreen', {
      userId: route.params.fk_userId,
    });
  };

  if ((!user || user === undefined) && !isLoading) {
    return <NotLoggedInProfileComponent navigation={navigation} />;
  }

  return (
    <View style={{ display: 'flex' }}>
      {isLoading && !user ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              padding: 10,
            }}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshControl}>
            <ScrollView>
              <View style={styles.profile_view}>
                <View>
                  {user?.profilePhoto ? (
                    <Image
                      source={{
                        uri: user?.profilePhoto ? user?.profilePhoto : '',
                      }}
                      style={{
                        ...styles.profile_img,
                        aspectRatio: 1,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        ...styles.profile_img,
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {user ? (
                        <Text style={{ color: 'white', fontSize: 45 }}>
                          {user.firstName.split('')[0].split('')[0] +
                            user.lastName.split('')[0].split('')[0]}
                        </Text>
                      ) : (
                        <ActivityIndicator size="large" color={COLORS.white} />
                      )}
                    </View>
                  )}
                </View>
                <View>
                  <Text style={{ ...FONTS.h3, margin: 10 }}>
                    {user?.firstName + ' ' + user?.lastName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  margin: 10,
                }}>
                <Text style={{ ...FONTS.h4, opacity: 0.6 }}>
                  Contact Details
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.lightGrayPrePrimary,
                    marginTop: 5,
                  }}>
                  {user?.email && (
                    <ListFilterItemViewAllType
                      arrowText=""
                      items={undefined}
                      text={user?.email}
                      icon={
                        <View
                          style={{ marginRight: 10, justifyContent: 'center' }}>
                          <Entypo name="email" size={20} />
                        </View>
                      }
                    />
                  )}
                  {user?.phoneNo && (
                    <ListFilterItemViewAllType
                      arrowText=""
                      items={undefined}
                      text={user?.phoneNo}
                      icon={
                        <View
                          style={{ marginRight: 10, justifyContent: 'center' }}>
                          <Entypo name="phone" size={20} />
                        </View>
                      }
                    />
                  )}
                  {user?.address && (
                    <ListFilterItemViewAllType
                      arrowText=""
                      items={undefined}
                      text={user?.address}
                      icon={
                        <View
                          style={{ marginRight: 10, justifyContent: 'center' }}>
                          <Entypo name="address" size={20} />
                        </View>
                      }
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={handleUserPostsButton}
                style={styles.user_posts_btn}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                  {user?.firstName + "'s Posts"}
                </Text>
                <Entypo name="chevron-right" size={35} color={COLORS.white} />
              </TouchableOpacity>
            </ScrollView>
          </RefreshControl>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profile_view: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  profile_img: {
    height: 150,
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  user_posts_btn: {
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 30,
    margin: 10,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
export default UserProfileScreen;
