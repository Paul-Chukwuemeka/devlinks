"use client";
import { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import { authClient } from "../../lib/auth-client";
import { Copy, Share2, Check } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { display, user } = useContext(AppContext)!;
  const { data } = authClient.useSession();
  const [copied, setCopied] = useState(false);

  console.log(data);

  const getPageTitle = () => {
    switch (display) {
      case "profile":
        return "Profile Details";
      case "appearance":
        return "Appearance";
      case "settings":
        return "Settings";
      case "links":
      default:
        return "Links";
    }
  };

  const handleCopyLink = async () => {
    if (user?.username) {
      await navigator.clipboard.writeText(`devlinks.to/${user.username}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!data) return null;

  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-[--border-light] bg-white">
      <h1 className="text-xl font-bold text-[--text-primary]">
        {getPageTitle()}
      </h1>

      <div className="flex items-center gap-3">
        {user?.username && (
          <>
            <button onClick={handleCopyLink} className="btn btn-secondary">
              {copied ? (
                <>
                  <Check size={16} className="text-[--primary-600]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Link
                </>
              )}
            </button>
            <button className="btn btn-primary">
              <Share2 size={16} />
              Share
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
