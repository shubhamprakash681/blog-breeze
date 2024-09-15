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
    <div {...props} className={`${className} page-container p-6`}>
      {children}
    </div>
  );
};

export default PageContainer;
