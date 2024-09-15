import React from "react";
import { PostForm } from "../../components";
import { PageContainer } from "../../components/ui";

const AddPost: React.FC = () => {
  return (
    <PageContainer>
      <h4 className="font-semibold my-12 text-center text-xl">Add Post</h4>

      <PostForm />
    </PageContainer>
  );
};

export default AddPost;
