import React from "react";

type LogoProps = {
  children?: React.ReactNode;
  width?: string;
  [key: string]: any;
};

const Logo: React.FC<LogoProps> = ({ children, width = "100px", ...props }) => {
  return <div {...props}>{children}</div>;
};

export default Logo;
