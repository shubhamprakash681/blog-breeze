import React from "react";

type LogoProps = {
  children?: React.ReactNode;
  width?: string;
};

const Logo: React.FC<LogoProps> = ({ children, width = "100px" }) => {
  return <div>{children}</div>;
};

export default Logo;
