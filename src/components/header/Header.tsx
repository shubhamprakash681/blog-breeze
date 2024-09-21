import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo } from "../ui";
import LogoutButton from "./LogoutButton";
import { Button } from "../ui";
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md";
import { toggleTheme } from "../../features/themeSlice";
import {
  closeHamburgerMenu,
  openHamburgerMenu,
  setHamburgerMenuNavItems,
} from "../../features/uiSlice";
import { NavItems } from "../../types/index.type";

type ThemeToggleButtonProps = {
  theme: "light" | "dark";
  dispatch: any;
};

const getNavItems = (isAuthenticated: boolean) => {
  const navItems: NavItems[] = [
    {
      name: "Home",
      slug: "/",
      active: true,
      buttonVariant: "link",
    },
    {
      name: "Login",
      slug: "/login",
      active: !isAuthenticated,
      buttonVariant: "secondary",
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isAuthenticated,
      buttonVariant: "primary",
    },
    {
      name: "All Posts",
      slug: "/posts",
      active: isAuthenticated,
      buttonVariant: "link",
    },
    {
      name: "My Posts",
      slug: "/posts/my-posts",
      active: isAuthenticated,
      buttonVariant: "link",
    },
    {
      name: "Add Post",
      slug: "/post/new",
      active: isAuthenticated,
      buttonVariant: "link",
    },
  ];

  return navItems;
};

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  theme,
  dispatch,
}) => {
  if (theme === "light") {
    return (
      <li>
        <Button variant="outlined" onClick={() => dispatch(toggleTheme())}>
          {<MdLightMode size={"20px"} />}
        </Button>
      </li>
    );
  }

  return (
    <li>
      <Button variant="outlined" onClick={() => dispatch(toggleTheme())}>
        {<MdDarkMode size={"20px"} />}
      </Button>
    </li>
  );
};

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const { theme } = useAppSelector((state) => state.themeReducer);
  const { isHamburgerMenuOpen, hamburgerMenuNavItems } = useAppSelector(
    (state) => state.uiReducer
  );

  useEffect(() => {
    dispatch(setHamburgerMenuNavItems(getNavItems(isAuthenticated)));
  }, [isAuthenticated]);

  return (
    <header className="py-3">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4 flex items-center">
            <Link to={"/"}>
              <Logo
                className="text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold"
                width="70px"
              >
                Blog Breeze
              </Logo>
            </Link>
          </div>

          <ul className="hidden md:flex items-center ml-auto gap-4">
            <ThemeToggleButton
              key={"theme-toggle-md"}
              theme={theme}
              dispatch={dispatch}
            />

            {hamburgerMenuNavItems.map(
              (navItem) =>
                navItem.active && (
                  <li key={navItem.name}>
                    <NavLink
                      to={navItem.slug}
                      className={({ isActive }) =>
                        `${isActive && "text-primary"}`
                      }
                    >
                      <Button variant={navItem.buttonVariant}>
                        {navItem.name}
                      </Button>
                    </NavLink>
                  </li>
                )
            )}

            {isAuthenticated && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>

          <ul className="flex md:hidden items-center ml-auto gap-4">
            <ThemeToggleButton
              key={"theme-toggle-md"}
              theme={theme}
              dispatch={dispatch}
            />

            <li key={"ham-btn"}>
              {isHamburgerMenuOpen ? (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(closeHamburgerMenu())}
                >
                  <MdClose size={"20px"} />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(openHamburgerMenu())}
                >
                  <MdMenu size={"20px"} />
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
