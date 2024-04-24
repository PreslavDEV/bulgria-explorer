import { StyleSheet } from "react-native";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title} bold>
        Leaderboard
      </MonoText>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
