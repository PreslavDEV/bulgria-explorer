import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

import {
  IProfileDetailsProps,
  ProfileDetails,
} from "./profile-details/profile-details";
import { IProfilePostsProps } from "./profile-posts/interface";
import { ProfilePosts } from "./profile-posts/profile-posts";

interface IProfileProps extends IProfileDetailsProps, IProfilePostsProps {}

export const Profile = (props: IProfileProps) => {
  const { posts, ...profileDetailsProps } = props;
  const colorScheme = useColorScheme();

  const backgroundColor = useMemo(
    () => Colors[colorScheme ?? "light"].background,
    [colorScheme],
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <ProfileDetails {...profileDetailsProps} />
      <ProfilePosts posts={posts} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
