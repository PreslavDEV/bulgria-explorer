import { useCallback, useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { PostCard } from "@/components/post-card/post-card";
import { View } from "@/components/themed";
import { TYPES } from "@/configs/di-types.config";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PostFeedStore } from "@/stores/post/post-feed.store";

export const PostFeedContainer = observer(() => {
  const { posts, votePost, userId, loadingPosts } = useInjection<PostFeedStore>(
    TYPES.PostFeedStore,
  );

  const colorScheme = useColorScheme();

  const backgroundColor = useMemo(
    () => Colors[colorScheme ?? "light"].background,
    [colorScheme],
  );

  const handleVote = useCallback(
    (postId: string) => {
      votePost(postId);
    },
    [votePost],
  );

  if (!posts.length && loadingPosts) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size={62} color="#2f95dc" />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor }}>
      {posts.map((post, i) => (
        <View
          key={post.id}
          style={[
            styles.cardContainer,
            i === 0 && {
              marginTop: 32,
            },
            i !== posts.length - 1 && styles.withShadow,
          ]}
        >
          <PostCard {...post} isAuth={!!userId} onVote={handleVote} />
          {i !== posts.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 32,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  withShadow: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  separator: {
    marginTop: 32,
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
});
