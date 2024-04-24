import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import { DictContext } from "@/providers/dictionary/dictionary.provider";

export default function NotFoundScreen() {
  const { pageTitle, linkText, title } = useContext(DictContext).notFound;

  return (
    <>
      <Stack.Screen options={{ title: pageTitle }} />
      <View style={styles.container}>
        <MonoText style={styles.title} bold>
          {title}
        </MonoText>

        <Link href="/" style={styles.link}>
          <MonoText style={styles.linkText}>{linkText}</MonoText>
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
