import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQueryClient, useQuery, QueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { Menu, User, Image as ImageIcon, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../composents/Navbar";
import AjouterPublication from "../../composents/AjouterPublication";
import Poste from "../../composents/Poste";
import Loading from "../../composents/Loading";

const Accueil = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  // protection de mes route dashboard et les autres route qui sont sensible a l'authentification avec jsonparse pour convertir la string en objet et verifier si il y a un utilisateur dans le localstorage
  useEffect(() => {
    const user = localStorage.getItem("Utilisateurs");
    if (!user) {
      console.log("Aucun utilisateur connecté.");
      navigate("/connexion"); // Redirige vers la page de connexion si aucun utilisateur n'est trouvé
      return;
    } else {
      console.log("Utilisateur connecté :", JSON.parse(user));
    }
  }, [navigate]);

  // requet avec react query pour afficher les publications
  const queryClient = useQueryClient();
  const {
    data: publications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:5000/publications").then((res) => {
        setPosts(res.data);
        return res.data;
      }),
    onerror: (err) => {
      console.error("Erreur lors du chargement des publications :", err);
      toast.error(
        "Une erreur s'est produite lors du chargement des publications",
      );
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  // fonction pour trier les publications par date de publication, les plus récentes en premier
  let pubTrier = publications.sort(
    (a, b) => new Date(b.datePublication) - new Date(a.datePublication),
  );
  console.log("voila les donner de la requete avec react query", publications);

  return (
    <div className="min-h-screen bg-[#e9ecef] font-sans pb-10">
      <Toaster position="top-center" />

      <Navbar />

      <main className="max-w-2xl mx-auto mt-6 px-4">
        <AjouterPublication />
        {pubTrier.length === 0 && (
          <h1 className="text-center text-gray-500">
            Aucune publication trouver...
          </h1>
        )}
        <div className="space-y-6">
          {posts ? (
            pubTrier.map((post) => <Poste key={post.id} data={post} />)
          ) : (
            <h1 className="text-center text-gray-500">
              Aucune publication trouver...
            </h1>
          )}
        </div>
      </main>
    </div>
  );
};

export default Accueil;
