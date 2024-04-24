import {
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { injectable } from "inversify";

import { db } from "@/configs/firebase.config";

@injectable()
export class PostStore {
  protected postsCollection: CollectionReference<DocumentData>;

  private path: string;

  constructor() {
    this.path = "posts";

    this.postsCollection = collection(db, this.path);
  }
}
