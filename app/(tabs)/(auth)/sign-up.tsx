import { useCallback } from "react";

import { ISignUpData } from "@/components/forms/sign-up-form/interface";
import SignUpForm from "@/components/forms/sign-up-form/sign-up-form";

export default function SignUpScreen() {
  const handleSignUp = useCallback((data: ISignUpData) => {
    console.log(data);
  }, []);

  return <SignUpForm onSubmit={handleSignUp} />;
}
