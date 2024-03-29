import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';

import { registerForPushNotificationsAsync } from '../../../../Notification/Notification';
import { setItemToLocalStorage } from '../../../../storage/foundo-localstorage';

export type credentialsType = null | {
  user: {
    email: string;
  };
  jwtToken: string;
  jwtResetToken?: string;
};
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Welcome to Foundo',
      body: 'Let us help you find your lost items',
    },
    trigger: {
      seconds: 1,
    },
  });
}
export const PUSH_NOTIFICATION_LS = 'PUSH_NOTIFICATION_LS';
export function LoadNotificationToken(): [string] {
  const [pushToken, setPushToken] = useState('');
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    schedulePushNotification();
    registerForPushNotificationsAsync()
      .then(async token => {
        if (token) {
          await setItemToLocalStorage(token, PUSH_NOTIFICATION_LS);

          setPushToken(token);
        }
      })
      .catch(err => console.log(err));

    return () => {
      console.log('Clean up notification');
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return [pushToken];
}
