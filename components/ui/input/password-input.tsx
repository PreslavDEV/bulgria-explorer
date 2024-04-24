import { useMemo, useState } from "react";

import InputField, { IInputProps } from "@/components/ui/input/input";

export default function PasswordInput(props: IInputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const rightIconProps = useMemo<IInputProps["rightIconProps"]>(
    () => ({
      name: secureTextEntry ? "eye" : "eye-slash",
      onPress: () => {
        setSecureTextEntry((prev) => !prev);
      },
    }),
    [secureTextEntry],
  );

  return (
    <InputField
      {...props}
      secureTextEntry={secureTextEntry}
      rightIconProps={rightIconProps}
    />
  );
}
