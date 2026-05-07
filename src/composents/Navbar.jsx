import React, { useState } from "react";
import { Menu, User, LogOut, UserCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // On récupère les infos de l'utilisateur pour afficher son nom dans la boîte
  const user = JSON.parse(localStorage.getItem("Utilisateurs"));

  const handleLogout = () => {
    localStorage.removeItem("Utilisateurs");
    toast.success("Déconnexion réussie");
    navigate("/connexion");
  };

  return (
    <header className="bg-[#1976d2] text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Menu className="cursor-pointer" />
        <h1 className="text-2xl font-medium tracking-wide select-none">
          Web 3.0 social network
        </h1>
      </div>

      {/* Conteneur relatif pour positionner la boîte en dessous */}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-full cursor-pointer transition-all ${
            isOpen
              ? "bg-white/40 shadow-inner"
              : "bg-white/20 hover:bg-white/30"
          }`}
        >
          <User size={20} />
        </div>

        {/* --- LA BOITE (DROPDOWN MENU) --- */}
        {isOpen && (
          <>
            {/* Cet écran invisible permet de fermer la boîte en cliquant n'importe où ailleurs */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-150">
              {/* Détails du profil */}
              <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[10px] text-gray-800 uppercase font-bold tracking-widest">
                  Connecté en tant que :
                  <span className="text-sm font-bold text-gray-800 truncate">
                    {" " + user?.nom || "Utilisateur"}
                  </span>
                </p>
                {/* <p className="text-xs text-gray-500 truncate">{user?.email}</p> */}
              </div>

              {/* Options */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profil");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                >
                  <UserCircle
                    size={18}
                    className="text-gray-400 group-hover:text-blue-600"
                  />
                  Voir mon profil
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                >
                  <Settings
                    size={18}
                    className="text-gray-400 group-hover:text-blue-600"
                  />
                  Paramètres
                </button>
              </div>

              <div className="h-px bg-gray-100 my-1 mx-2"></div>

              {/* Déconnexion */}
              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
