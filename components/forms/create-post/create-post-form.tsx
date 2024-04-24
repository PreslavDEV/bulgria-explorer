import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePickerResult } from "expo-image-picker";
import * as Location from "expo-location";

import { Text, View } from "@/components/themed";
import Icon from "@/components/ui/icon/icon";
import ImageCameraInput from "@/components/ui/image-input/image-camera-input";
import ImageGalleryInput from "@/components/ui/image-input/image-gallery-input";
import InputField from "@/components/ui/input/input";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useHandleError } from "@/hooks/use-handle-error";

import { ICreatePostData } from "./interface";
import { createPostSchema } from "./validation";

interface ICreatePostFormProps {
  uploadingImages: boolean;
  creatingPost: boolean;
  onSubmit: (data: ICreatePostData) => void;
}

export default function CreatePostForm(props: ICreatePostFormProps) {
  const { uploadingImages, creatingPost } = props;

  const colorScheme = useColorScheme();

  const setError = useHandleError();

  const { control, handleSubmit, formState, watch, setValue } =
    useForm<ICreatePostData>({
      mode: "onBlur",
      resolver: zodResolver(createPostSchema),
      defaultValues: {
        images: [],
      },
    });
  const { errors } = formState;

  const images = watch("images");

  const handleUserCity = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const gecodedAddresses = await Location.reverseGeocodeAsync(coords);
    const { city } = gecodedAddresses[0];

    setValue("city", city || "");
  }, [setError, setValue]);

  useEffect(() => {
    handleUserCity();
  }, [handleUserCity]);

  const handleAddImage = useCallback(
    (result: ImagePickerResult) => {
      if (result.canceled) return;

      const idAssets = result.assets?.map(({ uri }) => ({
        id: uri.split("ImagePicker/")[1],
        uri,
      }));

      setValue("images", [...images, ...idAssets]);
    },
    [images, setValue],
  );

  const handleRemoveImage = useCallback(
    (id: string) => () => {
      if (id) {
        const filteredImages = images.filter((el) => el.id !== id);
        setValue("images", filteredImages);
      }
    },
    [images, setValue],
  );

  const loadingText = useMemo(() => {
    if (uploadingImages) {
      return "Uploading...";
    }

    if (creatingPost) {
      return "Creating your post...";
    }

    return null;
  }, [creatingPost, uploadingImages]);

  return (
    <View style={styles.container}>
      <Controller
        name="city"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <InputField
            {...rest}
            textContentType="addressCity"
            label="City"
            error={errors.city?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <InputField
            {...rest}
            label="Description"
            multiline
            error={errors.description?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <ScrollView
        horizontal
        style={{ marginHorizontal: -24, alignSelf: "center" }}
      >
        {images.map(({ uri, id }, i) => (
          <View
            key={id}
            style={{
              ...styles.imageContainer,
              marginRight: i !== images.length - 1 ? 8 : 0,
            }}
          >
            <Image
              source={{ uri }}
              style={{ height: "100%", aspectRatio: 1 }}
              height={150}
              width={150}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.imageRemove}
              onPress={handleRemoveImage(id)}
            >
              <Icon name="close" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {errors.images && (
        <Text style={{ color: Colors[colorScheme ?? "light"].inputError }}>
          {errors.images?.message}
        </Text>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ImageCameraInput onAddImage={handleAddImage} />
        <ImageGalleryInput onAddImage={handleAddImage} />
      </View>

      <Button title="Submit" onPress={handleSubmit(props.onSubmit)} />

      {loadingText && (
        <View style={styles.loadingContainer}>
          <Text>{loadingText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 32,
  },
  imageRemove: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#D32F2F",
    height: 32,
    width: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});
