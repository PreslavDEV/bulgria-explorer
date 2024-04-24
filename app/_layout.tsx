import { useCallback, useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "@/firebase.config";
import { useColorScheme } from "@/hooks/use-color-scheme";

export { ErrorBoundary } from "expo-router";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const SpaceMono = require("../assets/fonts/SpaceMono-Regular.ttf");

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  const handleAuthStateChanged = useCallback(
    (userState: User | null) => {
      setUser(userState);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {user ? (
          <Stack.Screen name="(tabs)/(user)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)/(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
    </ThemeProvider>
  );
}
