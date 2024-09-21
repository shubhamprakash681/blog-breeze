import React from "react";
import { useAppSelector } from "../../hooks/useStore";
import LogoutButton from "../header/LogoutButton";
import { NavLink } from "react-router-dom";
import Button from "./Button";

type PageContainerProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  ...props
}) => {
  const { isHamburgerMenuOpen, hamburgerMenuNavItems } = useAppSelector(
    (state) => state.uiReducer
  );
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  return (
    <div
      {...props}
      className={`${
        className ? className : ""
      } page-container py-6 pb-20 px-1 sm:px-6`}
    >
      {isHamburgerMenuOpen && (
        <div className="hamburger-menu bg-muted shadow-md md:hidden">
          {hamburgerMenuNavItems.map(
            (navItem) =>
              navItem.active && (
                <NavLink
                  key={navItem.name}
                  to={navItem.slug}
                  className={({ isActive }) =>
                    `${isActive && "text-primary"} min-h-12 w-60 sm:w-80`
                  }
                >
                  <Button className="w-full" variant={navItem.buttonVariant}>
                    {navItem.name}
                  </Button>
                </NavLink>
              )
          )}

          {isAuthenticated && <LogoutButton className="mt-4" />}
        </div>
      )}

      {children}
    </div>
  );
};

export default PageContainer;
