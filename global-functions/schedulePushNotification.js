import React from 'react';
import * as Notifications from 'expo-notifications';

const schedulePushNotification = async (expoPushToken, title, body) => {
  let receiptID = await Notifications.scheduleNotificationAsync({
    content: {
      to: expoPushToken,
      title: title,
      body: body,
    },
    trigger: { seconds: 2 },
  });

  return receiptID;
};

export default schedulePushNotification;
