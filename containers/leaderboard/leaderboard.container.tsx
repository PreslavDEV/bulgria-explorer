import { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import Avatar from "@/components/ui/avatar/avatar";
import { TYPES } from "@/configs/di-types.config";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { LeaderboardStore } from "@/stores/leaderboard/leaderboard.store";

export const LeaderboardContainer = observer(() => {
  const { users } = useInjection<LeaderboardStore>(TYPES.LeaderboardStore);

  const colorScheme = useColorScheme();

  const backgroundColor = useMemo(
    () => Colors[colorScheme ?? "light"].background,
    [colorScheme],
  );

  const getColorByRank = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          return "#B8860B";
        case 1:
          return "#BFC1C2";
        case 2:
          return "#8C5839";

        default:
          if (index % 2 === 0) {
            return colorScheme === "dark" ? "#222" : "#ddd";
          }
          return backgroundColor;
      }
    },
    [colorScheme, backgroundColor],
  );

  return (
    <ScrollView style={{ backgroundColor }}>
      {users.map(({ id, username, color, points, ranking }, i) => (
        <View key={id}>
          <LinearGradient
            style={styles.userRow}
            colors={[getColorByRank(i), backgroundColor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0.3, y: 0 }}
          >
            <View style={[styles.userAvatar, styles.transparent]}>
              <MonoText style={styles.mediumText} bold>
                #{ranking}
              </MonoText>
              <Avatar username={username} color={color} />
              <MonoText style={styles.mediumText} bold>
                {username}
              </MonoText>
            </View>
            <MonoText style={styles.mediumText} bold>
              {points}
            </MonoText>
          </LinearGradient>

          {i !== users.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
  mediumText: {
    fontSize: 16,
  },
  userRow: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAvatar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  transparent: {
    backgroundColor: "transparent",
  },
});
