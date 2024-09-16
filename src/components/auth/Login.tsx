import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useStore";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../services/appwrite/auth";
import { login } from "../../features/authSlice";
import { Button, Input } from "../ui";

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
    formState: { errors, isLoading },
  } = useForm<LoginFormInputs>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginHandler: SubmitHandler<LoginFormInputs> = async (data) => {
    setErrorMessage(null);

    try {
      const session = await authService.login(data.email, data.password);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage(error as string);
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

        {errorMessage && (
          <p className="text-destructive mt-8 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(loginHandler)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid Email",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
