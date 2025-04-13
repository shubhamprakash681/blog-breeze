import React, { useEffect, useState } from "react";
import { Button, Loader, PageContainer } from "../components/ui";
import { PostCategory } from "../types/collections";
import {
  FiCode,
  FiCoffee,
  FiBookOpen,
  FiBriefcase,
  FiCamera,
} from "react-icons/fi";
import { LuUtensils } from "react-icons/lu";
import { Link } from "react-router";
import { Query } from "appwrite";
import databaseService from "../services/appwrite/database";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { loadRecentPosts } from "../features/postSlice";
import { PostCard } from "../components";

type categoriesData = {
  icon: React.ReactNode;
  name: PostCategory;
  link: string;
};
const categoriesData: categoriesData[] = [
  {
    icon: <FiCode className="h-6 w-6" />,
    name: "technology",
    link: "/posts?category=technology",
  },
  {
    icon: <FiCoffee className="h-6 w-6" />,
    name: "lifestyle",
    link: "/posts?category=lifestyle",
  },
  {
    icon: <FiBookOpen className="h-6 w-6" />,
    name: "education",
    link: "/posts?category=education",
  },
  {
    icon: <FiBriefcase className="h-6 w-6" />,
    name: "business",
    link: "/posts?category=business",
  },
  {
    icon: <FiCamera className="h-6 w-6" />,
    name: "photography",
    link: "/posts?category=photography",
  },
  {
    icon: <LuUtensils className="h-6 w-6" />,
    name: "food",
    link: "/posts?category=food",
  },
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { recentPosts } = useAppSelector((state) => state.postReducer);

  const [recentPostsLoading, setRecentPostsLoading] = useState<boolean>(true);
  const [recentPostsError, setRecentPostsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setRecentPostsLoading(true);

      const postQuery: string[] = [
        Query.equal("status", "public"),
        Query.limit(24),
        Query.offset(0),
        Query.orderDesc("$updatedAt"),
      ];

      const posts = await databaseService.getAllPosts(postQuery);

      if (posts) {
        dispatch(loadRecentPosts(posts.documents));
        setRecentPostsError(null);
      } else {
        setRecentPostsError(
          "Failed to load Recent Posts. Please refresh this page"
        );
      }

      setRecentPostsLoading(false);
    };

    fetchRecentPosts();
  }, []);

  return (
    <PageContainer className="min-w-[400px]">
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-24 xl:py-32 hero-pattern">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-10 text-center">
              {/* Main Heading */}
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient prevent-select">
                  Discover Ideas, Stories & Expertise
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join our community of writers and readers sharing knowledge,
                  inspiration, and perspectives on topics that matter to you.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link to="/my-posts">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-105">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Featured Categories */}
              <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-6">
                  Explore Popular Categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {categoriesData.map((category) => (
                    <Link
                      to={category.link}
                      key={`category-section-${category.name}`}
                      className="flex flex-col items-center p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors duration-300 border border-border"
                    >
                      <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                        {category.icon}
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="w-full py-6 md:py-12 lg:py-24">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent animate-gradient prevent-select">
              Recent Posts
            </h2>
            {recentPosts.length ? (
              <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-items-center gap-4">
                {recentPosts.map((post) => (
                  <PostCard
                    key={`recent-post-${post.$id}`}
                    id={post.$id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                  />
                ))}
              </div>
            ) : recentPostsLoading ? (
              <div className="h-24 flex items-center justify-center">
                <Loader size="extraLarge" />
              </div>
            ) : (
              recentPostsError && (
                <div className="h-24 flex items-center justify-center">
                  <p>{recentPostsError}</p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </PageContainer>
  );
};

export default Home;
