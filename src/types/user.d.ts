import { UserInfo } from "firebase/auth";

export type User = UserInfo & { isAdmin: boolean };
