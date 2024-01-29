import React from 'react';
import * as Notifications from 'expo-notifications';

const scheduleLocalReminder = async (date, titleMessage, bodyMessage) => {
  // Request permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to grant notification permissions to use this feature.');
    return;
  }

  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: bodyMessage,
      data: { someData: 'goes here' },
    },
    trigger: date,
  });

  // Example usage:
  // scheduleLocalReminder(new Date(Date.now() + 60 * 1000));  // Reminder in 1 minute from now
};

export default scheduleLocalReminder;
