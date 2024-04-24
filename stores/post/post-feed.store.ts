import { getDocs } from "firebase/firestore";
import { injectable } from "inversify";
import { action, autorun, makeObservable, observable } from "mobx";

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

    autorun(() => this.getPosts());
  }

  public getPosts = async () => {
    const snapshot = await getDocs(this.postsCollection);
    const posts: IPost[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as IPost);
    });

    this.setPosts(posts);
  };

  public setPosts(posts: IPost[]) {
    this.posts = posts;
  }
}
