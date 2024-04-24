import { StyleSheet, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

import { MonoText } from "@/components/styled-text";

export interface IBottomSheetOption {
  label: string;
  color: string;
  onPress: () => void;
}

interface IColorBottomSheetProps {
  options: IBottomSheetOption[];
  setSheetRef: (ref: BottomSheetMethods) => void;
}

export default function ColorBottomSheet(props: IColorBottomSheetProps) {
  const { options, setSheetRef } = props;

  return (
    <BottomSheet ref={setSheetRef} height={610}>
      {options.map(({ color, label, onPress: handlePress }) => (
        <View key={color}>
          <TouchableOpacity onPress={handlePress} style={styles.item}>
            <MonoText style={styles.label}>{label}</MonoText>
            <View
              style={[
                styles.color,
                {
                  backgroundColor: color,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      ))}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
  },
  color: {
    height: 40,
    width: 40,
    borderRadius: 999,
  },
});
