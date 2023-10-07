export const routesConfig = {
  screens: {
    Home: {
      path: 'home',
      screens: {
        FeedScreen: {
          path: 'feed',
          screens: {
            ItemScreen: 'item',
            FeedSearchScreen: 'feedsearch',
            UserProfileScreen: 'userprofile',
          },
        },
        AddItemScreen: {
          path: 'additems',
          screens: {
            SelectItemTypeScreen: 'selectitemtype',
            AddItemDetailsScreen: 'additemdetails',
          },
        },
        ProfileScreen: {
          path: 'profile',
        },
        MessageScreen: {
          path: 'message',
          screens: {
            ChatScreen: 'chat',
            ContactScreen: 'contact',
          },
        },
        UserPostsHomeScreen: {
          path: 'userpostshome',
          screens: {
            UserPostsScreen: 'userposts',
            UserPostsRecommendationScreen: 'userpostsrecommendation',
          },
        },
      },
    },
    Auth: {
      path: 'auth',
      screens: {
        Signin: 'signin',
        Signup: 'signup',
        ResetPassword: 'resetpassword/:email/:token',
        Forgotpassword: 'forgotpassword',
      },
    },
  },
};
