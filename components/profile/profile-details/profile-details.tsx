import { useCallback } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetMethods } from "@devvie/bottom-sheet";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import Avatar from "@/components/ui/avatar/avatar";
import { IUser } from "@/stores/auth/interface";

import { ProfilePointsInfo } from "./profile-points-info/profile-points-info";

export interface IProfileDetailsProps extends Omit<IUser, "email" | "id"> {
  sheetRef: Maybe<BottomSheetMethods>;
  onSignOut: () => void;
}

export const ProfileDetails = (props: IProfileDetailsProps) => {
  const { username, color, points, ranking, sheetRef } = props;

  const handleOpenSheet = useCallback(() => {
    sheetRef?.open();
  }, [sheetRef]);

  return (
    <View style={styles.mainSections}>
      <View>
        <Avatar username={username} color={color} size={100} />
        <MonoText style={styles.username} bold>
          {username}
        </MonoText>
      </View>
      <View style={styles.details}>
        <ProfilePointsInfo points={points} />

        <View style={styles.row}>
          <MonoText style={styles.smallText}>You are ranked:</MonoText>
          <MonoText style={styles.mediumText} bold>
            #{ranking}
          </MonoText>
        </View>

        <TouchableOpacity style={styles.changeColor} onPress={handleOpenSheet}>
          <MonoText bold>Change your color</MonoText>
        </TouchableOpacity>

        <Button title="Sign Out" onPress={props.onSignOut} color="#E57373" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainSections: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  details: {
    gap: 8,
  },
  username: {
    fontSize: 32,
  },
  mediumText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  changeColor: {
    backgroundColor: "#222",
    padding: 8,
    borderRadius: 2,
    alignItems: "center",
  },
});
