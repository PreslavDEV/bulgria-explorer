import { StyleProp, TextStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export interface IIconProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function Icon(props: IIconProps) {
  return <FontAwesome size={28} {...props} />;
}
