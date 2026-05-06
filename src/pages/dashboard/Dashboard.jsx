import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Menu, User, Image as ImageIcon, Send } from "lucide-react";

const Accueil = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Nouvelle publication :", data);
    toast.success("Publication mise en ligne !");
    reset(); // Vide le formulaire après envoi
  };

  // Simulation de données (en attendant JSON Server)
  const posts = [
    {
      id: 1,
      auteur: "tacite",
      contenu: "Hey les etudiants",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const labelBaseStyle =
    "absolute left-3 -top-2.5 px-1 bg-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm cursor-text";

  return (
    <div className="min-h-screen bg-[#e9ecef] font-sans pb-10">
      <Toaster position="top-center" />

      {/* --- HEADER --- */}
      <header className="bg-[#1976d2] text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Menu className="cursor-pointer" />
          <h1 className="text-xl font-medium tracking-wide">
            Drcmind social network
          </h1>
        </div>
        <div className="bg-white/20 p-2 rounded-full cursor-pointer">
          <User size={20} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto mt-6 px-4">
        {/* --- FORMULAIRE D'AJOUT --- */}
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
              <label className={labelBaseStyle}>
                Saisir l'url de votre image
              </label>
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

        {/* --- FLUX DES PUBLICATIONS --- */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="bg-gray-200 p-2 rounded-full text-gray-500">
                  <User size={24} />
                </div>
                <span className="font-semibold text-gray-700">
                  {post.auteur}
                </span>
              </div>

              <div className="px-4 pb-3 text-gray-800">{post.contenu}</div>

              <div className="px-4 pb-3 text-gray-800">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto object-cover border-t border-gray-100 rounded-lg"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Logo React en bas à gauche comme sur ta maquette */}
      <div className="fixed bottom-4 left-4 opacity-50">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          className="w-8 h-8 animate-spin-slow"
        />
      </div>
    </div>
  );
};

export default Accueil;
