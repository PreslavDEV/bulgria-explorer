import { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Icon from "../icon/icon";

import { IImageInputProps } from "./interface";
import { imageInputStyles } from "./styles";

export default function ImageCameraInput(props: IImageInputProps) {
  const { onAddImage } = props;

  const handleUpload = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    onAddImage(result);
  }, [onAddImage]);

  return (
    <TouchableOpacity style={imageInputStyles.container} onPress={handleUpload}>
      <Icon name="camera" />
    </TouchableOpacity>
  );
}
