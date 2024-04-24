import { z, ZodType } from "zod";

import { Dictionary } from "@/configs/i18n.config";

import { ICreatePostData } from "./interface";

export const createPostSchema = ({
  city,
  description,
  images,
}: Dictionary["createPost"]["errors"]): ZodType<ICreatePostData> =>
  z.object({
    city: z
      .string({
        required_error: city,
      })
      .min(1, {
        message: city,
      }),
    description: z.string().max(255, { message: description }).optional(),
    images: z
      .array(
        z.object({
          uri: z.string().url(),
          id: z.string(),
        }),
      )
      .min(1, { message: images }),
  });
