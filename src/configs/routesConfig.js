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
