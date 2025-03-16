import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormErrorStrip, Input } from "../ui";
import { useNavigate } from "react-router-dom";
import { AppwriteException } from "appwrite";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../services/toast/displayToast";
import authService from "../../services/appwrite/auth";

type ForgotPaswordInputs = {
  email: string;
};

const ForgotPasword: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPaswordInputs>({
    defaultValues: {
      email: "",
    },
  });

  const submitHandler: SubmitHandler<ForgotPaswordInputs> = async (data) => {
    try {
      await authService.createPasswordRecovery(data.email);

      displaySuccessToast("Password reset link sent to your email adderess");
      setValue("email", "");
    } catch (error: any) {
      if (error instanceof AppwriteException) {
        setError("root", { type: error.type, message: error.message });
      }

      displayErrorToast(error);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto">
      <div
        className={`w-[475px] max-w-lg bg-card text-cardForeground rounded-xl p-10`}
      >
        <h2 className="text-center text-xl font-bold leading-tight">
          Forgot your password
        </h2>
        <p className="mt-2 mb-8 text-base text-mutedForeground">
          Please enter the email address associated to your account
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          <div>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <FormErrorStrip
                className="mt-1"
                errorMessage={errors.email.message as string}
              />
            )}
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting
              ? "Sending request link to your mail..."
              : "Request Reset Link"}
          </Button>

          <Button
            disabled={isSubmitting}
            className="w-full text-primary"
            variant="link"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasword;
