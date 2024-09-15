import React from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../../components";
import { PageContainer } from "../../components/ui";

const EditPost: React.FC = () => {
  const { id } = useParams();

  console.log("here, params.id: ", id);

  return (
    <PageContainer>
      <h4 className="font-semibold my-12 text-center text-xl">Edit Post</h4>

      <PostForm />
    </PageContainer>
  );
};

export default EditPost;
