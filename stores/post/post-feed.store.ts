import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable, reaction } from "mobx";

import { db } from "@/configs/firebase.config";
import { POINTS_PER_VOTE } from "@/constants/points.constants";
import { getFormattedPostDate } from "@/utils/get-formatted-post-date.util";

import { IUser } from "../auth/interface";

import { IPost } from "./interface";
import { PostStore } from "./post.store";

@injectable()
export class PostFeedStore extends PostStore {
  public posts: IPost[];

  public userId: Maybe<string>;

  private postsQuery: Query;

  public loadingPosts: boolean;

  constructor() {
    super();

    this.posts = [];

    this.userId = null;

    this.loadingPosts = true;

    this.postsQuery = query(
      this.postsCollection,
      orderBy("dateCreated", "desc"),
    );

    makeObservable(this, {
      posts: observable,
      userId: observable,
      loadingPosts: observable,

      setPosts: action.bound,
      setUserId: action.bound,
      setLoadingPosts: action.bound,
    });

    onSnapshot(this.postsQuery, (snapshot) => {
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
    this.setLoadingPosts(true);
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
    this.setLoadingPosts(false);
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

    let pointsChange = POINTS_PER_VOTE;

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

  public setLoadingPosts(val: boolean) {
    this.loadingPosts = val;
  }
}
