import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FormErrorStrip, Input } from "../ui";
import { BiHide, BiShow } from "react-icons/bi";
import { AppwriteException } from "appwrite";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../services/toast/displayToast";
import authService from "../../services/appwrite/auth";

type ResetPaswordInputs = {
  password: string;
  cnfPassword: string;
};

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");
  const [cnfPasswordInputType, setCnfPasswordInputType] = useState<
    "password" | "text"
  >("password");

  const togglePasswordInputType = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };
  const toggleCnfPasswordInputType = () => {
    if (cnfPasswordInputType === "password") {
      setCnfPasswordInputType("text");
    } else {
      setCnfPasswordInputType("password");
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPaswordInputs>({
    defaultValues: {
      cnfPassword: "",
      password: "",
    },
  });

  const resetPasswordSubmitHandler: SubmitHandler<ResetPaswordInputs> = async (
    data
  ) => {
    if (!data.cnfPassword) {
      setError("cnfPassword", {
        type: "required",
        message: "Confirm Password is required",
      });

      return;
    }

    if (data.cnfPassword !== data.password) {
      setError("root", {
        type: "validate",
        message: "Password and Confirm Password must be same",
      });

      return;
    }

    try {
      const searchQuery = location.search.slice(1);

      const queries = searchQuery.split("&");

      let userId: string = "";
      let secret: string = "";

      for (let i = 0; i < queries.length; i += 1) {
        const splited = queries[i].split("=");

        if (splited[0].toLocaleLowerCase() === "userid") {
          userId = splited[1];
        }
        if (splited[0].toLocaleLowerCase() === "secret") {
          secret = splited[1];
        }
      }

      await authService.resetPassword(userId, secret, data.password);

      displaySuccessToast("Password reset successful");
      setValue("password", "");
      setValue("cnfPassword", "");

      navigate("/login");
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
          Reset your password
        </h2>

        <form
          onSubmit={handleSubmit(resetPasswordSubmitHandler)}
          className="mt-8 space-y-5"
        >
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
                className="mt-1"
                errorMessage={errors.password.message as string}
              />
            )}
          </div>

          <div>
            <Input
              label="Confirm Password: "
              type={cnfPasswordInputType}
              placeholder="Re-enter your password"
              BtnComponent={() => (
                <button
                  className="p-2 -ml-10 cursor-pointer"
                  onClick={toggleCnfPasswordInputType}
                  type="button"
                >
                  {cnfPasswordInputType === "password" && (
                    <BiShow size={"20px"} />
                  )}
                  {cnfPasswordInputType === "text" && <BiHide size={"20px"} />}
                </button>
              )}
              {...register("cnfPassword", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
              })}
            />
            {errors.cnfPassword && (
              <FormErrorStrip
                className="mt-1"
                errorMessage={errors.cnfPassword.message as string}
              />
            )}
          </div>

          {errors.root && (
            <FormErrorStrip errorMessage={errors.root.message as string} />
          )}

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
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

export default ResetPassword;
