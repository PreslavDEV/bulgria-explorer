import { ScrollView, StyleSheet } from "react-native";

import {
  IProfileDetailsProps,
  ProfileDetails,
} from "./profile-details/profile-details";
import { IProfilePostsProps } from "./profile-posts/interface";
import { ProfilePosts } from "./profile-posts/profile-posts";

interface IProfileProps extends IProfileDetailsProps, IProfilePostsProps {}

export const Profile = (props: IProfileProps) => {
  const { posts, ...profileDetailsProps } = props;

  return (
    <ScrollView style={styles.container}>
      <ProfileDetails {...profileDetailsProps} />
      <ProfilePosts posts={posts} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});
