import { useMemo } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { View } from "@/components/themed";
import { IPost } from "@/stores/post/interface";

import { MonoText } from "../styled-text";
import Avatar from "../ui/avatar/avatar";
import Icon from "../ui/icon/icon";

const windowWidth = Dimensions.get("window").width;

interface IPostCardProps extends IPost {
  votesCount: number;
  hasVoted: boolean;
  onVote: () => void;
}

export const PostCard = (props: IPostCardProps) => {
  const {
    city,
    description,
    images,
    author,
    hasVoted,
    votesCount,
    onVote: handleVote,
  } = props;

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(handleVote);

  const heartProps = useMemo(() => {
    if (hasVoted) {
      return { name: "heart", color: "#DC143C" } as const;
    }

    return { name: "heart-o", color: undefined } as const;
  }, [hasVoted]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar username={author.username} />
        <MonoText style={styles.mediumText} bold>
          {author.username}
        </MonoText>
      </View>
      <GestureHandlerRootView>
        <GestureDetector gesture={doubleTap}>
          <ScrollView horizontal style={styles.scrollableImages}>
            {images.map(({ uri, id }) => (
              <Image
                key={id}
                source={{ uri }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={styles.votingContainer}>
        <TouchableOpacity onPress={handleVote}>
          <Icon {...heartProps} />
        </TouchableOpacity>
        {!!votesCount && (
          <MonoText style={styles.bigText} bold>
            {votesCount}
          </MonoText>
        )}
      </View>

      <View>
        <MonoText style={styles.city} bold>
          {city}
        </MonoText>
        {description && (
          <MonoText darkColor="#ccc" lightColor="#333" style={styles.smallText}>
            {description}
          </MonoText>
        )}
        <MonoText darkColor="#777" lightColor="#777" style={styles.smallText}>
          {/* TODO add date to post */}
          {new Date().toTimeString()}
        </MonoText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  scrollableImages: { alignSelf: "center", marginHorizontal: -16 },
  image: { width: windowWidth, aspectRatio: 1 },
  votingContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  city: {
    fontSize: 16,
  },
  bigText: {
    fontSize: 20,
  },
  mediumText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 12,
  },
});
