import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

const Footer: React.FC = () => {
  const platformName = "Blog Breeze";
  const currentYear = new Date().getFullYear();

  const location = useLocation();
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const searchQuery = location.search;

    if (searchQuery) {
      setCategory(searchQuery.slice(1).split("=")[1]);
    } else {
      setCategory(null);
    }
  }, [location.search]);

  return (
    <footer className="border-t border-border py-8 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">About {platformName}</h3>
            <p className="text-sm text-muted-foreground">
              {platformName} is a personal portfolio project showcasing a modern
              blog-sharing platform. Discover Ideas, Stories & Expertise.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Link
                to="/posts?category=technology"
                className={`hover:text-primary ${
                  category === "technology" && "text-primary"
                }`}
              >
                Technology
              </Link>
              <Link
                to="/posts?category=lifestyle"
                className={`hover:text-primary ${
                  category === "lifestyle" && "text-primary"
                }`}
              >
                Lifestyle
              </Link>
              <Link
                to="/posts?category=education"
                className={`hover:text-primary ${
                  category === "education" && "text-primary"
                }`}
              >
                Education
              </Link>
              <Link
                to="/posts?category=business"
                className={`hover:text-primary ${
                  category === "business" && "text-primary"
                }`}
              >
                Business
              </Link>
              <Link
                to="/posts?category=photography"
                className={`hover:text-primary ${
                  category === "photography" && "text-primary"
                }`}
              >
                Photography
              </Link>
              <Link
                to="/posts?category=food"
                className={`hover:text-primary ${
                  category === "food" && "text-primary"
                }`}
              >
                Food
              </Link>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <Link
                to="https://github.com/shubhamprakash681"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaGithub size="20px" />
              </Link>
              <Link
                to="https://linkedin.com/in/shubhamprakash681"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaLinkedin size="20px" />
              </Link>
              {/* <Link
          to="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary"
        >
          <FaTwitter size="20px" />
        </Link> */}
              <Link
                to="https://youtube.com/@shubhamprakash5520"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaYoutube size="20px" />
              </Link>
              <Link
                to="mailto:shubhamprakash681@gmail.com"
                className="text-muted-foreground hover:text-primary"
              >
                <IoMail size="20px" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border my-6" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Made with <CiHeart size="20px" className="inline text-red-500" /> by{" "}
            <Link
              to={"https://github.com/shubhamprakash681"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Shubham Prakash
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {currentYear} {platformName}. A personal portfolio project. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
