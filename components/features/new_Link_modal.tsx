import React from "react";
import { LinkType } from "@/types/types";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import { addLink } from "@/app/actions/addLink";

interface NewLinkModalProps {
  setIsAddingLink: (value: boolean) => void;
  newLink: LinkType;
  setNewLink: (link: LinkType) => void;
}

const New_Link_modal = ({
  setIsAddingLink,
  newLink,
  setNewLink,
}: NewLinkModalProps) => {
  const { setLinks, links,user } = useContext(AppContext)!;

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const link: LinkType = {
        title: newLink.title,
        userId: user!.id,
        url: newLink.url.startsWith("http")
          ? newLink.url
          : `https://${newLink.url}`,
        orderNum: links ? links.length + 1 : 1,
      };
      addLink(link,user?.id).then(() => {
        setLinks(links ? [...links, link] : [link]);
      });
      setNewLink({ title: "", url: "" , userId: ""});
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
