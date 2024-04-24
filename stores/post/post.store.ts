import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { injectable } from "inversify";
import { makeObservable } from "mobx";

import { db } from "@/configs/firebase.config";

@injectable()
export class PostStore {
  private postsCollection: CollectionReference<DocumentData>;

  constructor() {
    this.postsCollection = collection(db, "posts");

    makeObservable(this, {});
  }

  public test = async () => {
    try {
      const docRef = await addDoc(this.postsCollection, {});
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
}
