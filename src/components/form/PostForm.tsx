import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IPosts } from "../../types/collections";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import storageService from "../../services/appwrite/storage";
import databaseService from "../../services/appwrite/database";
import { Button, Input, RTE, Select } from "../ui";

type IPostForm = {
  post?: IPosts;
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
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      status: post?.status || false,
      userId: post?.userId || "",
    },
  });

  const submitHandler = async (data: any) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
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
      const uploadedFile = await storageService.uploadFile(data.image[0]);

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
          .replace(/^[a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
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
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
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
      <div className="w-1/3 px-2">
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
          {...register("status", { required: true })}
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
