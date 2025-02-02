import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Request permissions for notifications
export async function requestFCMPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('FCM permissions granted.');
    } else {
        Alert.alert(
            'Permissions Denied',
            'Please enable notifications in your device settings.'
        );
    }
}

// Subscribe to a topic
export async function subscribeToFCMTopic(topic: string) {
    try {
        await messaging().subscribeToTopic(topic);
        console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
        console.error('Error subscribing to topic:', error);
    }
}

// Save notifications locally
export async function saveFCMNotification(notification: any) {
    const storedNotifications =
        (await AsyncStorage.getItem('notifications')) || '[]';
    const notifications = JSON.parse(storedNotifications);

    notifications.unshift({
        id: Date.now().toString(),
        title: notification.notification?.title || 'Notification',
        body: notification.notification?.body || '',
        timestamp: new Date().toLocaleString(),
    });

    await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(notifications)
    );
}

// Handle notifications when app is in the foreground
export function handleForegroundNotifications() {
    messaging().onMessage(async (remoteMessage) => {
        console.log('Foreground notification:', remoteMessage);
        await saveFCMNotification(remoteMessage);
        Alert.alert(
            remoteMessage.notification?.title || 'Notification',
            remoteMessage.notification?.body || ''
        );
    });
}

// Handle notifications when app is in the background
export function handleBackgroundNotifications() {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Background notification:', remoteMessage);
        await saveFCMNotification(remoteMessage);
    });
}

// Initialize FCM
export async function initializeFCM() {
    await requestFCMPermission();
    handleForegroundNotifications();
    handleBackgroundNotifications();
}
