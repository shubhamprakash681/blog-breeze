import React from "react";

interface FormErrorStripProps extends React.AllHTMLAttributes<HTMLDivElement> {
  errorMessage: string;
}

const FormErrorStrip: React.FC<FormErrorStripProps> = ({
  errorMessage,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${props.className || ""} text-destructive text-sm`}
    >
      {errorMessage}
    </div>
  );
};

export default FormErrorStrip;
