import React, { useEffect, useState } from "react";
import { IPosts } from "../../types/collections";
import { useAppSelector } from "../../hooks/useStore";
import databaseService from "../../services/appwrite/database";
import { Query } from "appwrite";
import { Button, Loader, PageContainer } from "../../components/ui";
import { Link } from "react-router-dom";
import { PostCard } from "../../components";

type PostSectionProps = {
  title: string;
  posts: IPosts[];
  isLoading: boolean;
  error: string | null;
  messageIfEmpty: React.ReactNode;
  className?: string;
};
const PostSection: React.FC<PostSectionProps> = ({
  error,
  isLoading,
  posts,
  title,
  messageIfEmpty,
  className,
}) => {
  const PostSectionContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <div
        className={`${
          className ? className : ""
        } rounded-md border border-card shadow-md flex flex-col`}
      >
        <h1 className="w-full text-2xl font-bold border border-card p-2">
          {title}
        </h1>

        {children}
      </div>
    );
  };

  if (isLoading) {
    return (
      <PostSectionContainer>
        <div className="h-80 flex items-center">
          <Loader size="extraLarge" />
        </div>
      </PostSectionContainer>
    );
  }

  if (error) {
    return (
      <PostSectionContainer>
        <div className="h-80 flex items-center">
          <p className="text-center w-full">{error}</p>
        </div>
      </PostSectionContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <PostSectionContainer>
        <div className="h-80 flex items-center">{messageIfEmpty}</div>
      </PostSectionContainer>
    );
  }

  return (
    <PostSectionContainer>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 p-8 justify-items-center min-h-80">
        {posts.map((post) => (
          <PostCard
            key={post.$id}
            id={post.$id}
            title={post.title}
            featuredImage={post.featuredImage}
          />
        ))}
      </div>
    </PostSectionContainer>
  );
};

const MyPosts: React.FC = () => {
  const [allPosts, setAllPosts] = useState<IPosts[]>([]);
  const [inactivePosts, setInactivePosts] = useState<IPosts[]>([]);

  const [allPostsLoading, setAllPostsLoading] = useState<boolean>(true);
  const [inactivePostsLoading, setInactivePostsLoading] =
    useState<boolean>(true);

  const [allPostsError, setAllPostsError] = useState<string | null>(null);
  const [inactivePostsError, setInactivePostsError] = useState<string | null>(
    null
  );

  const { isAuthenticated, userData } = useAppSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    const fetchAllPosts = async (userId: string) => {
      try {
        setAllPostsLoading(true);

        const posts = await databaseService.getAllPosts([
          Query.equal("userId", userId),
          Query.orderDesc("$updatedAt"),
        ]);

        if (posts) {
          setAllPosts(posts.documents as unknown as IPosts[]);

          setAllPostsError(null);
        } else {
          setAllPosts([]);
          setAllPostsError(
            "Failed to fetch All Posts Data! Please refresh this page."
          );
        }
      } catch (error: any) {
        setAllPosts([]);
        setAllPostsError(
          "Failed to fetch All Posts Data! Please refresh this page."
        );
      } finally {
        setAllPostsLoading(false);
      }
    };

    if (isAuthenticated && userData?.$id) {
      fetchAllPosts(userData.$id);
    }
  }, [isAuthenticated, userData?.$id]);

  useEffect(() => {
    const fetchAllPosts = async (userId: string) => {
      try {
        setInactivePostsLoading(true);

        const posts = await databaseService.getAllPosts([
          Query.equal("userId", userId),
          Query.equal("status", "inactive"),
          Query.orderDesc("$updatedAt"),
        ]);

        if (posts) {
          setInactivePosts(posts.documents as unknown as IPosts[]);

          setInactivePostsError(null);
        } else {
          setInactivePosts([]);
          setInactivePostsError(
            "Failed to fetch All Inactive Posts Data! Please refresh this page."
          );
        }
      } catch (error: any) {
        setInactivePosts([]);
        setInactivePostsError(
          "Failed to fetch All Inactive Posts Data! Please refresh this page."
        );
      } finally {
        setInactivePostsLoading(false);
      }
    };

    if (isAuthenticated && userData?.$id) {
      fetchAllPosts(userData.$id);
    }
  }, [isAuthenticated, userData]);

  return (
    <PageContainer>
      <PostSection
        title="All Posts"
        error={allPostsError}
        isLoading={allPostsLoading}
        posts={allPosts}
        messageIfEmpty={
          <p className="w-full text-center text-xl">
            You have not created any post yet.
            <br />
            Click
            <Link to={"/post/new"}>
              <Button
                className="hover:shadow-none font-semibold"
                variant="link"
              >
                here
              </Button>
            </Link>
            to create your first Post.
          </p>
        }
      />

      <PostSection
        className="mt-20"
        title="Private Posts"
        error={inactivePostsError}
        isLoading={inactivePostsLoading}
        posts={inactivePosts}
        messageIfEmpty={
          <p className="w-full text-center text-xl">
            All Posts whose status is <strong>Inactive</strong> appears here.
            <br />
            All your posts are currently <strong>Public</strong>.
            <br />
            Click
            <Link to={"/post/new"}>
              <Button
                className="hover:shadow-none font-semibold"
                variant="link"
              >
                here
              </Button>
            </Link>
            to create a new Post.
          </p>
        }
      />
    </PageContainer>
  );
};

export default MyPosts;
