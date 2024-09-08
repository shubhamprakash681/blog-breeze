import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  isSolid?: boolean;
  className?: string;
  [key: string]: any; // Allow additional props
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  isSolid,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} border ${
        isSolid
          ? "bg-orange-100 border-orange-400 hover:bg-orange-200"
          : "border-orange-200 hover:bg-orange-100"
      } px-4 py-2 rounded-lg hover:underline hover:decoration-orange-500 hover:text-orange-500`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
