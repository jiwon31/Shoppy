import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserInfo,
} from "firebase/auth";
import { auth, database, provider } from "./firebase";
import { ref, get } from "firebase/database";
import { User } from "types/user";

export interface AuthService {
  login: () => void;
  logout: () => void;
  onUserStateChange: (callback: (user: User | null) => void) => void;
}

export default class AuthServiceImpl implements AuthService {
  login() {
    signInWithPopup(auth, provider) //
      .catch(console.error);
  }

  logout() {
    signOut(auth) //
      .catch(console.error);
  }

  onUserStateChange(callback: (user: User | null) => void) {
    onAuthStateChanged(auth, async (user: UserInfo | null) => {
      const updatedUser = user ? await this.adminUser(user) : null;
      callback(updatedUser);
    });
  }

  private async adminUser(user: UserInfo): Promise<User> {
    return get(ref(database, "admins")) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          const admins: string[] = snapshot.val();
          const isAdmin = admins.includes(user.uid!);
          return { ...user, isAdmin };
        }
        return { ...user, isAdmin: false };
      });
  }
}
