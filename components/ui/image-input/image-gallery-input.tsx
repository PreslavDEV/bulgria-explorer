import { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Icon from "../icon/icon";

// TODO props and result handling

interface IImageGalleryInputProps {}

export default function ImageGalleryInput(props: IImageGalleryInputProps) {
  const handleUpload = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleUpload}>
      <Icon name="image" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2f95dc",
    height: 60,
    width: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
