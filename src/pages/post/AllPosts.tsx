import React, { useEffect, useState } from "react";
import databaseService from "../../services/appwrite/database";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { loadAllPosts } from "../../features/postSlice";
import { PostCard } from "../../components";
import { Loader, PageContainer } from "../../components/ui";
import Unauthorized from "../auth/Unauthorized";

const AllPosts: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.postReducer);
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const posts = await databaseService.getAllPosts([]);

      if (posts) {
        dispatch(loadAllPosts(posts.documents));
        setError(null);
      } else {
        setError("Failed to load Posts. Please refresh this page");
      }

      setLoading(false);
    };

    if (isAuthenticated) {
      fetchAllPosts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  if (loading) {
    return (
      <PageContainer>
        <h4 className="font-semibold my-12 text-center text-xl">All Posts</h4>

        <div style={{ height: "400px" }} className="flex items-center">
          <Loader size="extraLarge" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h4 className="font-semibold my-12 text-center text-xl">All Posts</h4>

      {error ? (
        <p className="text-center">{error}</p>
      ) : (
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.slug} className="p-2 w-24">
              <PostCard
                id={post.slug}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default AllPosts;
