import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

async function registerForPushNotificationsAsync({
  failMessage,
  deviceMessage,
} = {}) {
  let token;

  if (Device.isDevice) {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return alert(
        failMessage ?? 'Failed to get push token for push notification!'
      );
    }

    const tokenResult = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    token = tokenResult.data;
  } else {
    alert(deviceMessage ?? 'Must use physical device for Push Notifications');
  }

  return token;
}

export default registerForPushNotificationsAsync;
