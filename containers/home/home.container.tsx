import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { PostCard } from "@/components/post-card/post-card";
import { Text, View } from "@/components/themed";
import FloatingButton from "@/components/ui/floating-button/floating-button";
import { TYPES } from "@/configs/di-types.config";
import { AuthStore } from "@/stores/auth/auth.store";
import { PostFeedStore } from "@/stores/post/post-feed.store";

export const HomeContainer = observer(() => {
  const { user } = useInjection<AuthStore>(TYPES.AuthStore);
  const { posts } = useInjection<PostFeedStore>(TYPES.PostFeedStore);

  // TODO remove when voting is ready
  const [dummyVote, setDummyVote] = useState(false);

  const handleClick = useCallback(() => {
    const route = user ? "/create-post/" : "/(tabs)/(auth)/sign-in";

    router.push(route);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FloatingButton onPress={handleClick} />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
          hasVoted={dummyVote}
          onVote={() => setDummyVote((prev) => !prev)}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
