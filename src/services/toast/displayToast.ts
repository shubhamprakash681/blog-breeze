import { AppwriteException } from "appwrite";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";

export const displayErrorToast = (error: {
  message: Renderable | ValueFunction<Renderable, Toast>;
  code: number;
}) => {
  if (error instanceof AppwriteException) {
    return toast.error(error.message, { id: error.message });
  }

  if (error.code === 401) {
    return toast.error("You are Unauthorized to access this resource!", {
      id: "unauthorized",
    });
  }

  if (error.code === 403) {
    return toast.error("You do not have access!", {
      id: "forbidden",
    });
  }

  if (error.code === 404) {
    return toast.error("Resource does not exists!", {
      id: "not-found",
    });
  }

  console.error("unexpected-error: ", error);
  return toast.error("An unexpected error occurred!", {
    id: "unexpected-error",
  });
};

export const displaySuccessToast = (message: string) => {
  return toast.success(message, {
    id: message.toLowerCase(),
  });
};
