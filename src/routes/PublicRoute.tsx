import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function PublicRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}