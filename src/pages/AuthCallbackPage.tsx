import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  const location = useLocation();

  useEffect(() => {
    // Once authenticated, create user if not already done
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    // After creating user, redirect to the original page they tried to access
    if (isAuthenticated) {
      const returnTo = location.state?.from?.pathname || "/";
      navigate(returnTo, { replace: true });
    }
  }, [user, createUser, isAuthenticated, navigate, location]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
