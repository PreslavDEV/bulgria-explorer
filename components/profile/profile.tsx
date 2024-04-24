import { useCallback } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { router } from "expo-router";

import { View } from "@/components/themed";
import { IUser } from "@/stores/auth/interface";
import { IPost } from "@/stores/post/interface";

import { MonoText } from "../styled-text";
import Avatar from "../ui/avatar/avatar";

interface IProfileProps extends IUser {
  sheetRef: Maybe<BottomSheetMethods>;
  posts: IPost[];
  points: number;
  ranking: number;
  onSignOut: () => void;
}

export const Profile = (props: IProfileProps) => {
  const { username, color, points, ranking, posts, sheetRef } = props;

  const handleOpenSheet = useCallback(() => {
    sheetRef?.open();
  }, [sheetRef]);

  const handleCreatePost = useCallback(() => {
    router.push("/(tabs)/create-post/");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainSections}>
        <View>
          <Avatar username={username} color={color} size={100} />
          <MonoText style={styles.username} bold>
            {username}
          </MonoText>
        </View>
        <View style={styles.details}>
          <View style={styles.row}>
            <MonoText style={styles.smallText}>You have gained:</MonoText>
            <MonoText style={styles.mediumText} bold>
              {points} points
            </MonoText>
          </View>
          <View style={styles.row}>
            <MonoText style={styles.smallText}>You are ranked:</MonoText>
            <MonoText style={styles.mediumText} bold>
              #{ranking}
            </MonoText>
          </View>

          <TouchableOpacity
            style={styles.changeColor}
            onPress={handleOpenSheet}
          >
            <MonoText bold>Change your color</MonoText>
          </TouchableOpacity>

          <Button title="Sign Out" onPress={props.onSignOut} color="#E57373" />
        </View>
      </View>
      <View style={styles.posts}>
        {!!posts.length && (
          <>
            <MonoText style={styles.mediumText} bold>
              Your Posts
            </MonoText>
            <View style={styles.myPosts}>
              {posts.map((post) => (
                // TODO view for posts
                <View key={post.id} />
              ))}
            </View>
          </>
        )}

        {!posts.length && (
          <View style={styles.noPosts}>
            <MonoText>Hmm, seems like you haven&apos;t posted yet</MonoText>
            <TouchableOpacity
              style={styles.createPost}
              onPress={handleCreatePost}
            >
              <MonoText style={styles.createPostText} bold>
                Create your first post
              </MonoText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
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
  mainSections: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  posts: {
    flex: 1,
  },
  myPosts: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  noPosts: {
    gap: 8,
    height: "100%",
    flexGrow: 1,
    justifyContent: "center",
  },
  details: {
    gap: 8,
  },
  changeColor: {
    backgroundColor: "#222",
    padding: 8,
    borderRadius: 2,
    alignItems: "center",
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
