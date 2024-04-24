import { z, ZodType } from "zod";

import { Dictionary } from "@/configs/i18n.config";
import { emailRegex, passwordRegex } from "@/constants/validation.constants";

import { ISignInData } from "./interface";

export const signInSchema = ({
  email,
  password,
}: Dictionary["auth"]["errors"]): ZodType<ISignInData> =>
  z
    .object({
      email: z.string().regex(emailRegex, { message: email }),
      password: z.string().regex(passwordRegex, {
        message: password,
      }),
    })
    .required();
