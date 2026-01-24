"use client";
import Link from "next/link";
import Image from "next/image";
import { LinkType, cardType, collectionType } from "@/types/types";
import { BsThreeDotsVertical } from "react-icons/bs";

function getFaviconUrl(linkUrl: string) {
  try {
    const url = new URL(linkUrl);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&size=64`;
  } catch (error) {
    console.error("Invalid URL:", linkUrl, error);
    return "";
  }
}

const SingleLink = ({ link }: { link: LinkType }) => {
  const faviconUrl = getFaviconUrl(link.url);
  return (
    <Link
      href={link.url}
      className="link-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-8 rounded-full flex items-center justify-center h-8 overflow-hidden">
        {faviconUrl ? (
          <Image
            alt={link.title}
            src={faviconUrl}
            width={20}
            height={20}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-xs">🔗</span>
          </div>
        )}
      </div>
      <span className="flex-1 max-sm:text-xs truncate">{link.title}</span>
      <button
        className=" p-2 rounded-full bg-gray-50 "
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
    </Link>
  );
};

const RenderLinks = ({
  links,
  cards,
}: {
  links: LinkType[];
  cards?: cardType[];
}) => {
  return (
    <div className="w-full flex-1 p-2 max-sm:px-1 px-4 space-y-6">
      {/* Collections */}
      {cards &&
        cards.map((card) => (
          <div key={card.id} className="space-y-6">
            {card.collections &&
              card.collections.map((collection: collectionType) => (
                <div key={collection.id} className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">
                    {collection.title}
                  </h3>
                  <div className="space-y-3">
                    {collection.links &&
                      collection.links.map((link, idx) => (
                        <SingleLink key={link.id || idx} link={link} />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ))}

      {/* Direct Links */}
      {links && links.length > 0 && (
        <div className="space-y-3">
          {cards && cards.length > 0 && links.length > 0 && (
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">
              More Links
            </h3>
          )}
          {links.map((link: LinkType, index: number) => (
            <SingleLink key={link.id || index} link={link} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderLinks;
