import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import {
  ICreatePostData,
  IImageData,
} from "@/components/forms/create-post/interface";
import { storage } from "@/configs/firebase.config";

import { IUser } from "../auth/interface";

import { PostStore } from "./post.store";

@injectable()
export class CreatePostStore extends PostStore {
  public uploadingImages: boolean;

  public creatingPost: boolean;

  constructor() {
    super();

    this.uploadingImages = false;

    this.creatingPost = false;

    makeObservable(this, {
      uploadingImages: observable,
      creatingPost: observable,

      setUploadingImages: action.bound,
      setCreatingPost: action.bound,
    });
  }

  private uploadPostImages = async (images: ICreatePostData["images"]) => {
    this.setUploadingImages(true);

    const imagesPromises = images.map(async (image) => {
      const uri = await this.uploadImage(image);

      return {
        ...image,
        uri,
      };
    });

    const newImages: IImageData[] = await Promise.all(imagesPromises);

    this.setUploadingImages(false);

    return newImages;
  };

  private uploadImage = async ({ uri, id }: IImageData) => {
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, id);
    await uploadBytes(fileRef, blob);

    (blob as any).close();

    const downloadUrl = await getDownloadURL(fileRef);

    return downloadUrl;
  };

  public setUploadingImages(val: boolean) {
    this.uploadingImages = val;
  }

  public setCreatingPost(val: boolean) {
    this.creatingPost = val;
  }

  public createPost = async (data: ICreatePostData, author: Maybe<IUser>) => {
    const images = await this.uploadPostImages(data.images);

    this.setCreatingPost(true);

    await addDoc(this.postsCollection, {
      city: data.city,
      description: data.description || null,
      images,
      author,
      dateCreated: new Date().toISOString(),
    });

    this.setCreatingPost(false);
  };
}
