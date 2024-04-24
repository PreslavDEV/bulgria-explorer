import { formatDistanceStrict, getTime } from "date-fns";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { db } from "@/configs/firebase.config";

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
  }

  private preparePosts = (snapshot: QuerySnapshot) => {
    const posts: IPost[] = [];
    snapshot.forEach((document) => {
      const dateTimestamp = getTime(new Date(document.data().dateCreated));
      const hasVoted = !!document
        .data()
        .votes.find((vote: string) => vote === this.userId);

      const dateCreated = `${formatDistanceStrict(dateTimestamp, Date.now())} ago`;
      posts.push({
        id: document.id,
        ...document.data(),
        hasVoted,
        dateCreated,
      } as IPost);
    });
    this.setPosts(posts);
  };

  public getPosts = async () => {
    const snapshot = await getDocs(this.postsCollection);
    this.preparePosts(snapshot);
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
