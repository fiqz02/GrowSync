import messaging from '@react-native-firebase/messaging';

export const requestFCMPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  } else {
    throw new Error('FCM permission not granted');
  }
};

export const subscribeToTopic = async (topic: string) => {
  await messaging().subscribeToTopic(topic);
  console.log(`Subscribed to topic: ${topic}`);
};
