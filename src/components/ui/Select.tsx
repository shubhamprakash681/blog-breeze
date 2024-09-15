import React from "react";
import { ForwardRefRenderFunction, useId } from "react";

type SelectProps = {
  options: string[];
  label?: string;
  className?: string;
  [key: string]: any;
};

const Select: ForwardRefRenderFunction<
  HTMLSelectElement,
  Omit<SelectProps, "ref">
> = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}

      <select
        ref={ref}
        name={`${label ? label : "select"}-${id}`}
        id={id}
        className={`${className} px-3 py-2 rounded-lg outline-none bg-input focus:bg-popover focus:border-mutedForeground duration-200 border border-border w-full`}
        {...props}
      >
        {options.map((option: any) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
