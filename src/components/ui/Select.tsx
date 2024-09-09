import { ForwardRefRenderFunction, useId } from "react";

type SelectProps = {
  options: string[];
  label?: string;
  className?: string;
  [key: string]: any;
};

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { options, label, className = "", ...props },
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

      <select
        ref={ref}
        name={`${label ? label : "select"}-${id}`}
        id={id}
        className={`${className} px-3 py-2 rounded-lg outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        {...props}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
