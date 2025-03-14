import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IPost, PostCategory } from "../../types/collections";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import storageService from "../../services/appwrite/storage";
import databaseService from "../../services/appwrite/database";
import { Button, FormErrorStrip, Input, RTE, Select } from "../ui";
import { PostFormInputs } from "../../types/index.type";
import MultiselectController from "./multiselect/MultiselectController";
import { displaySuccessToast } from "../../services/toast/displayToast";

const postCategories: {
  label: string;
  value: PostCategory;
}[] = [
  { label: "Technology", value: "technology" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Education", value: "education" },
  { label: "Business", value: "business" },
  { label: "Photography", value: "photography" },
  { label: "Food", value: "food" },
  { label: "Other", value: "other" },
];

type IPostForm = {
  post?: IPost;
};

const PostForm: React.FC<IPostForm> = ({ post }) => {
  const navigate = useNavigate();

  const { userData } = useAppSelector((state) => state.authReducer);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<PostFormInputs>({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      category: post?.category || [],
      status: post?.status || "private",
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

      const updatedPost = await databaseService.updatePostById(post?.$id, {
        ...data,
        featuredImage: file ? file.$id : post?.featuredImage,
      });

      if (updatedPost) {
        displaySuccessToast("Post Updated Successfully");
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
          displaySuccessToast("Post Created Successfully");
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
      className="flex flex-col space-y-4 md:flex-row md:space-x-5 md:space-y-0"
    >
      <div className="w-full px-2 mx-auto md:w-2/3 space-y-4">
        <div>
          <Input
            label="Title"
            placeholder="Title"
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          {errors.title && (
            <FormErrorStrip
              className="mt-1"
              errorMessage={errors.title.message as string}
            />
          )}
        </div>

        <div>
          <Input
            label="Slug"
            placeholder="Slug"
            {...register("slug", {
              required: { value: true, message: "Slug is required" },
            })}
            onInput={(e: { currentTarget: { value: any } }) => {
              setValue("slug", postSlugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          {errors.slug && (
            <FormErrorStrip
              className="mt-1"
              errorMessage={errors.slug.message as string}
            />
          )}
        </div>

        <div>
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
          {errors.content && (
            <FormErrorStrip
              className="mt-1"
              errorMessage={errors.content.message as string}
            />
          )}
        </div>
      </div>

      <div className="w-full px-2 mx-auto md:w-1/3 space-y-4">
        <div>
          <MultiselectController
            label="Category"
            placeholder="Search Category"
            name="category"
            control={control}
            options={postCategories}
          />
          {errors.category && (
            <FormErrorStrip
              className="mt-1"
              errorMessage={errors.category.message as string}
            />
          )}
        </div>

        <div>
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("featuredImage", {
              required: { value: !post, message: "Featured image is required" },
            })}
          />
          {errors.featuredImage && (
            <FormErrorStrip
              className="my-1"
              errorMessage={errors.featuredImage.message as string}
            />
          )}
          {post && (
            <div className="w-full">
              <img
                src={`${storageService.getFilePreview(post.featuredImage)}`}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <Select
            options={["public", "private"]}
            label="Status"
            {...register("status", {
              required: { value: true, message: "Status is required" },
            })}
          />
          {errors.status && (
            <FormErrorStrip
              className="mt-1"
              errorMessage={errors.status.message as string}
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting || isLoading}
        >
          {post
            ? isSubmitting || isLoading
              ? "Updating..."
              : "Update"
            : isSubmitting || isLoading
            ? "Submitting..."
            : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
