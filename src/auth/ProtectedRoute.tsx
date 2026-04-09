import { useAuth0 } from "@auth0/auth0-react";
import {Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    toast.error("Log In!");

    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    });

    return null; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
