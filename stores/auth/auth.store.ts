import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { ISignInData } from "@/components/forms/sigin-in-form/interface";
import { ISignUpData } from "@/components/forms/sign-up-form/interface";
import { auth } from "@/configs/firebase.config";

@injectable()
export class AuthStore {
  public user: Maybe<User>;

  public initializing: boolean;

  constructor() {
    this.user = null;

    this.initializing = true;

    makeObservable(this, {
      user: observable,
      initializing: observable,

      setUser: action.bound,
      setInitializing: action.bound,
    });
  }

  public setUser(user: User | null) {
    this.user = user;
  }

  public setInitializing(value: boolean) {
    this.initializing = value;
  }

  public signUp = async ({ email, password }: ISignUpData) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (userCredential) {
      this.setUser(userCredential.user);
    }
    // TODO handle errors
  };

  public signIn = async ({ email, password }: ISignInData) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (userCredential) {
      this.setUser(userCredential.user);
    }
    // TODO handle errors
  };

  public signOut = async () => {
    await signOut(auth);

    this.setUser(null);
  };
}
