import { StyleProp, TextStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useColorScheme } from "@/hooks/use-color-scheme";

export interface IIconProps extends React.ComponentProps<typeof FontAwesome> {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function Icon(props: IIconProps) {
  const colorScheme = useColorScheme();

  return (
    <FontAwesome
      size={28}
      color={props.color || colorScheme === "dark" ? "#fff" : "#000"}
      {...props}
    />
  );
}
