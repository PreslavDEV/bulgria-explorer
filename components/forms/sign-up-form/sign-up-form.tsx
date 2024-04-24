import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { View } from "@/components/themed";
import InputField from "@/components/ui/input/input";
import PasswordInput from "@/components/ui/input/password-input";
import { DictContext } from "@/providers/dictionary/dictionary.provider";

import { ISignUpData } from "./interface";
import { signUpSchema } from "./validation";

interface ISignUpFormProps {
  onSubmit: (data: ISignUpData) => void;
}

export default function SignUpForm(props: ISignUpFormProps) {
  const { auth, global, signUp } = useContext(DictContext);

  const { emailLabel, errors: authErrorsDict, passwordLabel } = auth;
  const {
    confirmPasswordLabel,
    usernameLabel,
    errors: signUpErrorsDict,
  } = signUp;

  const { control, handleSubmit, formState } = useForm<ISignUpData>({
    mode: "onBlur",
    resolver: zodResolver(
      signUpSchema({ ...authErrorsDict, ...signUpErrorsDict }),
    ),
  });
  const { errors } = formState;

  return (
    <View style={styles.container}>
      <Controller
        name="email"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <InputField
            {...rest}
            textContentType="emailAddress"
            label={emailLabel}
            error={errors.email?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <Controller
        name="username"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <InputField
            {...rest}
            textContentType="username"
            label={usernameLabel}
            error={errors.username?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <PasswordInput
            {...rest}
            textContentType="password"
            label={passwordLabel}
            secureTextEntry
            error={errors.password?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <PasswordInput
            {...rest}
            textContentType="password"
            label={confirmPasswordLabel}
            secureTextEntry
            error={errors.confirmPassword?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <Button title={global.submit} onPress={handleSubmit(props.onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 32,
  },
});
