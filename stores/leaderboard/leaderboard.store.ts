import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { db } from "@/configs/firebase.config";

import { IUser } from "../auth/interface";

@injectable()
export class LeaderboardStore {
  public users: IUser[];

  private usersQuery: Query;

  constructor() {
    this.users = [];

    this.usersQuery = query(collection(db, "users"), orderBy("points", "desc"));

    makeObservable(this, {
      users: observable,

      setUsers: action.bound,
    });

    onSnapshot(this.usersQuery, (snapshot) => {
      const users: IUser[] = [];
      snapshot.forEach((snap) => {
        const user = snap.data() as IUser;
        users.push(user);
      });

      this.setUsers(users);

      this.updateRanks(snapshot);
    });
  }

  private updateRanks = (snapshot: QuerySnapshot) => {
    let ranking = 1;
    snapshot.forEach((snap) => {
      const userDoc = doc(db, "users", snap.id);
      updateDoc(userDoc, { ranking });
      ranking++;
    });
  };

  public setUsers(users: IUser[]) {
    this.users = users;
  }
}
