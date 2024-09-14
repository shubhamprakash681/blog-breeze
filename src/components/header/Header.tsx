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
  isSolidButton: boolean;
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
      isSolidButton: false,
    },
    {
      name: "Login",
      slug: "/login",
      active: !isAuthenticated,
      isSolidButton: false,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isAuthenticated,
      isSolidButton: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: isAuthenticated,
      isSolidButton: false,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isAuthenticated,
      isSolidButton: false,
    },
  ];

  return (
    <header className="py-3">
      <Container>
        <nav className="flex">
          <div className="mr-4 flex items-center">
            <Link to={"/"}>
              <Logo className="text-xl" width="70px">
                Blog Breeze
              </Logo>
            </Link>
          </div>

          <ul className="flex ml-auto gap-2">
            {theme === "light" && (
              <li>
                <Button onClick={() => dispatch(toggleTheme())}>
                  {<MdLightMode size={"20px"} />}
                </Button>
              </li>
            )}
            {theme === "dark" && (
              <li>
                <Button onClick={() => dispatch(toggleTheme())}>
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
                        `${isActive && "text-orange-400"}`
                      }
                    >
                      <Button
                        className={`${
                          navItem.name !== "Signup" &&
                          "border-none hover:bg-transparent"
                        }`}
                        isSolid={navItem.isSolidButton}
                      >
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
