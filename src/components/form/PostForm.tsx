import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IPosts } from "../../types/collections";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import storageService from "../../services/appwrite/storage";
import databaseService from "../../services/appwrite/database";
import { Button, Input, RTE, Select } from "../ui";
import { PostFormInputs } from "../../types/index.type";

type IPostForm = {
  post?: IPosts;
};

const PostForm: React.FC<IPostForm> = ({ post }) => {
  const navigate = useNavigate();

  const { userData } = useAppSelector((state) => state.authReducer);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<PostFormInputs>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "inactive",
        userId: post?.userId || "",
      },
    });

  const submitHandler = async (data: any) => {
    if (post) {
      const file = data.featuredImage[0]
        ? await storageService.uploadFile(data.featuredImage[0])
        : null;

      if (file) {
        storageService.deleteFile(post?.featuredImage);
      }

      const updatedPost = await databaseService.updatePostById(post?.slug, {
        ...data,
        featuredImage: file ? file.$id : post?.featuredImage,
      });

      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const uploadedFile = await storageService.uploadFile(
        data.featuredImage[0]
      );

      if (uploadedFile) {
        const newPost = await databaseService.createPost({
          ...data,
          featuredImage: uploadedFile?.$id,
          userId: userData?.$id,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        } else {
          storageService.deleteFile(uploadedFile.$id);
        }
      }
    }
  };

  const postSlugTransform: (postTitle: string) => string = useCallback(
    (postTitle: string) => {
      if (postTitle) {
        return postTitle
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "-")
          .replace(/-+/g, "-");
      }

      return "";
    },
    []
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && value.title) {
        setValue("slug", postSlugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, postSlugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col space-y-10 md:flex-row md:space-x-5"
    >
      <div className="w-full px-2 mx-auto md:w-2/3">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: { value: true, message: "Title is required" },
          })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: { value: true, message: "Slug is required" },
          })}
          onInput={(e: { currentTarget: { value: any } }) => {
            setValue("slug", postSlugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full px-2 mx-auto md:w-1/3">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={`${storageService.getFilePreview(post.featuredImage)}`}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: { value: true, message: "Status is required" },
          })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
