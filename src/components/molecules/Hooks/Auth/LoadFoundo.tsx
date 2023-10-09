import { useFonts } from '@expo-google-fonts/roboto';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

import { ROBOTO_FONTS } from '../../../../assets/fonts';
import { userLoggedIn } from '../../../../redux/services/auth-service';
import { LoadNotificationToken } from '../Notification/LoadNotificationToken';
export type credentialsType = null | {
  user: {
    email: string;
  };
  jwtToken: string;
  jwtResetToken?: string;
  pushNotificationToken?: string;
};
export function LoadFoundo(): [boolean, Error | null, credentialsType] {
  const [isfontLoaded] = useFonts(ROBOTO_FONTS);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pushToken, notification] = LoadNotificationToken();
  console.log(notification);
  const [credentials, setCredentials] = useState<credentialsType>(null);
  const url = Linking.useURL();

  useEffect(() => {
    let flag = true;
    if (isfontLoaded && flag) {
      userLoggedIn()
        .then((res: any) => {
          if (!flag) return;
          if (res.isLoggedIn === true) {
            setCredentials({
              user: res.user,
              jwtToken: res.token,
            });
          } else if (url) {
            const { path } = Linking.parse(url);
            const pathArray = path?.split('/');
            if (pathArray !== undefined && pathArray?.length >= 2) {
              setCredentials({
                user: { email: pathArray[pathArray?.length - 2] },
                jwtResetToken: pathArray[pathArray?.length - 1],
                jwtToken: '',
                pushNotificationToken: pushToken,
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          setError(err);
        })
        .finally(() => {
          setLoaded(true);
        });
    }

    return () => {
      flag = false;
    };
  }, [isfontLoaded]);

  return [loaded, error, credentials];
}
