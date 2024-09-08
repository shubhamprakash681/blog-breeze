import React, { useEffect, useState } from "react";
import authService from "./services/appwrite/auth";
import { useAppDispatch } from "./hooks/useStore";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

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

  return (
    <div className="app-container bg-orange-50 text-black dark:bg-slate-700 dark:text-white">
      <div className="outer-top shadow-sm shadow-orange-200">
        <Header />
      </div>

      <div className="outer-bottom">
        <Outlet />

        <Footer />
      </div>
    </div>
  );
};

export default App;
