import { getDocs, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { IPost } from "./interface";
import { PostStore } from "./post.store";

@injectable()
export class PostFeedStore extends PostStore {
  public posts: IPost[];

  constructor() {
    super();

    this.posts = [];

    makeObservable(this, {
      posts: observable,

      setPosts: action.bound,
    });

    onSnapshot(this.postsCollection, (snapshot) => {
      this.preparePosts(snapshot);
    });
  }

  private preparePosts = (snapshot: QuerySnapshot) => {
    const posts: IPost[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as IPost);
    });

    this.setPosts(posts);
  };

  public getPosts = async () => {
    const snapshot = await getDocs(this.postsCollection);
    this.preparePosts(snapshot);
  };

  public setPosts(posts: IPost[]) {
    this.posts = posts;
  }
}
