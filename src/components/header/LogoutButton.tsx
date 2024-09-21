import React from "react";
import { useAppDispatch } from "../../hooks/useStore";
import authService from "../../services/appwrite/auth";
import { logout } from "../../features/authSlice";
import { Button } from "../ui";

type LogoutButtonProps = {
  className?: string;
};
const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();

      dispatch(logout());
    } catch (err) {
      console.log("Error Logging Out User");
    }
  };

  return (
    <Button className={className ? className : ""} onClick={logoutHandler}>
      Logout
    </Button>
  );
};

export default LogoutButton;
