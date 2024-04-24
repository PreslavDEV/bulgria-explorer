import { useCallback } from "react";
import { router } from "expo-router";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { ISignUpData } from "@/components/forms/sign-up-form/interface";
import SignUpForm from "@/components/forms/sign-up-form/sign-up-form";
import { TYPES } from "@/configs/di-types.config";
import { AuthStore } from "@/stores/auth/auth.store";

export const SignUpContainer = observer(() => {
  const { signUp } = useInjection<AuthStore>(TYPES.AuthStore);

  const handleSignUp = useCallback(
    async (data: ISignUpData) => {
      await signUp(data);
      router.replace("/(tabs)/(user)");
    },
    [signUp],
  );

  return <SignUpForm onSubmit={handleSignUp} />;
});
