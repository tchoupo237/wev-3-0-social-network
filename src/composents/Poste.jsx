import { User } from "lucide-react";
import React from "react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function Poste({ data: post }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <PostHeader data={post} post={post.id} />
      <p className="px-8 py-1 text-gray-800">{post.contenu}</p>
      <div className="px-4 pb-3 text-gray-800">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full h-auto object-cover border-t border-gray-100 rounded-lg"
          />
        )}
      </div>
      <PostFooter />
    </article>
  );
}
