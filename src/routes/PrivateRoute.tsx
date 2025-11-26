import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}