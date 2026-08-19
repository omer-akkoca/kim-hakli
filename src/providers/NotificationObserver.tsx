import React, { PropsWithChildren, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

const NotificationObserver: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
      const { storyId } = response.notification.request.content.data;

      if (typeof storyId === 'string') {
        router.push({
          pathname: '/story/[id]',
          params: { id: storyId },
        });

        Notifications.clearLastNotificationResponse();
      }
    };

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      handleNotificationResponse(response);
    });

    const handleInitialNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();

      if (response) {
        handleNotificationResponse(response);
      }
    };

    void handleInitialNotification();

    return () => subscription.remove();
  }, [router]);

  return children;
};

export { NotificationObserver };
