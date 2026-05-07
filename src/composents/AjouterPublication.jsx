import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Menu, User, Image as ImageIcon, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AjouterPublication() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:5000/publications", pub);
    },
    onError: (err) => {
      toast.error("Une erreur s'est produite lors de la publication");
      console.error("Erreur lors de la publication :", err);
    },
    onSuccess: () => {
      toast.success("Publication ajoutée avec succès !");
      reset(); // Réinitialise le formulaire après une publication réussie
      queryClient.invalidateQueries(["publications"]); // Invalide la requête pour forcer un rafraîchissement des données
    },
  });

  const onSubmit = (data) => {
    const nouvellesPublications = {
      ...data,
      idUtilisateur:
        JSON.parse(localStorage.getItem("Utilisateurs"))?.id || null,
      auteur:
        JSON.parse(localStorage.getItem("Utilisateurs"))?.nom || "Anonyme",
      datePublication: new Date().toISOString(), // On garde le format ISO ici
      likes: 0, // Petit bonus pour plus tard
    };
    mutation.mutate(nouvellesPublications); // Met à jour la liste des publications dans le cache de React Query
  };
  const labelBaseStyle =
    "absolute left-3 -top-2.5 px-1 bg-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm cursor-text";

  return (
    <section className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
        Ajouter une publication
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-6"
      >
        {/* Champ Contenu (Textarea) */}
        <div className="relative">
          <textarea
            {...register("contenu", { required: "Dites quelque chose..." })}
            placeholder=" "
            rows="3"
            className={`peer w-full px-3 py-3 border rounded-md outline-none focus:ring-1 resize-none ${
              errors.contenu
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
            }`}
          ></textarea>
          <label
            className={`${labelBaseStyle} ${errors.contenu ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}`}
          >
            Parlez-nous de votre journée
          </label>
          {errors.contenu && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.contenu.message}
            </span>
          )}
        </div>

        {/* Champ URL Image */}
        <div className="relative">
          <input
            {...register("imageUrl")}
            type="text"
            placeholder=" "
            className="peer w-full px-3 py-3 border border-gray-300 rounded-md outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          <label className={labelBaseStyle}>Saisir l'url de votre image</label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold py-2.5 rounded shadow transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-2"
        >
          Publier
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}
