"use client";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import { authClient } from "@/lib/auth-client";
import { SignOutAction } from "@/app/actions/auth";
import {
  User,
  Mail,
  Shield,
  Bell,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  danger?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  description,
  onClick,
  danger,
}: SettingsItemProps) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 p-4 rounded-xl transition-colors text-left
      ${
        danger
          ? "hover:bg-red-50 text-red-600"
          : "hover:bg-[var(--surface-tertiary)]"
      }
    `}
  >
    <div
      className={`
      w-10 h-10 rounded-xl flex items-center justify-center
      ${danger ? "bg-red-100" : "bg-[var(--surface-tertiary)]"}
    `}
    >
      {icon}
    </div>
    <div className="flex-1">
      <p
        className={`font-medium ${danger ? "text-red-600" : "text-[var(--text-primary)]"}`}
      >
        {title}
      </p>
      {description && (
        <p className="text-sm text-[var(--text-tertiary)]">{description}</p>
      )}
    </div>
    <ChevronRight
      size={20}
      className={danger ? "text-red-400" : "text-[var(--text-tertiary)]"}
    />
  </button>
);

const Settings = () => {
  const { user } = useContext(AppContext)!;
  const { data } = authClient.useSession();

  const handleLogout = () => {
    SignOutAction();
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-heading text-[var(--text-primary)] mb-2">
          Settings
        </h1>
        <p className="text-body text-[var(--text-secondary)]">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Account Section */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-[var(--border-light)]">
          <h2 className="text-subheading text-[var(--text-primary)]">
            Account
          </h2>
        </div>

        {/* User Info */}
        {data && (
          <div className="p-6 border-b border-[var(--border-light)] flex items-center gap-4">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border-2 border-[var(--border-light)]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[var(--primary-100)] flex items-center justify-center">
                <User size={24} className="text-[var(--primary-600)]" />
              </div>
            )}
            <div>
              <p className="font-semibold text-[var(--text-primary)]">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {user?.email || "No email"}
              </p>
            </div>
          </div>
        )}

        <div className="divide-y divide-[var(--border-light)]">
          <SettingsItem
            icon={<User size={20} className="text-[var(--text-secondary)]" />}
            title="Edit Profile"
            description="Update your profile information"
          />
          <SettingsItem
            icon={<Mail size={20} className="text-[var(--text-secondary)]" />}
            title="Email Settings"
            description="Manage email notifications"
          />
          <SettingsItem
            icon={<Shield size={20} className="text-[var(--text-secondary)]" />}
            title="Privacy & Security"
            description="Password and security settings"
          />
          <SettingsItem
            icon={<Bell size={20} className="text-[var(--text-secondary)]" />}
            title="Notifications"
            description="Configure notification preferences"
          />
        </div>
      </div>

      {/* Share Section */}
      {user?.username && (
        <div className="card p-6">
          <h2 className="text-subheading text-[var(--text-primary)] mb-4">
            Your DevLinks URL
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-3 bg-[var(--surface-tertiary)] rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                devlinks.to/{user.username}
              </p>
            </div>
            <button className="btn btn-secondary">
              <ExternalLink size={16} />
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className="card overflow-hidden border-red-200">
        <div className="p-6 border-b border-red-100 bg-red-50">
          <h2 className="text-subheading text-red-700">Danger Zone</h2>
        </div>
        <div>
          <SettingsItem
            icon={<LogOut size={20} />}
            title="Sign Out"
            description="Sign out of your account"
            onClick={handleLogout}
            danger
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
