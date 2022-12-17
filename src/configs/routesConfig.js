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
