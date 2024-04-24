import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { MonoText } from "@/components/styled-text";

interface IAvatarProps {
  username: string;
  color: string;
  size?: number;
}

export default function Avatar(props: IAvatarProps) {
  const { username, color, size = 48 } = props;

  return (
    <LinearGradient
      style={[styles.avatar, { height: size, width: size }]}
      colors={[color, "#2f95dc"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <MonoText style={{ fontSize: size / 2 }} bold lightColor="#fff">
        {username[0]}
      </MonoText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});
