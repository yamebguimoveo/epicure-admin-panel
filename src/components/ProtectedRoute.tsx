import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = window.localStorage.getItem("token");
  return token? children : <Navigate to='/' replace />;
};
