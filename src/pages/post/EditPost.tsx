import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../../components";
import { Loader, PageContainer } from "../../components/ui";
import { IPosts } from "../../types/collections";
import databaseService from "../../services/appwrite/database";
import { useAppSelector } from "../../hooks/useStore";
import Unauthorized from "../auth/Unauthorized";

const EditPost: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { isAuthenticated, userData } = useAppSelector(
    (state) => state.authReducer
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState<IPosts | null>(null);

  useEffect(() => {
    const fetchPostData = async (postId: string) => {
      const data = await databaseService.getPostById(postId);
      if (data) {
        const typeCastedPostData = data as unknown as IPosts;

        if (typeCastedPostData.userId === userData?.$id) {
          setPostData(typeCastedPostData);

          setError(null);
        } else {
          setError("You cannot Edit this post");
          setPostData(null);
        }
      } else {
        setError("Failed to load post data. Please refresh this page.");
        setPostData(null);
      }

      setLoading(false);
    };

    if (id) {
      if (isAuthenticated) {
        fetchPostData(id);
      }
    } else {
      navigate("/");
    }
  }, [id, isAuthenticated, userData, navigate]);

  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  if (loading) {
    return (
      <PageContainer>
        <h4 className="font-semibold my-12 text-center text-xl">Edit Post</h4>

        <div style={{ height: "400px" }} className="flex items-center">
          <Loader size="extraLarge" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <h4 className="font-semibold my-12 text-center text-xl">Edit Post</h4>

        <p className="text-center">{error}</p>
      </PageContainer>
    );
  }

  return (
    <>
      {console.log("here, postData in comp: ", postData)}
      <PageContainer>
        <h4 className="font-semibold my-12 text-center text-xl">Edit Post</h4>

        {postData && <PostForm post={postData} />}
      </PageContainer>
    </>
  );
};

export default EditPost;
