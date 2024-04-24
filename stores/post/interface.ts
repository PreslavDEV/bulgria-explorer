import { IImageData } from "@/components/forms/create-post/interface";

import { IUser } from "../auth/interface";

export interface IPost {
  id: string;
  city: string;
  description: Maybe<string>;
  images: IImageData[];
  author: IUser;
}
