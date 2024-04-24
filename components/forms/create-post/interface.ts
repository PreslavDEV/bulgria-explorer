export interface IImageData {
  id: string;
  uri: string;
}

export interface ICreatePostData {
  city: string;
  description?: string;
  images: IImageData[];
}
