import { ImagePickerResult } from "expo-image-picker";

export interface IImageInputProps {
  onAddImage: (result: ImagePickerResult) => void;
}
