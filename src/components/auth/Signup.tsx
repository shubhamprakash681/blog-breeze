import React from "react";
import { Button, FormErrorStrip, Input } from "../ui";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useStore";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../services/appwrite/auth";
import { login } from "../../features/authSlice";
import { displayErrorToast } from "../../services/toast/displayToast";
import { AppwriteException } from "appwrite";

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signupHandler: SubmitHandler<SignupFormInputs> = async (data) => {
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
          Sign up to create account
        </h2>
        <p className="mt-2 mb-5 text-center text-base text-mutedForeground">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit(signupHandler)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: { value: true, message: "Full Name is required" },
                minLength: {
                  value: 3,
                  message: "Full Name must be of atleast 3 characters",
                },
              })}
            />
            {errors.name && (
              <FormErrorStrip errorMessage={errors.name.message as string} />
            )}

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
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                      value
                    ) ||
                    "Password must have at least 8 characters.\nMust contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.\nCan contain special characters",
                },
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
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
