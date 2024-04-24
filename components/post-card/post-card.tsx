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

import { Text, View } from "@/components/themed";
import { IPost } from "@/stores/post/interface";

import Icon from "../ui/icon/icon";

const windowWidth = Dimensions.get("window").width;

interface IPostCardProps extends IPost {
  hasVoted: boolean;
  onVote: () => void;
}

export const PostCard = (props: IPostCardProps) => {
  const { city, description, images, hasVoted, onVote: handleVote } = props;

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
      <Text style={styles.title}>{city}</Text>
      {description && <Text>{description}</Text>}

      <GestureHandlerRootView>
        <GestureDetector gesture={doubleTap}>
          <ScrollView
            horizontal
            style={{ alignSelf: "center", marginHorizontal: -16 }}
          >
            {images.map(({ uri, id }) => (
              <View key={id}>
                <Image
                  source={{ uri }}
                  style={{ width: windowWidth, aspectRatio: 1 }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={{ alignSelf: "flex-start" }}>
        <TouchableOpacity onPress={handleVote}>
          <Icon {...heartProps} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
