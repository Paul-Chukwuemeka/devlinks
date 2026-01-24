"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus } from "lucide-react";
import { collectionType } from "@/types/types";

interface SortableCollectionProps {
  id: string;
  collection: collectionType;
  onAddLink: () => void;
  children: React.ReactNode;
}

export function SortableCollection({
  id,
  collection,
  onAddLink,
  children,
}: SortableCollectionProps) {
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
      className={`space-y-4 mb-10 bg-white rounded-xl border border-gray-100 p-4 transition-all ${
        isDragging
          ? "opacity-50 shadow-2xl scale-[1.02] border-green-200"
          : "shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={20} className="text-gray-400" />
          </div>
          <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800">
            {collection.title}
          </h2>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {collection.links?.length || 0} links
          </span>
        </div>

        <button
          onClick={onAddLink}
          className="p-1.5 px-3 text-xs font-bold text-green-600 hover:bg-green-50 rounded-lg flex items-center gap-1.5 transition-all border border-green-100 active:scale-95"
        >
          <Plus size={14} />
          Add Link
        </button>
      </div>

      <div className="pl-2 space-y-3">{children}</div>
    </div>
  );
}
