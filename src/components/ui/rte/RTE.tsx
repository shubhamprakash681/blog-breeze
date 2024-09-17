import React from "react";
import BundledEditor from "./BundledEditor";
import { Control, Controller } from "react-hook-form";
import { PostFormInputs } from "../../../types/inputs";

type RTEProps = {
  name: "content" | "title" | "slug" | "featuredImage" | "status" | "userId";
  control: Control<PostFormInputs>;
  label: string;
  defaultValue: string;
};

const RTE: React.FC<RTEProps> = ({ name, control, label, defaultValue }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <BundledEditor
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "help",
                "image",
                "link",
                "lists",
                "searchreplace",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
