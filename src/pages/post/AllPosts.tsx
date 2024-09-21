import React, { useEffect, useState } from "react";
import databaseService from "../../services/appwrite/database";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { loadAllPosts } from "../../features/postSlice";
import { PostCard } from "../../components";
import { Loader, PageContainer } from "../../components/ui";
import { Query } from "appwrite";

const AllPosts: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.postReducer);
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      const posts = await databaseService.getAllPosts([
        Query.equal("status", "active"),
      ]);

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

  if (posts.length === 0) {
    return (
      <PageContainer>
        <h4 className="font-semibold my-12 text-center text-xl">All Posts</h4>

        <div style={{ height: "400px" }} className="flex items-center">
          <p className="text-center w-full">
            No public post available at this moment. Please come after some
            time!
          </p>
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-8 justify-items-center">
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default AllPosts;
