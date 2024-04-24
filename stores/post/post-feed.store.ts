import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { db } from "@/configs/firebase.config";
import { getFormattedPostDate } from "@/utils/get-formatted-post-date.util";

import { IUser } from "../auth/interface";

import { IPost } from "./interface";
import { PostStore } from "./post.store";

@injectable()
export class PostFeedStore extends PostStore {
  public posts: IPost[];

  public userId: string;

  constructor() {
    super();

    this.posts = [];

    this.userId = "";

    makeObservable(this, {
      posts: observable,
      userId: observable,

      setPosts: action.bound,
      setUserId: action.bound,
    });

    onSnapshot(this.postsCollection, (snapshot) => {
      this.preparePosts(snapshot);
    });

    onSnapshot(collection(db, "users"), (snapshot) => {
      this.updateAuthors(snapshot);
    });
  }

  private preparePosts = (snapshot: QuerySnapshot) => {
    const posts: IPost[] = [];

    snapshot.forEach((document) => {
      const hasVoted = !!document
        .data()
        .votes.find((vote: string) => vote === this.userId);

      const dateCreated = getFormattedPostDate(document.data().dateCreated);
      posts.push({
        id: document.id,
        ...document.data(),
        hasVoted,
        dateCreated,
        votesCount: document.data().votes.length,
      } as IPost);
    });

    this.setPosts(posts);
  };

  private updateAuthors = (snapshot: QuerySnapshot) => {
    snapshot.forEach((snap) => {
      const user = snap.data() as IUser;
      const updatedPosts = this.posts.map((post) => {
        if (post.author.id === user.id) {
          return {
            ...post,
            author: user,
          };
        }

        return post;
      });

      this.setPosts(updatedPosts);
    });
  };

  public votePost = async (postId: string) => {
    const postDoc = doc(db, this.path, postId);
    const post = this.posts.find(({ hasVoted }) => hasVoted);

    if (post) {
      setDoc(postDoc, { votes: arrayRemove(this.userId) }, { merge: true });
    } else {
      setDoc(postDoc, { votes: arrayUnion(this.userId) }, { merge: true });
    }
  };

  public setPosts(posts: IPost[]) {
    this.posts = posts;
  }

  public setUserId(val: string) {
    this.userId = val;
  }
}
