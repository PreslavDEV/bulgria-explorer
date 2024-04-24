import "reflect-metadata";

import { useCallback, useEffect } from "react";
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
import { Provider, useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { TYPES } from "@/configs/di-types.config";
import { auth } from "@/configs/firebase.config";
import { container } from "@/configs/inversify.config";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthStore } from "@/stores/auth/auth.store";

export { ErrorBoundary } from "expo-router";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  initialRouteName: "(tabs)(user)/index",
};

const SpaceMono = require("../assets/fonts/SpaceMono-Regular.ttf");

SplashScreen.preventAutoHideAsync();

const RootLayoutNav = observer(() => {
  const colorScheme = useColorScheme();
  const { initializing, user, setInitializing, setUser } =
    useInjection<AuthStore>(TYPES.AuthStore);

  const handleAuthStateChanged = useCallback(
    (userState: Maybe<User>) => {
      setUser(userState);
      if (initializing) setInitializing(false);
    },
    [initializing, setInitializing, setUser],
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
});

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

  return (
    <Provider container={container}>
      <RootLayoutNav />
    </Provider>
  );
}
