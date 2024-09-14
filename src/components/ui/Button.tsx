import React from "react";

type buttonClass = {
  [key in
    | "primary"
    | "secondary"
    | "outlined"
    | "destructive"
    | "ghost"
    | "link"]: string;
};

const buttonClass: buttonClass = {
  primary:
    "px-4 py-2 rounded-lg bg-accent hover:bg-accent text-accentForeground transition-all duration-300 hover:shadow-lg hover:scale-105",
  secondary:
    "px-4 py-2 rounded-lg bg-secondary text-secondaryForeground shadow-sm hover:bg-secondary/80 transition-all duration-300 hover:shadow-lg hover:scale-105",
  outlined:
    "px-4 py-2 rounded-lg border border-input bg-background shadow-sm hover:bg-accent hover:text-accentForeground transition-all duration-300 hover:shadow-lg hover:scale-105",
  destructive:
    "px-4 py-2 rounded-lg bg-destructive text-destructiveForeground shadow-sm hover:bg-destructive/90 transition-all duration-300 hover:shadow-lg hover:scale-105",
  ghost:
    "px-4 rounded-lg py-2 hover:bg-accent hover:text-accentForeground transition-all duration-300 hover:shadow-lg hover:scale-105",
  link: "px-4 py-2 rounded-lg underline-offset-4 hover:underline hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105",
};

type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  variant?:
    | "primary"
    | "secondary"
    | "outlined"
    | "destructive"
    | "ghost"
    | "link";
  className?: string;
  [key: string]: any; // Allow additional props
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} ${buttonClass[variant]}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
