import React from "react";
import { Link } from "react-router-dom";
import storageService from "../../services/appwrite/storage";

type PostCardProps = {
  id: string;
  title: string;
  featuredImage: string;
};

const PostCard: React.FC<PostCardProps> = ({ id, title, featuredImage }) => {
  return (
    <Link
      to={`/post/${id}`}
      className="min-h-96 bg-card rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="w-80 h-full px-4 py-8 flex flex-col justify-between">
        <div className="w-full mb-4">
          <img
            className="rounded-xl mx-auto"
            src={`${storageService.getFilePreview(featuredImage)}`}
            alt={title}
            width={320}
            height={320}
          />
        </div>

        <h2 className="mt-12 text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
