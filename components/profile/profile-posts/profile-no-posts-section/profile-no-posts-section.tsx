import { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";

export const ProfileNoPostsSection = () => {
  const handleCreatePost = useCallback(() => {
    router.push("/(tabs)/create-post/");
  }, []);

  return (
    <View style={styles.noPosts}>
      <MonoText>Hmm, seems like you haven&apos;t posted yet</MonoText>
      <TouchableOpacity style={styles.createPost} onPress={handleCreatePost}>
        <MonoText style={styles.createPostText} bold>
          Create your first post
        </MonoText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noPosts: {
    gap: 8,
    height: "100%",
    flexGrow: 1,
    justifyContent: "center",
  },
  createPost: {
    backgroundColor: "#2f95dc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createPostText: {
    textTransform: "uppercase",
  },
});
