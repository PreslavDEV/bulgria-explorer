import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export const useHandleError = () => {
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (error) {
      const message =
        typeof error === "object" && "message" in error
          ? (error.message as string)
          : JSON.stringify(error);

      Toast.show({
        type: "error",
        text1: message,
        autoHide: true,
      });
    }
  }, [error]);

  return setError;
};
