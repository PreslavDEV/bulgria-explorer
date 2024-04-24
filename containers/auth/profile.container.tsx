import { useCallback, useContext, useEffect, useMemo } from "react";
import { router } from "expo-router";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { Profile } from "@/components/profile/profile";
import { TYPES } from "@/configs/di-types.config";
import { useHandleError } from "@/hooks/use-handle-error";
import { DictContext } from "@/providers/dictionary/dictionary.provider";
import { AuthStore } from "@/stores/auth/auth.store";
import { LayoutStore } from "@/stores/layout/layout.store";
import { LABEL_USER_COLORS } from "@/utils/get-random-color.util";

export const ProfileContainer = observer(() => {
  const { user, signOut, updateUserColor, myPosts } = useInjection<AuthStore>(
    TYPES.AuthStore,
  );
  const { sheetRef, setColorOptions } = useInjection<LayoutStore>(
    TYPES.LayoutStore,
  );
  const { colors } = useContext(DictContext);

  const setError = useHandleError();

  const handleColorClick = useCallback(
    (color: string) => async () => {
      try {
        await updateUserColor(color);
        sheetRef?.close();
      } catch (error) {
        setError(error);
      }
    },
    [setError, sheetRef, updateUserColor],
  );

  const colorOptions = useMemo(
    () =>
      LABEL_USER_COLORS.map(({ label, value }) => ({
        color: value,
        label: colors[label],
        onPress: handleColorClick(value),
      })),
    [colors, handleColorClick],
  );

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      router.replace("/(tabs)/");
    } catch (error) {
      setError(error);
    }
  }, [setError, signOut]);

  useEffect(() => {
    setColorOptions(colorOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Profile
      {...user}
      posts={myPosts}
      sheetRef={sheetRef}
      onSignOut={handleSignOut}
    />
  );
});
