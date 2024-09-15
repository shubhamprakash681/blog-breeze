import React from "react";

type PageContainerProps = {
  children?: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className="page-container p-6">{children}</div>;
};

export default PageContainer;
