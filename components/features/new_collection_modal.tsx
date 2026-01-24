"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import { addCollection } from "@/app/actions/addCollection";

interface NewCollectionModalProps {
  setIsAddingCollection: (value: boolean) => void;
}

const NewCollectionModal = ({
  setIsAddingCollection,
}: NewCollectionModalProps) => {
  const { user, cards, setCards } = useContext(AppContext)!;
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCollection = async () => {
    if (title && user) {
      setLoading(true);
      const result = await addCollection(user.id, title);
      setLoading(false);

      if (result.success && result.collection) {
        // Find the card it was added to
        const updatedCards = cards ? [...cards] : [];
        const cardIndex = updatedCards.findIndex(
          (c) => c.id === result.collection!.cardId,
        );

        if (cardIndex !== -1) {
          updatedCards[cardIndex].collections = [
            ...(updatedCards[cardIndex].collections || []),
            {
              ...result.collection,
              links: [],
            } as any,
          ];
        } else {
          // If a new card was created (first collection), we should probably refresh or update user
          // For now, let's just assume we need to refresh state or handle it simply
          // Ideally result would return the full updated structure if it's complex
        }

        setCards(updatedCards);
        setIsAddingCollection(false);
      } else {
        alert("Failed to create collection");
      }
    }
  };

  return (
    <div className="card p-6 border-2 border-green-200 bg-green-50/30">
      <h3 className="mb-4 font-semibold text-gray-800">Add New Collection</h3>
      <div className="space-y-4">
        <div className="input-group">
          <label className="input-label">Collection Title</label>
          <input
            type="text"
            placeholder="My Socials, Work Projects, etc."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleAddCollection()}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setIsAddingCollection(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleAddCollection}
            disabled={!title || loading}
            className="px-4 py-2 text-sm font-semibold bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Adding..." : "Add Collection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCollectionModal;
