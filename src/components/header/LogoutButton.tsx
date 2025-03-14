import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import authService from "../../services/appwrite/auth";
import { logout } from "../../features/authSlice";
import { Button } from "../ui";

type LogoutButtonProps = {
  className?: string;
};
const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      setIsInProgress(true);
      await authService.logout();

      dispatch(logout());
    } catch (err) {
      console.log("Error Logging Out User");
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <Button
      disabled={isInProgress}
      className={className ? className : ""}
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
