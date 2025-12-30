"use client";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import { authClient } from "@/lib/auth-client";
import { SignOutAction } from "@/app/actions/auth";
import Image from "next/image";
import Link from "next/link";
import Logo from "../ui/logo";
import {
  Link2,
  User,
  Palette,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

type NavItemType = "links" | "profile" | "appearance" | "settings";

interface NavItem {
  id: NavItemType;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "links", label: "Links", icon: <Link2 size={20} /> },
  { id: "profile", label: "Profile", icon: <User size={20} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

const Sidebar = () => {
  const { display, setDisplay, user } = useContext(AppContext)!;
  const { data } = authClient.useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const handleNavClick = (id: NavItemType) => {
    setDisplay(id);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    SignOutAction();
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 btn btn-secondary btn-icon"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed bg-black/50 z-30 animate-fade-in inset-0"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 h-screen bg-gray-100
          flex flex-col transition-transform duration-300 ease-out
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Close Button for Mobile */}
        {isMobileOpen && (
          <button
            className="lg:hidden absolute right-4 top-5 font-semibold cursor-pointer"
            onClick={() => setIsMobileOpen(false)}
            title="Close sidebar"
          >
            <X size={22} />
          </button>
        )}
        {/* Logo Section */}
        <div className="p-4 py-3.5 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <Logo width={35} height={35} color="green" />
          </div>
          <span className="text-xl text-gray-700 font-bold">DevLinks</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                   w-full flex items-center justify-start gap-3
                   px-3 py-2 rounded-lg text-left text-gray-700 text-sm font-medium
                   hover:bg-green-200 transition-colors
                  ${display === item.id ? "bg-green-100" : ""}
                `}
              >
                <span className="">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Share Link */}
          {data && user?.username && (
            <div className="mt-8 px-1">
              <div className="p-4 rounded-xl text-gray-800 bg-white shadow-sm">
                <p className="text-sm font-medium  mb-2">
                  Your DevLinks is live:
                </p>
                <Link
                  href={`/${user.username}`}
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  <span className="truncate">devlinks.to/{user.username}</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* User Section */}
        {data && (
          <div className="p-4">
            <div className="flex items-center gap-3 p-2 rounded-xl transition-colors">
              {user?.image ? (
                <Image
                  src={user.image || "/default-avatar.svg"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="avatar"
                />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <User size={20} className="" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs truncate">
                  {user?.username ? `@${user.username}` : "Set your username"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-icon btn-icon-sm"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}

        {!data && (
          <div className="p-4 space-y-2">
            <Link href="/auth/signin" className="btn btn-primary w-full">
              Sign In
            </Link>
            <Link href="/auth/signup" className="btn btn-secondary w-full">
              Create Account
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
