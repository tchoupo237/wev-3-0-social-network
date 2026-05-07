import React from "react";
import { MoreHorizontal, X, Globe, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function PostHeader({ data: post }) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:5000/publications/${id}`);
    },
    onSuccess: () => {
      toast.success("Post supprimé avec succès !");
      queryClient.invalidateQueries(["publications"]); // Invalide la requête pour forcer un rafraîchissement des données
    },
    onError: (err) => {
      toast.error("Une erreur s'est produite lors de la suppression du post");
      console.error("Erreur lors de la suppression du post :", err);
    },
  });

  const suprimerPost = (id) => {
    mutate.mutate(id);
  };

  //recuperer l'utilisateur connecté pour afficher le bouton de suppression du post seulement si l'utilisateur connecté est l'auteur du post
  const utilisateurConnecte = JSON.parse(localStorage.getItem("Utilisateurs"));
  return (
    <div className="flex items-center justify-between pt-3 pl-3 pr-3 ">
      {/* Avatar + Nom + Date */}
      <div className="flex items-center gap-3">
        {/* Avatar  */}
        <div className="pt-4 pl-4 pb-4 pr-1 flex items-center gap-3 cursor-pointer">
          <div className="bg-gray-200 p-2 rounded-full text-gray-500">
            <User size={24} />
          </div>
        </div>

        {/* Textes : Nom et Date */}
        <div className="flex flex-col">
          <h4 className="text-[15px] font-bold text-gray-900 leading-tight hover:underline cursor-pointer">
            {post?.auteur || "Utilisateur"}
          </h4>
          <div className="flex items-center gap-1 text-[13px] text-gray-500">
            <span>
              {post?.datePublication
                ? (() => {
                    const date = new Date(post.datePublication);
                    const secondes = Math.floor((new Date() - date) / 1000);

                    // Si ça fait moins de 30 secondes, on affiche "À l'instant"
                    if (secondes < 30) {
                      return "À l'instant";
                    }

                    // Sinon, on utilise formatDistanceToNow avec les secondes activées
                    return (
                      "il y a " +
                      formatDistanceToNow(date, {
                        addSuffix: false, // On met "il y a" à la main pour mieux contrôler
                        includeSeconds: true,
                        locale: fr,
                      })
                    );
                  })()
                : "À l'instant"}
            </span>
            <span>·</span>
            <Globe size={12} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Côté Droit : Options et Fermeture */}
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          {/* afficher le bouton de suppression du post seulement si l'utilisateur connecté est l'auteur du post */}
          {post?.auteur === utilisateurConnecte?.nom && (
            <X size={20} onClick={() => suprimerPost(post.id)} />
          )}
        </button>
      </div>
    </div>
  );
}
