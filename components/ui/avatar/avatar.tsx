import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { MonoText } from "@/components/styled-text";

interface IAvatarProps {
  username: string;
}

export default function Avatar(props: IAvatarProps) {
  const { username } = props;

  return (
    <LinearGradient
      style={styles.avatar}
      colors={["#FF5F6D", "#2f95dc"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <MonoText style={styles.username} bold>
        {username[0]}
      </MonoText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  username: {
    fontSize: 24,
  },
});
