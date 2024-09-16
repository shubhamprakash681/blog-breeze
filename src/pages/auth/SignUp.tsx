import React from "react";
import { PageContainer } from "../../components/ui";
import { Signup as SignupCard } from "../../components";

const SignUp: React.FC = () => {
  return (
    <PageContainer className="flex items-center">
      <SignupCard />
    </PageContainer>
  );
};

export default SignUp;
