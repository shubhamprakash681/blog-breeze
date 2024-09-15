import React from "react";
import { PageContainer } from "../../components/ui";
import { Login as LoginCard } from "../../components";

const Login: React.FC = () => {
  return (
    <PageContainer className="flex items-center">
      <LoginCard />
    </PageContainer>
  );
};

export default Login;
