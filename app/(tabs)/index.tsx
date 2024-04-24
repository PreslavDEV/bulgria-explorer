import { StyleSheet } from "react-native";

import { Text, View } from "@/components/themed";
import FloatingButton from "@/components/ui/floating-button/floating-button";
import ImageCameraInput from "@/components/ui/image-input/image-camera-input";
import ImageGalleryInput from "@/components/ui/image-input/image-gallery-input";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FloatingButton
        onPress={() => {
          console.log("iagodi");
        }}
      />
      <ImageCameraInput />
      <ImageGalleryInput />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
