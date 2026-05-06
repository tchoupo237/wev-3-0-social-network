import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Inscription = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
    } else {
      // verier qu'il y a pas deja un utilisateur avec le meme email dans la base de donner
      axios
        .get(`http://localhost:5000/Utilisateurs?email=${data.email}`)
        .then((res) => {
          if (res.data.length > 0) {
            toast.error("Un utilisateur avec cet email existe déjà.");
          } else {
            // insertion de l'utilisateur dans la base de donner
            axios
              .post("http://localhost:5000/Utilisateurs", data)
              .then((res) => {
                console.log("Utilisateur ajouté :", res.data);
                navigate("/connexion");
                toast.success("Inscription réussie !");
              })
              .catch((err) => {
                console.error("Erreur lors de l'inscription :", err);
                toast.error("Une erreur est survenue. Veuillez réessayer.");
              });
          }
        });
    }
    // console.log("Données d'inscription :", data);
  };

  const inputContainerStyle = "relative mt-6";
  const labelBaseStyle =
    "absolute left-3 -top-2.5 px-1 bg-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm cursor-text";

  const password = watch("password");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center uppercase tracking-tight">
          Inscription
        </h1>

        {/* autoComplete="off" ici bloque l'autocomplétion pour tout le formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="" autoComplete="off">
          {/* Champ Nom */}
          <div className={inputContainerStyle}>
            <input
              {...register("nom", {
                required: "Le nom est requis",
                minLength: {
                  value: 2,
                  message: "Votre nom doit contenir au moins 2 caractères",
                },
              })}
              type="text"
              placeholder=" "
              id="nom"
              autoComplete="off"
              className={`peer w-full px-3 py-3 border rounded-md outline-none focus:ring-1 ${
                errors.nom
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            <label
              htmlFor="nom"
              className={`${labelBaseStyle} ${errors.nom ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}`}
            >
              Nom
            </label>
            {errors.nom && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.nom.message}
              </span>
            )}
          </div>

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
                minLength: { value: 6, message: "Minimum 6 caractères" },
              })}
              type="password"
              placeholder=" "
              id="password"
              autoComplete="new-password"
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

          {/* Champ Confirmation */}
          <div className={inputContainerStyle}>
            <input
              {...register("confirmPassword", {
                required: "Veuillez confirmer votre mot de passe",
                validate: (value) =>
                  value === password ||
                  "Les mots de passe ne sont pas identiques",
              })}
              type="password"
              placeholder=" "
              id="confirmPassword"
              autoComplete="new-password"
              className={`peer w-full px-3 py-3 border rounded-md outline-none focus:ring-1 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            <label
              htmlFor="confirmPassword"
              className={`${labelBaseStyle} ${errors.confirmPassword ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}`}
            >
              Confirmer mot de passe
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-semibold py-3 px-4 rounded shadow-md transition-colors mt-8 uppercase tracking-wide text-sm"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
