// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children:any }) => {
  const auth = useContext(AuthContext);

  if (!auth?.isAuthInitialized) {
    return <div>Loading...</div>
  }

  if (!auth?.user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
