import { z, ZodType } from "zod";

import { emailRegex, passwordRegex } from "@/constants/validation.constants";

import { ISignInData } from "./interface";

export const signInSchema: ZodType<ISignInData> = z
  .object({
    email: z
      .string()
      .regex(emailRegex, { message: "Please enter a valid email address" }),
    password: z.string().regex(passwordRegex, {
      message:
        "Minimum eight characters, at least one letter and one number, at least on special character",
    }),
  })
  .required();
