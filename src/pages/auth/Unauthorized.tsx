import React from "react";
import { Button, PageContainer } from "../../components/ui";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <PageContainer className="flex items-center justify-evenly">
      <div
        style={{ width: "500px" }}
        className="flex-col space-y-10 p-10 bg-card text-cardForeground rounded-lg"
      >
        <div>
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <CiLock className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-center">
            Unauthorized Access
          </h2>
        </div>

        <div>
          <p className="text-center text-mutedForeground">
            You don't have permission to access this page. Please log in or sign
            up to continue.
          </p>
        </div>

        <div>
          <p className="text-center text-sm mt-2">
            If you believe this is an error, please contact support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link className="w-full" to="/login">
            <Button variant="outlined" className="w-full">
              Login
            </Button>
          </Link>
          <Link className="w-full" to="/signup">
            <Button className="w-full">Signup</Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default Unauthorized;
