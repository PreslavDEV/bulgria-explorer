import { StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <MonoText style={styles.title}>404 Not found!</MonoText>

        <Link href="/" style={styles.link}>
          <MonoText style={styles.linkText}>Go to home screen!</MonoText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
