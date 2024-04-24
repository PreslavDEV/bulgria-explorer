import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable, reaction } from "mobx";

import { db } from "@/configs/firebase.config";
import { getFormattedPostDate } from "@/utils/get-formatted-post-date.util";

import { IUser } from "../auth/interface";

import { IPost } from "./interface";
import { PostStore } from "./post.store";

@injectable()
export class PostFeedStore extends PostStore {
  public posts: IPost[];

  public userId: Maybe<string>;

  private POINTS_PER_VOTE = 1;

  constructor() {
    super();

    this.posts = [];

    this.userId = null;

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

    reaction(
      () => this.userId,
      () => {
        this.setPosts(
          this.posts.map((post) => ({
            ...post,
            hasVoted: this.getHasVoted(post),
          })),
        );
      },
    );
  }

  private getHasVoted = (post: IPost) => {
    return !!post.votes.find((vote) => vote === this.userId);
  };

  private preparePosts = (snapshot: QuerySnapshot) => {
    const posts: IPost[] = [];

    snapshot.forEach((document) => {
      const hasVoted = this.getHasVoted(document.data() as IPost);

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
    const post = this.posts.find(({ id }) => id === postId);

    if (!post) return;

    const { id: authorId } = post.author;

    const userDoc = doc(db, "users", authorId);

    let pointsChange = this.POINTS_PER_VOTE;

    if (post.hasVoted) {
      setDoc(postDoc, { votes: arrayRemove(this.userId) }, { merge: true });
      pointsChange *= -1;
    } else {
      setDoc(postDoc, { votes: arrayUnion(this.userId) }, { merge: true });
    }

    updateDoc(userDoc, {
      points: increment(pointsChange),
    });
  };

  public setPosts(posts: IPost[]) {
    this.posts = posts;
  }

  public setUserId(val: Maybe<string>) {
    this.userId = val;
  }
}
