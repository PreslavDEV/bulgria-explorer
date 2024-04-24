import { IImageData } from "@/components/forms/create-post/interface";

export interface IPost {
  id: string;
  city: string;
  description: Maybe<string>;
  images: IImageData[];
}
