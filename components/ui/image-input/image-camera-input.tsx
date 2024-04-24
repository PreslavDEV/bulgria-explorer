import { useCallback, useContext } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useHandleError } from "@/hooks/use-handle-error";
import { DictContext } from "@/providers/dictionary/dictionary.provider";
import { dynamicTranslate } from "@/utils/dynamic-translate.util";

import Icon from "../icon/icon";

import { IImageInputProps } from "./interface";
import { imageInputStyles } from "./styles";

export default function ImageCameraInput(props: IImageInputProps) {
  const { onAddImage } = props;
  const { permissionDenied, permissionName } =
    useContext(DictContext).createPost;

  const setError = useHandleError();

  const handleUpload = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      setError(
        dynamicTranslate(permissionDenied, {
          name: permissionName.camera,
        }),
      );
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    onAddImage(result);
  }, [onAddImage, permissionDenied, permissionName.camera, setError]);

  return (
    <TouchableOpacity style={imageInputStyles.container} onPress={handleUpload}>
      <Icon name="camera" />
    </TouchableOpacity>
  );
}
