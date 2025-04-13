import React from "react";
import { Link } from "react-router";
import storageService from "../../services/appwrite/storage";
import { Image } from "../ui";

type PostCardProps = {
  id: string;
  title: string;
  featuredImage: string;
};

const PostCard: React.FC<PostCardProps> = ({ id, title, featuredImage }) => {
  return (
    <Link
      to={`/post/${id}`}
      className="w-full min-w-full h-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:shadow-gray-700/30"
    >
      <div className="w-full mb-4">
        <Image
          className="w-full object-cover aspect-video"
          loaderSize="medium"
          src={`${storageService.getFileView(featuredImage)}`}
          alt={title}
        />
      </div>

      <h2 className="p-4 mt-12 text-xl font-bold">{title}</h2>
    </Link>
  );
};

export default PostCard;
