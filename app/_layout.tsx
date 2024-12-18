import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { requestFCMPermission, subscribeToTopic } from '@/services/fcmService'; // Import FCM service
import { useColorScheme } from '@/components/useColorScheme';

export default function RootLayout() {
  useEffect(() => {
    const initializeFCM = async () => {
      await requestFCMPermission(); // Request notification permissions
      await subscribeToTopic('sensor-alerts'); // Subscribe to the topic
    };

    initializeFCM();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
