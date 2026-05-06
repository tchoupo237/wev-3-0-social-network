import React from "react";
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

  const onSubmit = (data) => {
    // Logique de connexion à lier à JSON Server plus tard
    console.log("Tentative de connexion :", data);
    toast.success("Content de vous revoir !");
  };

  // Constantes de style pour l'effet Material UI Outlined
  const inputContainerStyle = "relative mt-6";
  const labelBaseStyle =
    "absolute left-3 -top-2.5 px-1 bg-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm cursor-text";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-right" />

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
        <div className="mt-6 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium hover:underline"
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
