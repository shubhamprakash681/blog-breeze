import React from "react";
import { useAppDispatch } from "../../hooks/useStore";
import authService from "../../services/appwrite/auth";
import { logout } from "../../features/authSlice";
import { Button } from "../ui";

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();

      dispatch(logout());
    } catch (err) {
      console.log("Error Logging Out User");
    }
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutButton;
