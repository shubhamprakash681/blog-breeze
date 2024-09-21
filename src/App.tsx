import React, { useEffect, useState } from "react";
import authService from "./services/appwrite/auth";
import { useAppDispatch, useAppSelector } from "./hooks/useStore";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { theme } = useAppSelector((state) => state.themeReducer);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();

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

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.remove("light", "dark");
    html?.classList.add(theme);
  }, [theme]);

  return (
    <div className="app-container bg-background text-foreground">
      <div className="outer-top shadow-md backdrop-blur supports-[backdrop-filter]:bg-background">
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
