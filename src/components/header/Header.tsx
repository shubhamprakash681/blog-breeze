import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo } from "../ui";
import LogoutButton from "./LogoutButton";
import { Button } from "../ui";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { toggleTheme } from "../../features/themeSlice";

type NavItems = {
  name: string;
  slug: string;
  active: boolean;
  buttonVariant:
    | "primary"
    | "secondary"
    | "outlined"
    | "destructive"
    | "ghost"
    | "link";
};

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const { theme } = useAppSelector((state) => state.themeReducer);

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
      slug: "/all-posts",
      active: isAuthenticated,
      buttonVariant: "link",
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isAuthenticated,
      buttonVariant: "link",
    },
  ];

  return (
    <header className="py-3">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4 flex items-center">
            <Link to={"/"}>
              <Logo
                className="text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                width="70px"
              >
                Blog Breeze
              </Logo>
            </Link>
          </div>

          <ul className="flex items-center ml-auto gap-4">
            {theme === "light" && (
              <li>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(toggleTheme())}
                >
                  {<MdLightMode size={"20px"} />}
                </Button>
              </li>
            )}
            {theme === "dark" && (
              <li>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(toggleTheme())}
                >
                  {<MdDarkMode size={"20px"} />}
                </Button>
              </li>
            )}

            {navItems.map(
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
        </nav>
      </Container>
    </header>
  );
};

export default Header;
