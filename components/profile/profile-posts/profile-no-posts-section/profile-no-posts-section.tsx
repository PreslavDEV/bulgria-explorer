import { useCallback, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import { DictContext } from "@/providers/dictionary/dictionary.provider";

export const ProfileNoPostsSection = () => {
  const { noPosts, noPostsButton } = useContext(DictContext).profile.posts;

  const handleCreatePost = useCallback(() => {
    router.push("/(tabs)/create-post/");
  }, []);

  return (
    <View style={styles.noPosts}>
      <MonoText>{noPosts}</MonoText>
      <TouchableOpacity style={styles.createPost} onPress={handleCreatePost}>
        <MonoText style={styles.createPostText} bold>
          {noPostsButton}
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
