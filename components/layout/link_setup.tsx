"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app_context";
import New_Link_modal from "../features/new_Link_modal";
import { LinkType } from "@/types/types";

import {
  Plus,
  GripVertical,
  Trash2,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";

const LinkSetup = () => {
  const { links, setLinks,user } = useContext(AppContext)!;
  const [newLink, setNewLink] = useState<LinkType>({ title: "", url: "",userId:user  ? user.id  : "" });
  const [isAddingLink, setIsAddingLink] = useState(false);

  // const handleDeleteLink = (id: string) => {
  //   if (links) {
  //     setLinks(links.filter((link: LinkType) => link.id !== id));
  //   }
  // };

  // const handleToggleLink = (id: string) => {
  //   if (links) {
  //     setLinks(
  //       links.map((link: LinkType) =>
  //         link.id === id ? { ...link, active: !link.active } : link
  //       )
  //     );
  //   }
  // };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-heading font-semibold mb-2">Links</h1>
        </div>
        <button
          onClick={() => setIsAddingLink(true)}
          className="flex font-semibold items-center text-sm gap-1 bg-green-300 hover:bg-green-400 text-gray-700 h-9 w-25 rounded-md justify-center"
        >
          <Plus size={18} />
          Add Link
        </button>
      </div>

      {isAddingLink && (
        <New_Link_modal
          setIsAddingLink={setIsAddingLink}
          newLink={newLink}
          setNewLink={setNewLink}
        />
      )}

      {/* Links List */}
      {links && links.length > 0 && (
        <div className="space-y-3">
          {links.map((link: LinkType, index: number) => (
            <div
              key={index}
              className="link-card animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="link-drag-handle">
                <GripVertical size={20} className="" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold  truncate">{link.title}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm  truncate flex items-center gap-1"
                >
                  {link.url}
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="flex items-center gap-3">
                {/* <button
                  onClick={() => handleToggleLink(link.id!)}
                  className={`toggle ${link.active ? "active" : ""}`}
                  title={link.active ? "Disable link" : "Enable link"}
                />

                <button
                  onClick={() => handleDeleteLink(link.id!)}
                  className="btn btn-ghost btn-icon btn-icon-sm  hover:text-red-500 hover:bg-red-50"
                  title="Delete link"
                >
                  <Trash2 size={16} />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
      {!isAddingLink && (
        <div className="p-12 flex flex-col items-center text-center animate-fade-in">
          <LinkIcon size={40} className="" />
          <h3 className="my-3 text-xl">No links yet</h3>
          <p className=" mb-6 max-w-sm ">
            Start by adding your first link. Share your website, social media,
            or any other important links.
          </p>
          <button
            onClick={() => setIsAddingLink(true)}
            className="flex font-semibold items-center text-sm gap-1 bg-green-300 text-gray-700 h-10 w-40 rounded-md justify-center"
          >
            <Plus size={18} />
            Add Your First Link
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkSetup;
