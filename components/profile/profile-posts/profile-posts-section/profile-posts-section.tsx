import { useContext, useMemo } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import Icon from "@/components/ui/icon/icon";
import { DictContext } from "@/providers/dictionary/dictionary.provider";

import { IProfilePostsProps } from "../interface";

const windowWidth = Dimensions.get("window").width;

export const ProfilePostsSection = (props: IProfilePostsProps) => {
  const { posts } = props;

  const { yourPosts } = useContext(DictContext).profile.posts;

  const imageWidth = useMemo(() => {
    const postsPerRow = posts.length >= 3 ? 3 : posts.length;
    const margins = 32;
    const gaps = postsPerRow - 1;

    const availableSpace = windowWidth - margins;

    if (posts.length === 1) {
      return availableSpace;
    }

    if (posts.length === 2) {
      return availableSpace / postsPerRow - gaps * 8 + 4;
    }

    return windowWidth / postsPerRow - gaps * 8;
  }, [posts.length]);

  return (
    <>
      <MonoText style={styles.mediumText} bold>
        {yourPosts}
      </MonoText>
      <View style={styles.myPosts}>
        {posts.map(({ id, images, votesCount }) => (
          <View key={id} style={styles.singlePost}>
            <Image
              key={images[0].id}
              source={{ uri: images[0].uri }}
              style={styles.image}
              width={imageWidth}
              resizeMode="cover"
            />

            <View style={styles.votingContainer}>
              <Icon name="heart" color="#E57373" />
              <MonoText style={styles.bigText} bold lightColor="#fff">
                {votesCount}
              </MonoText>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 20,
  },
  mediumText: {
    fontSize: 16,
  },
  singlePost: {
    position: "relative",
  },
  image: { aspectRatio: 1 },
  votingContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 4,
    borderRadius: 4,
  },
  myPosts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
