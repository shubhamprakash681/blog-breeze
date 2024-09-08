import React, { useEffect, useState } from "react";
import authService from "./services/appwrite/auth";
import { useAppDispatch } from "./hooks/useStore";
import { login, logout } from "./features/authSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log("here, userData: ", userData);

        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUserData();
  }, []);

  return <div>APP</div>;
};

export default App;
