import React, { useState } from "react";
import { Button, Input, Logo } from "../ui";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useStore";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../services/appwrite/auth";
import { login } from "../../features/authSlice";

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm<SignupFormInputs>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signupHandler: SubmitHandler<SignupFormInputs> = async (data) => {
    setErrorMessage(null);

    try {
      const session = await authService.createAccount(
        data.email,
        data.password,
        data.name
      );

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
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {errorMessage && (
          <p className="text-red-600 mt-8 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(signupHandler)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
