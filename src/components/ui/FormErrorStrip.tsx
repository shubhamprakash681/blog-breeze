import React from "react";

type FormErrorStripProps = {
  errorMessage: string;
  className?: "string";
  [key: string]: any;
};

const FormErrorStrip: React.FC<FormErrorStripProps> = ({
  errorMessage,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className} text-destructive text-sm`}>
      {errorMessage}
    </div>
  );
};

export default FormErrorStrip;
