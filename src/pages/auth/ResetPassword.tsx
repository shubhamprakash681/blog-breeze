import React from "react";
import { PageContainer } from "../../components/ui";
import { ResetPassword as ResetPasswordCard } from "../../components";

const ResetPassword: React.FC = () => {
  return (
    <PageContainer className="flex items-center">
      <ResetPasswordCard />
    </PageContainer>
  );
};

export default ResetPassword;
