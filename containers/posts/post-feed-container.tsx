import { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { PostCard } from "@/components/post-card/post-card";
import { View } from "@/components/themed";
import { TYPES } from "@/configs/di-types.config";
import { PostFeedStore } from "@/stores/post/post-feed.store";

export const PostFeedContainer = observer(() => {
  const { posts, votePost } = useInjection<PostFeedStore>(TYPES.PostFeedStore);

  const handleVote = useCallback(
    (postId: string) => {
      votePost(postId);
    },
    [votePost],
  );

  return (
    <ScrollView>
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
          <PostCard {...post} onVote={handleVote} />
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
