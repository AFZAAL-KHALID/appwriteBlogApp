import React from "react";
import { Link } from "react-router-dom";
import databaseSvcs from "../appwriteServices/database_svc";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="rounded-xl w-full bg-gray-100 p-4">
        <div className="w-full flex justify-center mb-4">
            <img src={databaseSvcs.previewFile(featuredImage)} className="rounded-xl" />
        </div>
            <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
