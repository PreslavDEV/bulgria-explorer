import { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";

import { Text, View } from "@/components/themed";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

import Icon, { IIconProps } from "../icon/icon";

export interface IInputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIconProps?: IIconProps;
}

export default function InputField(props: IInputProps) {
  const { label, error, rightIconProps, ...rest } = props;
  const colorScheme = useColorScheme();

  const inputStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      ...styles.input,
      backgroundColor: error && Colors[colorScheme ?? "light"].inputErrorBg,
      color: Colors[colorScheme ?? "light"].inputText,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: error
        ? Colors[colorScheme ?? "light"].inputError
        : Colors[colorScheme ?? "light"].inputBorder,
    }),
    [colorScheme, error],
  );

  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      <TextInput style={inputStyle} {...rest} />
      {error && (
        <Text style={{ color: Colors[colorScheme ?? "light"].inputError }}>
          {error}
        </Text>
      )}
      {rightIconProps && <Icon style={styles.rightIcon} {...rightIconProps} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    position: "relative",
  },
  input: {
    minHeight: 48,
  },
  rightIcon: {
    position: "absolute",
    right: 8,
    top: 36,
  },
});
