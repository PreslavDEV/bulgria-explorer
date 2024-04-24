import { StyleSheet } from "react-native";

import { View } from "@/components/themed";

import { ProfileNoPostsSection } from "./profile-no-posts-section/profile-no-posts-section";
import { ProfilePostsSection } from "./profile-posts-section/profile-posts-section";
import { IProfilePostsProps } from "./interface";

export const ProfilePosts = (props: IProfilePostsProps) => {
  const { posts } = props;

  return (
    <View style={styles.posts}>
      {posts.length ? (
        <ProfilePostsSection posts={posts} />
      ) : (
        <ProfileNoPostsSection />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  posts: {
    marginTop: 24,
    flex: 1,
    gap: 8,
  },
});
