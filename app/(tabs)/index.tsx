import { StyleSheet } from "react-native";
import { router } from "expo-router";

import { Text, View } from "@/components/themed";
import FloatingButton from "@/components/ui/floating-button/floating-button";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FloatingButton
        onPress={() => {
          router.push("/create-post/");
        }}
      />
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
