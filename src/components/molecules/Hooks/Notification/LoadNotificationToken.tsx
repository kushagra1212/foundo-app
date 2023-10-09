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
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
export const PUSH_NOTIFICATION_LS = 'PUSH_NOTIFICATION_LS';
export function LoadNotificationToken(): [string, any] {
  const [pushToken, setPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async token => {
        if (token) {
          await setItemToLocalStorage(token, PUSH_NOTIFICATION_LS);
          setPushToken(token);
        }
      })
      .catch(err => console.log(err));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

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

  return [pushToken, notification];
}
