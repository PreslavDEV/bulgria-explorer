import { useCallback, useMemo, useRef } from "react";
import {
  Animated,
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
  onVote: (postId: string) => void;
}

export const PostCard = (props: IPostCardProps) => {
  const {
    id,
    city,
    description,
    images,
    author,
    dateCreated,
    hasVoted,
    votesCount,
    onVote,
  } = props;

  const heartProps = useMemo(() => {
    if (hasVoted) {
      return { name: "heart", color: "#DC143C" } as const;
    }

    return { name: "heart-o", color: undefined } as const;
  }, [hasVoted]);

  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const animateElement = useCallback(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        delay: 400,
      }).start();
    });
  }, [opacityAnimation]);

  const handleVote = useCallback(() => {
    onVote(id);
    if (!hasVoted) {
      animateElement();
    }
  }, [animateElement, hasVoted, id, onVote]);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(handleVote);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar username={author.username} color={author.color} />
        <MonoText style={styles.mediumText} bold>
          {author.username}
        </MonoText>
      </View>
      <GestureHandlerRootView>
        <GestureDetector gesture={doubleTap}>
          <View style={styles.voteImageWrapper}>
            <Animated.View
              style={[
                styles.voteAnimationContainer,
                {
                  opacity: opacityAnimation,
                },
              ]}
            >
              <Icon
                name="heart"
                style={styles.voteAnimationHeart}
                color="#DC143C"
              />
            </Animated.View>
            <ScrollView horizontal style={styles.scrollableImages}>
              {images.map(({ uri, id: imageId }) => (
                <Image
                  key={imageId}
                  source={{ uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
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
          {dateCreated}
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
  voteAnimationHeart: {
    fontSize: 100,
  },
  voteAnimationContainer: {
    position: "absolute",
    zIndex: 999,
  },
  voteImageWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});
