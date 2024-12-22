import React, { useContext, useEffect, useState } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider,} from "@react-navigation/native";
import { Slot, useRouter } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { auth } from "./firebase.config";
import { User } from "firebase/auth";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

// Context for authentication
const AuthContext = React.createContext<{ user: User | null }>({ user: null });

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/authentication"); // Redirect to login
    } else {
      router.replace("/(auth)/(tabs)"); // Redirect authenticated users to tabs
    }
  }, [user]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Slot ensures child routes are rendered correctly */}
      <Slot />
    </ThemeProvider>
  );
}
