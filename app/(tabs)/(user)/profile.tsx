import { useCallback } from "react";
import { Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useInjection } from "inversify-react";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import { TYPES } from "@/configs/di-types.config";
import { AuthStore } from "@/stores/auth/auth.store";

export default function SignInScreen() {
  const { signOut } = useInjection<AuthStore>(TYPES.AuthStore);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.replace("/(tabs)/");
  }, [signOut]);

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Profile</MonoText>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
