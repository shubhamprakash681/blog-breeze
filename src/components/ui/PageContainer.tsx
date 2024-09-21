import React from "react";

type PageContainerProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${className} page-container py-6 pb-20 px-1 sm:px-6`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
