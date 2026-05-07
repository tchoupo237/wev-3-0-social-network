import React from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function PostFooter() {
  return (
    <div className="border-t border-gray-200 mt-3">
      {/* Zone des boutons d'actions */}
      <div className="flex items-center justify-between px-1 py-1 border-t border-gray-100">
        {/* Bouton Like */}
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors group">
          <ThumbsUp
            size={20}
            className="group-active:scale-125 transition-transform"
          />
          <span>J'aime</span>
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
