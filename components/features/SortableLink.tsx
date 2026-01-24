"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ExternalLink } from "lucide-react";
import { LinkType } from "@/types/types";

interface SortableLinkProps {
  id: string;
  link: LinkType;
  index: number;
}

export function SortableLink({ id, link, index }: SortableLinkProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`link-card flex gap-4 items-center ${
        isDragging ? "opacity-50 cursor-grabbing shadow-lg" : "animate-fade-in"
      }`}
    >
      <div
        className="link-drag-handle cursor-grab active:cursor-grabbing p-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} className="text-gray-400" />
      </div>

      <div className="flex-1 truncate">
        <p className="font-semibold text-gray-800">{link.title}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center gap-1 text-blue-500 hover:underline"
        >
          {link.url}
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="flex items-center gap-3">
        {/* Placeholder for future actions like delete/toggle */}
      </div>
    </div>
  );
}
