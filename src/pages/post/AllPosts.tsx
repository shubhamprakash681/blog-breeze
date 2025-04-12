import React, { useEffect, useState } from "react";
import databaseService from "../../services/appwrite/database";
import { useAppSelector } from "../../hooks/useStore";
import { PostCard } from "../../components";
import { Button, Loader, PageContainer } from "../../components/ui";
import { Query } from "appwrite";
import { useLocation } from "react-router";
import useInfiniteFetch from "../../hooks/useInfiniteFetch";

const AllPosts: React.FC = () => {
  const location = useLocation();

  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  const [baseQuery, setBaseQuery] = useState<string[]>([]);
  const {
    data: posts,
    error,
    isLoading,
    refreshData,
    loaderRef,
  } = useInfiniteFetch(baseQuery, databaseService.getAllPosts, 10);

  useEffect(() => {
    const formatBaseQuery = (category?: string) => {
      const postQuery: string[] = [
        Query.equal("status", "public"),
        Query.orderDesc("$updatedAt"),
      ];

      if (category) {
        postQuery.push(Query.contains("category", category));
      }

      setBaseQuery(postQuery);
    };

    if (isAuthenticated) {
      const searchQuery = location.search;
      if (searchQuery) {
        const category = searchQuery.slice(1).split("=")[1];
        formatBaseQuery(category);
      } else {
        formatBaseQuery();
      }
    }
  }, [isAuthenticated, location.search]);

  return (
    <PageContainer className="min-w-[375px]">
      <h4 className="font-semibold my-12 text-center text-xl">All Posts</h4>

      {error ? (
        <div className="h-full min-h-[50vh] flex flex-col items-center justify-around gap-6">
          {error && <p className="text-red-500">{error}</p>}
          <Button variant="secondary" onClick={refreshData}>
            Refresh page
          </Button>
        </div>
      ) : (
        <>
          {posts && posts.documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-items-center gap-4">
              {posts.documents.map((post) => (
                <PostCard
                  key={post.$id}
                  id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              ))}
            </div>
          ) : (
            <div style={{ height: "400px" }} className="flex items-center">
              <p className="text-center w-full">
                No public post available under the selected categories at the
                moment.
                <br />
                Please come after some time!
              </p>
            </div>
          )}

          <div
            ref={loaderRef}
            className="flex items-center justify-around my-5"
          >
            {isLoading && <Loader size="extraLarge" />}
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default AllPosts;
