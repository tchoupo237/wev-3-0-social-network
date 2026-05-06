import axios from "axios";
import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // protection de mes route dashboard et les autres route qui sont sensible a l'authentification avec jsonparse pour convertir la string en objet et verifier si il y a un utilisateur dans le localstorage
  useEffect(() => {
    const user = localStorage.getItem("Utilisateurs");
    if (!user) {
      console.log("Aucun utilisateur connecté.");
    } else {
      console.log("Utilisateur connecté :", JSON.parse(user));
      navigate("/"); // Redirige vers le dashboard ou la page d'accueil si un utilisateur est déjà connecté
      return; // Empêche le rendu de la page de connexion si un utilisateur est déjà connecté
      toast.info("Vous êtes déjà connecté. Redirection en cours...");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const url = `http://localhost:5000/Utilisateurs?email=${data.email.toLowerCase().trim()}`;

      const response = await axios.get(url);

      // On vérification si l'utilisateur existe
      if (response.data && response.data.length > 0) {
        const userTrouve = response.data[0];

        // Comparaison du mot de passe
        if (userTrouve.password === data.password) {
          toast.success(`Bienvenue, ${userTrouve.nom} !`);
          // Stockage des infos (sauf le mot de passe par sécurité)
          const { password, ...userSession } = userTrouve;
          localStorage.setItem("Utilisateurs", JSON.stringify(userSession));
          navigate("/"); // Redirection vers le dashboard ou la page d'accueil
        } else {
          toast.error("Mot de passe incorrect.");
        }
      } else {
        toast.error("Cet email n'existe pas dans la base.");
      }
    } catch (error) {
      console.error("Erreur technique :", error);
      // LOGIQUE DE DÉTECTION DU SERVEUR ÉTEINT OU INJOIGNABLE
      if (!error.response) {
        // Pas de réponse = le serveur n'a même pas pu être contacté (éteint)
        toast.error(
          "Serveur injoignable ! Lancez 'npm run server' dans votre terminal.",
          {
            duration: 6000,
            icon: "🔌",
            style: { border: "2px solid #ef4444", fontWeight: "bold" },
          },
        );
      } else {
        // Le serveur a répondu mais avec une erreur (ex: 404, 500)
        toast.error("Erreur de connexion au service. Veuillez réessayer.");
      }
    }
  };

  // Constantes de style pour l'effet Material UI Outlined
  const inputContainerStyle = "relative mt-6";
  const labelBaseStyle =
    "absolute left-3 -top-2.5 px-1 bg-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm cursor-text";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-center" />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center uppercase tracking-tight">
          Connexion
        </h1>

        {/* autoComplete="off" bloque les suggestions automatiques du navigateur */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
          autoComplete="off"
        >
          {/* Champ Email */}
          <div className={inputContainerStyle}>
            <input
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Format d'email invalide",
                },
              })}
              type="email"
              placeholder=" "
              id="email"
              autoComplete="off"
              className={`peer w-full px-3 py-3 border rounded-md outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            <label
              htmlFor="email"
              className={`${labelBaseStyle} ${errors.email ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}`}
            >
              Email
            </label>
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className={inputContainerStyle}>
            <input
              {...register("password", {
                required: "Le mot de passe est requis",
              })}
              type="password"
              placeholder=" "
              id="password"
              autoComplete="current-password"
              className={`peer w-full px-3 py-3 border rounded-md outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            <label
              htmlFor="password"
              className={`${labelBaseStyle} ${errors.password ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}`}
            >
              Mot de passe
            </label>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-semibold py-3 px-4 rounded shadow-md transition-colors mt-8 uppercase tracking-wide text-sm"
          >
            Se connecter
          </button>
        </form>

        {/* Lien vers l'inscription */}
        <div className="mt-6 text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <span
            className="text-[#1976d2] cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/inscription")}
          >
            S'inscrire
          </span>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
