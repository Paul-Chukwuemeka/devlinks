"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import ProfileImageModal from "../features/select_profile_image";
import { AppContext } from "@/contexts/app_context";
import { profileType } from "@/types/types";
import UpdateUserProfile from "@/utils/updateUser";
import { User, Camera, Loader2 } from "lucide-react";

const ProfileSetup = () => {
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useContext(AppContext)!;
  const [profile, setProfile] = useState<profileType>({
    username: user?.username || "",
    bio: user?.bio || "",
    image: user?.image || "",
    name: user?.name || "",
  });

  const handleSave = async () => {
    if (user) {
      setIsSaving(true);
      try {
        await UpdateUserProfile(user.id, profile);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Image Modal */}
      {isProfileImageModalOpen && (
        <ProfileImageModal
          setIsProfileImageModalOpen={setIsProfileImageModalOpen}
          profile={profile}
          setProfile={setProfile}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-heading  mb-2">
          Profile Details
        </h1>
        <p className="text-body ">
          Add your details to create a personal touch to your DevLinks profile.
        </p>
      </div>

      {/* Profile Picture Card */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group">
            {profile.image ? (
              <Image
                src={profile.image}
                alt="Profile"
                width={100}
                height={100}
                className="avatar avatar-xl"
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-full  flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
            )}
            {/* Hover Overlay */}
            <button
              onClick={() => setIsProfileImageModalOpen(true)}
              className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera size={24} className="text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-subheading  mb-1">
              Profile Picture
            </h3>
            <p className="text-caption mb-3">
              Upload a photo to personalize your profile.
            </p>
            <button
              onClick={() => setIsProfileImageModalOpen(true)}
              className="btn btn-secondary"
            >
              Change Picture
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields Card */}
      <div className="card p-6 space-y-6">
        {/* Username */}
        <div className="input-group">
          <label className="input-label">Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2  font-medium">
              @
            </span>
            <input
              type="text"
              placeholder="your username"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value.toLowerCase().replace(/\s/g, '') })
              }
              className="input pl-8"
            />
          </div>
          <p className="text-xs ">
            This will be your unique URL: devlinks.to/{profile.username || "username"}
          </p>
        </div>

        {/* Name */}
        <div className="input-group">
          <label className="input-label">Display Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input"
          />
        </div>

        {/* Bio */}
        <div className="input-group">
          <label className="input-label">Bio</label>
          <textarea
            placeholder="Tell visitors about yourself..."
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="input textarea"
            rows={4}
          />
          <p className="text-xs  text-right">
            {profile.bio?.length || 0}/160
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn btn-primary min-w-[140px]"
        >
          {isSaving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
