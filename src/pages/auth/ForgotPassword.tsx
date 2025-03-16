import React from "react";
import { PageContainer } from "../../components/ui";
import { ForgotPasword as ForgotPasswordCard } from "../../components";

const ForgotPassword: React.FC = () => {
  return (
    <PageContainer className="flex items-center">
      <ForgotPasswordCard />
    </PageContainer>
  );
};

export default ForgotPassword;
