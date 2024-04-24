import { z, ZodType } from "zod";

import { Dictionary } from "@/configs/i18n.config";
import { emailRegex, passwordRegex } from "@/constants/validation.constants";

import { ISignUpData } from "./interface";

type SignUpErrorsDict = Dictionary["auth"]["errors"] &
  Dictionary["signUp"]["errors"];

export const signUpSchema = ({
  email,
  password: passwordErr,
  confirmPassword: confirmPasswordErr,
  username,
}: SignUpErrorsDict): ZodType<ISignUpData> =>
  z
    .object({
      email: z.string().regex(emailRegex, { message: email }),
      username: z.string().min(3, { message: username.client }),
      password: z.string().regex(passwordRegex, {
        message: passwordErr,
      }),
      confirmPassword: z.string().regex(passwordRegex, {
        message: passwordErr,
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: "custom",
          message: confirmPasswordErr,
        });
      }
    });
