import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable, reaction } from "mobx";

import { ISignInData } from "@/components/forms/sign-in-form/interface";
import { ISignUpData } from "@/components/forms/sign-up-form/interface";
import { auth, db } from "@/configs/firebase.config";
import { getDictionary, locale } from "@/configs/i18n.config";
import { getFormattedPostDate } from "@/utils/get-formatted-post-date.util";
import { getRandomColor } from "@/utils/get-random-color.util";

import { IPost } from "../post/interface";

import { IUser } from "./interface";

@injectable()
export class AuthStore {
  private path: string;

  private userCollection: CollectionReference;

  public user: Maybe<IUser>;

  public initializing: boolean;

  public myPosts: IPost[];

  private initialPostsSnapshot: Maybe<QuerySnapshot>;

  private postsQuery: Query;

  constructor() {
    this.path = "users";

    this.userCollection = collection(db, this.path);

    this.user = null;

    this.initializing = true;

    this.myPosts = [];

    this.initialPostsSnapshot = null;

    this.postsQuery = query(
      collection(db, "posts"),
      orderBy("dateCreated", "desc"),
    );

    makeObservable(this, {
      user: observable,
      initializing: observable,
      myPosts: observable,

      setUser: action.bound,
      setMyPosts: action.bound,
      setInitializing: action.bound,
    });

    reaction(
      () => this.user?.id,
      () => {
        if (this.initialPostsSnapshot) {
          this.prepareMyPosts(this.initialPostsSnapshot);
        }

        if (this.user) {
          const q = query(this.userCollection, where("id", "==", this.user.id));
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((userDoc) => {
              const updatedUser = userDoc.data() as IUser;
              this.setUser(updatedUser);
            });
          });
        }
      },
    );

    onSnapshot(this.postsQuery, (snapshot) => {
      if (!this.initialPostsSnapshot) {
        this.initialPostsSnapshot = snapshot;
        return;
      }

      this.prepareMyPosts(snapshot);
    });
  }

  private checkIsUsernameAvailable = async (username: string) => {
    const q = query(this.userCollection, where("username", "==", username));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };

  private prepareMyPosts = (snapshot: QuerySnapshot) => {
    if (!this.user) return;

    const posts: IPost[] = [];

    snapshot.forEach((document) => {
      const dateCreated = getFormattedPostDate(document.data().dateCreated);
      if (document.data().author.id === this.user?.id) {
        posts.push({
          id: document.id,
          ...document.data(),
          // false because in this context hasVoted is irrelevant, we don't need to make calculations
          hasVoted: false,
          dateCreated,
          votesCount: document.data().votes.length,
        } as IPost);
      }
    });

    this.setMyPosts(posts);
  };

  public setUser(user: Maybe<IUser>) {
    this.user = user;
  }

  public setInitializing(value: boolean) {
    this.initializing = value;
  }

  public setMyPosts(posts: IPost[]) {
    this.myPosts = posts;
  }

  public signUp = async ({ email, password, username }: ISignUpData) => {
    const isUsernameAvailable = await this.checkIsUsernameAvailable(username);

    if (isUsernameAvailable) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userCredential) {
        this.getUserEntity(userCredential.user, username);
      }
    } else {
      throw new Error(getDictionary(locale).signUp.errors.username.server);
    }
  };

  public signIn = async ({ email, password }: ISignInData) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (userCredential) {
      this.getUserEntity(userCredential.user);
    }
  };

  public getUserEntity = async (authUser: Maybe<User>, username?: string) => {
    if (!authUser) return;
    const userDoc = doc(db, this.path, authUser.uid);
    const snapshot = await getDoc(userDoc);

    if (snapshot.exists()) {
      const data = snapshot.data() as IUser;
      this.setUser(data);
    } else {
      if (!username) return;

      const userPayload = {
        id: authUser.uid,
        username,
        email: authUser.email!,
        color: getRandomColor(),
        points: 0,
        ranking: 0,
      };

      setDoc(userDoc, userPayload);
      this.setUser(userPayload);
    }
  };

  public signOut = async () => {
    await signOut(auth);

    this.setUser(null);
    this.setMyPosts([]);
  };

  public updateUserColor = async (color: string) => {
    if (this.user) {
      const userDoc = doc(db, this.path, this.user.id);

      setDoc(userDoc, { color }, { merge: true });

      this.setUser({ ...this.user, color });
    }
  };
}
