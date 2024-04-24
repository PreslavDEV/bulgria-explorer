import { z, ZodType } from "zod";

import { ICreatePostData } from "./interface";

export const createPostSchema: ZodType<ICreatePostData> = z.object({
  city: z
    .string({
      required_error:
        "Please enter the city from where this post is being created",
    })
    .min(1, {
      message: "Please enter the city from where this post is being created",
    }),
  description: z
    .string()
    .max(255, { message: "Maximum description length is 255 characters" })
    .optional(),
  images: z
    .array(
      z.object({
        uri: z.string().url(),
        id: z.string(),
      }),
    )
    .min(1, { message: "At least one photo is required to create a post" }),
});
