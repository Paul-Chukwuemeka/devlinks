"use client";
import Link from "next/link";
import Image from "next/image";
import { LinkType } from "@/types/types";
import { BsThreeDotsVertical } from "react-icons/bs";

function getFaviconUrl(linkUrl: string) {
  try {
    const url = new URL(linkUrl);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&size=32`;
  } catch (error) {
    console.error("Invalid URL:", linkUrl, error);
    return "";
  }
}

const RenderLinks = ({ links }: { links: LinkType[] }) => {
  return (
    <div className="w-full flex-1 p-2 max-sm:px-1 px-4 space-y-3">
      {links &&
        links.length > 0 &&
        links.map((link: LinkType, index: number) => {
          const faviconUrl = getFaviconUrl(link.url);
          return (
            <Link href={link.url} className="link-btn" key={index}>
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
        })}
    </div>
  );
};

export default RenderLinks;
