"use client";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "@/contexts/app_context";
import New_Link_modal from "../features/new_Link_modal";
import NewCollectionModal from "../features/new_collection_modal";
import { LinkType, cardType, collectionType } from "@/types/types";
import { SortableLink } from "../features/SortableLink";
import { SortableCollection } from "../features/SortableCollection";
import { reorderDashboard, ReorderItem } from "@/app/actions/reorderDashboard";
import { reorderCollectionLinks } from "@/app/actions/reorderCollectionLinks";

import { Plus, Link as LinkIcon, FolderPlus } from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const LinkSetup = () => {
  const { links, setLinks, cards, setCards, user } = useContext(AppContext)!;
  const [newLink, setNewLink] = useState<LinkType>({
    title: "",
    url: "",
    userId: user ? user.id : "",
  });
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<
    string | undefined
  >(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const unifiedItems = useMemo(() => {
    const collections = cards?.[0]?.collections || [];
    const directLinks = links || [];

    const items = [
      ...collections.map((c) => ({
        id: c.id,
        type: "collection" as const,
        data: c,
        orderNum: c.orderNum,
      })),
      ...directLinks.map((l) => ({
        id: l.id!,
        type: "link" as const,
        data: l,
        orderNum: l.orderNum || 0,
      })),
    ];

    return items.sort((a, b) => (a.orderNum ?? 0) - (b.orderNum ?? 0));
  }, [cards, links]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeItem = unifiedItems.find((i) => i.id === active.id);
    const overItem = unifiedItems.find((i) => i.id === over.id);

    if (activeItem && overItem) {
      const oldIndex = unifiedItems.findIndex((i) => i.id === active.id);
      const newIndex = unifiedItems.findIndex((i) => i.id === over.id);

      const newUnified = arrayMove(unifiedItems, oldIndex, newIndex);

      const newCollections: collectionType[] = [];
      const newDirectLinks: LinkType[] = [];
      const dbPayload: ReorderItem[] = [];

      newUnified.forEach((item, idx) => {
        dbPayload.push({ id: item.id, type: item.type });
        if (item.type === "collection") {
          newCollections.push({
            ...(item.data as collectionType),
            orderNum: idx,
          });
        } else {
          newDirectLinks.push({ ...(item.data as LinkType), orderNum: idx });
        }
      });

      setLinks(newDirectLinks);
      if (cards && cards[0]) {
        const updatedCards = [...cards];
        updatedCards[0] = { ...updatedCards[0], collections: newCollections };
        setCards(updatedCards);
      }

      const result = await reorderDashboard(dbPayload);
      if (!result.success) {
        alert("Syncing failed. Refreshing...");
        window.location.reload();
      }
    } else {
      let targetCollectionId: string | null = null;
      let collectionLinks: LinkType[] = [];

      for (const card of cards || []) {
        for (const col of card.collections || []) {
          if (col.links?.some((l) => l.id === active.id)) {
            targetCollectionId = col.id;
            collectionLinks = [...(col.links || [])];
            break;
          }
        }
        if (targetCollectionId) break;
      }

      if (targetCollectionId && collectionLinks.length > 0) {
        const oldIndex = collectionLinks.findIndex((l) => l.id === active.id);
        const newIndex = collectionLinks.findIndex((l) => l.id === over.id);

        if (newIndex !== -1) {
          const newLinks = arrayMove(collectionLinks, oldIndex, newIndex);

          const updatedCards = cards ? [...cards] : [];
          for (const card of updatedCards) {
            const col = card.collections.find(
              (c) => c.id === targetCollectionId,
            );
            if (col) {
              col.links = newLinks;
              break;
            }
          }
          setCards(updatedCards);

          const result = await reorderCollectionLinks(
            targetCollectionId,
            newLinks.map((l) => l.id!),
          );
          if (!result.success) {
            alert("Failed to save group order.");
          }
        }
      }
    }
  };

  const linkIds = useMemo(() => {
    return links ? links.map((link) => link.id || link.url) : [];
  }, [links]);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-heading font-semibold mb-2">
            Setup your dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Drag collections and links to organize your profile exactly how you
            want.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setIsAddingLink(true);
            setIsAddingCollection(false);
            setActiveCollectionId(undefined);
          }}
          className="flex-1 flex h-14 text-md font-semibold items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl justify-center transition-all shadow-sm shadow-green-200"
        >
          <Plus size={20} />
          Add Direct Link
        </button>
        <button
          onClick={() => {
            setIsAddingCollection(true);
            setIsAddingLink(false);
          }}
          className="flex-1 flex h-14 text-md font-semibold items-center gap-2 bg-white border-2 border-green-200 hover:bg-green-50 text-green-700 rounded-xl justify-center transition-all shadow-sm"
        >
          <FolderPlus size={20} />
          Add Group
        </button>
      </div>

      {isAddingLink && (
        <New_Link_modal
          setIsAddingLink={setIsAddingLink}
          newLink={newLink}
          setNewLink={setNewLink}
          collectionId={activeCollectionId}
        />
      )}

      {isAddingCollection && (
        <NewCollectionModal setIsAddingCollection={setIsAddingCollection} />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={unifiedItems.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {unifiedItems.map((item) => {
              if (item.type === "collection") {
                const collection = item.data as collectionType;
                return (
                  <SortableCollection
                    key={collection.id}
                    id={collection.id}
                    collection={collection}
                    onAddLink={() => {
                      setActiveCollectionId(collection.id);
                      setIsAddingLink(true);
                    }}
                  >
                    <SortableContext
                      items={(collection.links || []).map((l) => l.id!)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3 min-h-[10px]">
                        {collection.links && collection.links.length > 0 ? (
                          collection.links.map((link, idx) => (
                            <SortableLink
                              key={link.id}
                              id={link.id!}
                              link={link}
                              index={idx}
                            />
                          ))
                        ) : (
                          <p className="text-sm text-gray-300 italic py-2 pl-4">
                            No links in this group.
                          </p>
                        )}
                      </div>
                    </SortableContext>
                  </SortableCollection>
                );
              } else {
                const link = item.data as LinkType;
                return (
                  <div key={link.id} className="pb-4">
                    <SortableLink id={link.id!} link={link} index={0} />
                  </div>
                );
              }
            })}
          </div>
        </SortableContext>
      </DndContext>

      {!isAddingLink && !isAddingCollection && unifiedItems.length === 0 && (
        <div className="p-12 flex flex-col items-center text-center animate-fade-in bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <LinkIcon size={40} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">
            Your profile is empty
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm">
            Start by adding links or creating a group to organize them.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkSetup;
