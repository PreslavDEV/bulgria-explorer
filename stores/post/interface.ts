import { IImageData } from "@/components/forms/create-post/interface";

import { IUser } from "../auth/interface";

export interface IPost {
  id: string;
  city: string;
  description: Maybe<string>;
  images: IImageData[];
  dateCreated: string;
  author: IUser;
  votes: string[];
  hasVoted: boolean;
  votesCount: number;
}
