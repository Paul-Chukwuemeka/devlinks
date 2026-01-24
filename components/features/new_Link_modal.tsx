import React from "react";
import { LinkType } from "@/types/types";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import { addLink } from "@/app/actions/addLink";

interface NewLinkModalProps {
  setIsAddingLink: (value: boolean) => void;
  newLink: LinkType;
  setNewLink: (link: LinkType) => void;
  collectionId?: string;
}

const New_Link_modal = ({
  setIsAddingLink,
  newLink,
  setNewLink,
  collectionId,
}: NewLinkModalProps) => {
  const { setLinks, links, user, cards, setCards } = useContext(AppContext)!;

  const handleAddLink = async () => {
    if (newLink.title && newLink.url && user) {
      const link: LinkType = {
        title: newLink.title,
        userId: user.id,
        url: newLink.url.startsWith("http")
          ? newLink.url
          : `https://${newLink.url}`,
        collectionId: collectionId ?? null,
      };

      // Calculate orderNum based on target location
      if (collectionId) {
        // Find existing links in this collection to get next orderNum
        const card = cards?.find((c) =>
          c.collections.some((col) => col.id === collectionId),
        );
        const collection = card?.collections.find(
          (col) => col.id === collectionId,
        );
        link.orderNum = (collection?.links?.length || 0) + 1;
      } else {
        link.orderNum = (links?.length || 0) + 1;
      }

      const res = await addLink(link, user.id, collectionId);

      if (res) {
        const savedLink = res as LinkType;
        if (collectionId) {
          // Update cards state
          const updatedCards = cards ? [...cards] : [];
          for (const card of updatedCards) {
            const col = card.collections.find((c) => c.id === collectionId);
            if (col) {
              col.links = [...(col.links || []), savedLink];
              break;
            }
          }
          setCards(updatedCards);
        } else {
          // Update direct links state
          setLinks(links ? [...links, savedLink] : [savedLink]);
        }
      }

      setNewLink({ title: "", url: "", userId: "" });
      setIsAddingLink(false);
    }
  };

  return (
    <div className="card p-6  border-2">
      <h3 className="  mb-4">Add New Link</h3>
      <div className="space-y-4">
        <div className="input-group">
          <label className="input-label">Title</label>
          <input
            type="text"
            placeholder="My Website"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="input"
            autoFocus
          />
        </div>
        <div className="input-group">
          <label className="input-label">URL</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="input"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              setIsAddingLink(false);
              setNewLink({ title: "", url: "", userId: "" });
            }}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={handleAddLink}
            disabled={!newLink.title || !newLink.url}
            className="btn btn-primary"
          >
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default New_Link_modal;
