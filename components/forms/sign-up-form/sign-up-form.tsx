import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { View } from "@/components/themed";
import InputField from "@/components/ui/input/input";
import PasswordInput from "@/components/ui/input/password-input";

import { ISignUpData } from "./interface";
import { signUpSchema } from "./validation";

interface ISignUpFormProps {
  onSubmit: (data: ISignUpData) => void;
}

export default function SignUpForm(props: ISignUpFormProps) {
  const { control, handleSubmit, formState } = useForm<ISignUpData>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
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

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { ref, onChange: handleChange, ...rest } }) => (
          <PasswordInput
            {...rest}
            textContentType="password"
            label="Password"
            secureTextEntry
            error={errors.confirmPassword?.message}
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
  inputContainer: { gap: 8 },
  actionElement: {
    minHeight: 48,
  },
});
