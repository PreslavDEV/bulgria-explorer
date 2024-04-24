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
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { ISignInData } from "@/components/forms/sign-in-form/interface";
import { ISignUpData } from "@/components/forms/sign-up-form/interface";
import { auth, db } from "@/configs/firebase.config";

import { IUser } from "./interface";

@injectable()
export class AuthStore {
  private path: string;

  private userCollection: CollectionReference;

  public user: Maybe<IUser>;

  public initializing: boolean;

  constructor() {
    this.path = "users";

    this.userCollection = collection(db, this.path);

    this.user = null;

    this.initializing = true;

    makeObservable(this, {
      user: observable,
      initializing: observable,

      setUser: action.bound,
      setInitializing: action.bound,
    });
  }

  private checkIsUsernameAvailable = async (username: string) => {
    const q = query(this.userCollection, where("username", "==", username));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };

  public setUser(user: Maybe<IUser>) {
    this.user = user;
  }

  public setInitializing(value: boolean) {
    this.initializing = value;
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
      } else {
        throw new Error("Username already exists");
      }
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
    // TODO handle errors
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
        email: authUser.email,
      } as IUser;

      setDoc(userDoc, userPayload);
      this.setUser(userPayload);
    }
  };

  public signOut = async () => {
    await signOut(auth);

    this.setUser(null);
  };
}
