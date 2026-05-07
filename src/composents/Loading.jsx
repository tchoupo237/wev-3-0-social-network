import React from "react";

export default function Loading() {
  return (
    <section>
      <div className="max-w-2xl mx-auto  mt-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 animate-pulse">
          {/* 1. Header du Post (Avatar, Nom, Date) */}
          <div className="flex items-center gap-3 mb-4">
            {/* Simule l'avatar (cercle gris) */}
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>

            <div className="flex-1 space-y-2">
              {/* Simule le nom d'utilisateur */}
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              {/* Simule la date */}
              <div className="h-3 bg-gray-200 rounded w-1/5"></div>
            </div>

            {/* Simule les trois points d'option (...) */}
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>

          {/* 2. Contenu du Post (Lignes de texte) */}
          <div className="space-y-2 mb-4">
            {/* Simule les différentes lignes de texte */}
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* 3. Footer du Post (Actions: Like, Comment, Share) */}
          <div className="flex items-center justify-around border-t border-gray-100 pt-3">
            {/* Simule chaque bouton d'action */}
            <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
