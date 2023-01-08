import { useAuthContext } from "context/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
  requireAdmin?: boolean;
};

export default function ProtectedRoute({
  children,
  requireAdmin,
}: ProtectedRouteProps) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
