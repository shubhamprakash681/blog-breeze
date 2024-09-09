import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";

interface IProtectedAuthLayout {
  children: React.ReactNode;
  authentication: boolean;
}

const ProtectedAuthLayout: React.FC<IProtectedAuthLayout> = ({
  children,
  authentication = true,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    // Check if user should be authenticated
    if (authentication && isAuthenticated !== authentication) {
      navigate("/login");
    }
    // Check if user should not be authenticated
    else if (!authentication && isAuthenticated !== authentication) {
      navigate("/");
    }

    setIsLoading(false);
  }, [isAuthenticated, navigate, authentication]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default ProtectedAuthLayout;
