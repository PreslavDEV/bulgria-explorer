import { useCallback } from "react";
import { router } from "expo-router";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import { ISignInData } from "@/components/forms/sigin-in-form/interface";
import SignInForm from "@/components/forms/sigin-in-form/sign-in-form";
import { TYPES } from "@/configs/di-types.config";
import { AuthStore } from "@/stores/auth/auth.store";

export const SignInContainer = observer(() => {
  const { signIn } = useInjection<AuthStore>(TYPES.AuthStore);

  const handleSignUp = useCallback(
    async (data: ISignInData) => {
      await signIn(data);
      router.replace("/(tabs)/");
    },
    [signIn],
  );

  return <SignInForm onSubmit={handleSignUp} />;
});
