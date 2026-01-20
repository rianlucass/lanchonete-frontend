import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // ou um loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}