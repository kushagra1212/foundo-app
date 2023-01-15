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
        ProfileScreen: {
          path: 'profilescreen',
        },
        MessageScreen: {
          path: 'MessageScreen',
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
