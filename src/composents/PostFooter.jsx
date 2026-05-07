import React from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function PostFooter({ data: post }) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    // update de la publication pour ajouter un like
    mutationFn: (id) => {
      return axios.put(`http://localhost:5000/publications/${id}`, {
        ...post,
        likes: post.likes + 1,
      });
    },
    onSuccess: () => {
      toast.success("Post liké avec succès !");
      queryClient.invalidateQueries(["publications"]); // Invalide la requête pour forcer un rafraîchissement des données
    },
    onError: (err) => {
      toast.error("Une erreur s'est produite lors du like du post");
      console.error("Erreur lors du like du post :", err);
    },
  });
  //  implementation de la fonction liker
  const likerPost = (postId) => {
    // requete pour liker le poste avec react query
    mutate.mutate(postId);
  };
  return (
    <div className="border-t border-gray-200 mt-3">
      {/* Zone des boutons d'actions */}
      <div className="flex items-center justify-between px-1 py-1 border-t border-gray-100">
        {/* Bouton Like */}
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors group">
          {/* nombrede poste liker */}
          <span className="text-gray-500">
            {post.likes === 0 ? "" : post.likes}
          </span>
          <ThumbsUp
            onClick={() => likerPost(post.id)}
            size={20}
            className={
              `group-active:scale-125 transition-transform` +
              (post.likes > 0 ? " text-blue-500" : "")
            }
          />
          <span className={post.likes > 0 ? " text-blue-500" : ""}>J'aime</span>
        </button>

        {/* Bouton Commenter */}
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
          <MessageCircle size={20} />
          <span>Commenter</span>
        </button>

        {/* Bouton Partager */}
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
          <Share2 size={20} />
          <span>Partager</span>
        </button>
      </div>
    </div>
  );
}
