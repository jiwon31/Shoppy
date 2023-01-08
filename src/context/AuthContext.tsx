import { createContext, useContext, useEffect, useState } from "react";
import { User } from "types/user";
import AuthServiceImpl, { AuthService } from "api/auth_service";

type Auth = {
  user: User | null;
  authService: AuthService;
};

const authService = new AuthServiceImpl();
const AuthContext = createContext<Auth | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.onUserStateChange((user: User | null) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ user, authService }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext) as Auth;
