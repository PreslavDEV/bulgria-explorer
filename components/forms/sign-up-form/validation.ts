import { z, ZodType } from "zod";

import { emailRegex, passwordRegex } from "@/constants/validation.constants";

import { ISignUpData } from "./interface";

export const signUpSchema: ZodType<ISignUpData> = z
  .object({
    email: z
      .string()
      .regex(emailRegex, { message: "Please enter a valid email address" }),
    password: z.string().regex(passwordRegex, {
      message:
        "Minimum eight characters, at least one letter and one number, at least on special character",
    }),
    confirmPassword: z.string().regex(passwordRegex, {
      message:
        "Minimum eight characters, at least one letter and one number, at least on special character",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords didn't match",
      });
    }
  });
