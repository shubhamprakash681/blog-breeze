import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useStore";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../services/appwrite/auth";
import { login } from "../../features/authSlice";
import { Button, FormErrorStrip, Input } from "../ui";
import { AppwriteException } from "appwrite";
import { displayErrorToast } from "../../services/toast/displayToast";
import { BiShow, BiHide } from "react-icons/bi";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");

  const togglePasswordInputType = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };

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
        className={`w-[475px] max-w-lg bg-card text-cardForeground rounded-xl p-10`}
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

        <form onSubmit={handleSubmit(loginHandler)} className="mt-8 space-y-5">
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

          <div>
            <Input
              label="Password: "
              type={passwordInputType}
              placeholder="Enter your password"
              BtnComponent={() => (
                <button
                  className="p-2 -ml-10 cursor-pointer"
                  onClick={togglePasswordInputType}
                  type="button"
                >
                  {passwordInputType === "password" && <BiShow size={"20px"} />}
                  {passwordInputType === "text" && <BiHide size={"20px"} />}
                </button>
              )}
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors.password && (
              <FormErrorStrip
                className="mt-1"
                errorMessage={errors.password.message as string}
              />
            )}

            <div className="flex items-center justify-end mt-1">
              <Link to={"/password/forgot"}>
                <Button className="py-0 text-primary" variant="link">
                  Forgot Password?
                </Button>
              </Link>
            </div>
          </div>

          {errors.root && (
            <FormErrorStrip errorMessage={errors.root.message as string} />
          )}

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
