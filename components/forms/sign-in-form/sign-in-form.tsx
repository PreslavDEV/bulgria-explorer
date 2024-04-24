import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { View } from "@/components/themed";
import InputField from "@/components/ui/input/input";
import PasswordInput from "@/components/ui/input/password-input";

import { ISignInData } from "./interface";
import { signInSchema } from "./validation";

interface ISignInFormProps {
  onSubmit: (data: ISignInData) => void;
}

export default function SignInForm(props: ISignInFormProps) {
  const { control, handleSubmit, formState } = useForm<ISignInData>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
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
            label="Email"
            error={errors.email?.message}
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
            label="Password"
            secureTextEntry
            error={errors.password?.message}
            onChangeText={handleChange}
          />
        )}
      />

      <Button title="Submit" onPress={handleSubmit(props.onSubmit)} />
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
