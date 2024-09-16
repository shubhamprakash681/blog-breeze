import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useStore";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../services/appwrite/auth";
import { login } from "../../features/authSlice";
import { Button, FormErrorStrip, Input } from "../ui";
import { AppwriteException } from "appwrite";
import { displayErrorToast } from "../../services/toast/displayToast";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const session = await authService.login(data.email, data.password);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
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
        className={`w-full max-w-lg bg-card text-cardForeground rounded-xl p-10`}
      >
        <h2 className="text-center text-xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 mb-5 text-center text-base text-mutedForeground">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(loginHandler)} className="mt-8">
          <div className="space-y-5">
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
              <FormErrorStrip errorMessage={errors.email.message as string} />
            )}

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors.password && (
              <FormErrorStrip
                errorMessage={errors.password.message as string}
              />
            )}

            {errors.root && (
              <FormErrorStrip errorMessage={errors.root.message as string} />
            )}

            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
