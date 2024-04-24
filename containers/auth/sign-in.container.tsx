import { useCallback } from "react";
import { router } from "expo-router";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { ISignInData } from "@/components/forms/sign-in-form/interface";
import SignInForm from "@/components/forms/sign-in-form/sign-in-form";
import { TYPES } from "@/configs/di-types.config";
import { useHandleError } from "@/hooks/use-handle-error";
import { AuthStore } from "@/stores/auth/auth.store";

export const SignInContainer = observer(() => {
  const { signIn } = useInjection<AuthStore>(TYPES.AuthStore);

  const setError = useHandleError();

  const handleSignUp = useCallback(
    async (data: ISignInData) => {
      try {
        await signIn(data);
        router.replace("/(tabs)/");
      } catch (error) {
        setError(error);
      }
    },
    [setError, signIn],
  );

  return <SignInForm onSubmit={handleSignUp} />;
});
