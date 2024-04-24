import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icon/icon";

interface IFloatingButtonProps {
  onPress: () => void;
}

export default function FloatingButton(props: IFloatingButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
      <Icon name="plus" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    right: 32,
    backgroundColor: "#2f95dc",
    borderRadius: 999,
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
  },
});