import React from "react";
import { ForwardRefRenderFunction, useId } from "react";

type AllHTMLInputs =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: AllHTMLInputs;
  className?: string;
  BtnComponent?: React.ElementType;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, type = "text", className, BtnComponent, ...props },
  ref
) => {
  const id = useId();

  if (BtnComponent) {
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}

        <div className="flex items-center w-full">
          <input
            id={id}
            ref={ref}
            type={type}
            className={`${className} px-3 py-2 rounded-lg outline-none bg-input focus:bg-popover focus:border-primary duration-200 border border-border w-full`}
            {...props}
          />

          <BtnComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        className={`${className} px-3 py-2 rounded-lg outline-none bg-input focus:bg-popover focus:border-primary duration-200 border border-border w-full`}
        {...props}
      />
    </div>
  );
};

export default React.forwardRef(Input);
