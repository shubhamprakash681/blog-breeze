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

type InputProps = {
  label?: string;
  type?: AllHTMLInputs;
  className?: string;
  [key: string]: any; // Allow additional props
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, type = "text", className, ...props },
  ref
) => {
  const id = useId();

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
        className={`${className} px-3 py-2 rounded-lg outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        {...props}
      />
    </div>
  );
};

export default Input;
