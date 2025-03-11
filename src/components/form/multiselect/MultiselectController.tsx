import React from "react";
import { Control, Controller } from "react-hook-form";
import { PostFormInputs } from "../../../types/index.type";
import MultiselectWithTags from "./MultiselectWithTags";
import { PostCategory } from "../../../types/collections";

type MultiselectControllerProps = {
  name: "category";
  control: Control<PostFormInputs>;
  label: string;
  placeholder?: string;

  options: { label: string; value: PostCategory }[];
};

const MultiselectController: React.FC<MultiselectControllerProps> = ({
  label,
  placeholder,
  control,
  name,
  options,
}: MultiselectControllerProps) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={{
          required: { value: true, message: "Category is required" },
          minLength: { value: 1, message: "Category is required" },
        }}
        render={({ field: { onChange, value } }) => (
          <MultiselectWithTags<PostCategory>
            options={options}
            selectedValues={value || []}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
};

export default MultiselectController;
