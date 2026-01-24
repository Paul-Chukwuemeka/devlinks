import { useGetAvatars } from "@/hooks/useGetAvatars";
import Image from "next/image";
import React, { Activity, useRef, useState } from "react";
import { profileType } from "@/types/types";
import { uploadUserPhoto } from "@/lib/uploadUserPhoto";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import Loader from "../ui/loader";
import UpdateUser from "@/app/actions/updateUserProfile";

enum loadingMode {
  inactive = "inactive",
  pending = "pending",
  completed = "completed",
  failed = "failed",
}

interface props {
  setIsProfileImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profile: profileType;
  setProfile: React.Dispatch<React.SetStateAction<profileType>>;
}

const Select_Profile_Image = ({
  setIsProfileImageModalOpen,
  profile,
  setProfile,
}: props) => {
  const { avatars, loading, error } = useGetAvatars();
  const [custom, setCustom] = useState<boolean>(false);
  const [customActive, setCustomActive] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<loadingMode>(loadingMode.inactive);

  const { user } = useContext(AppContext)!;
  const id = user?.id;

  async function handleUploadImage() {
    if (!customActive) return;
    if (!imgFile) return;
    setUploading(loadingMode.pending);
    try {
      const { publicUrl } = await uploadUserPhoto(imgFile);
      setProfile((prev) => ({ ...prev, image: publicUrl! }));
    } catch (error) {
      console.log("Error uploading image:", error);
      setUploading(loadingMode.failed)
    } finally {
      setUploading(loadingMode.completed);
    }
  }

  function handleUpdate() {
    setIsLoading(true);
    try {
      UpdateUser(id!, { image: profile.image! });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      
    }
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="w-full h-full z-50 flex flex-col items-center justify-center top-0 left-0 fixed backdrop-blur-sm"
      onClick={() => setIsProfileImageModalOpen(false)}
    >
      <div
        className="bg-white rounded-lg border-2 border-gray-100 p-6 w-full max-w-147 max-h-[80vh] 
      overflow-y-auto flex flex-col gap-4 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Select Profile Image</h2>
        {loading && <Loader />}
        {error && <p>Failed to fetch avatars</p>}
        {avatars && !loading && !error && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {avatars.map((avatar, i) => {
              return (
                <div
                  key={i}
                  className={`cursor-pointer rounded-full overflow-hidden ${
                    profile.image === avatar
                      ? " border-green-400 border-3"
                      : "border-gray-400 border"
                  }`}
                  onClick={() => {
                    setProfile((prev) => ({ ...prev, image: avatar! }));
                    setCustomActive(false);
                  }}
                >
                  <Image
                    src={avatar}
                    height={40}
                    width={40}
                    className="w-18 h-18  "
                    alt="avatar"
                  />
                </div>
              );
            })}
          </div>
        )}

        <span className="text-xl font-semibold">Or</span>
        <Activity mode={`${custom ? "hidden" : "visible"}`}>
          <div className="flex justify-around items-center w-full gap-4">
            <button
              className="font-medium border-2 p-3 border-green-300 rounded-lg text-lg mb-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Custom Image
            </button>
            <span className="block w-40">
              max file size: 2MB. Supported formats: JPG, PNG, GIF.
            </span>
          </div>
        </Activity>
        <Activity mode={`${custom ? "visible" : "hidden"}`}>
          <div className="flex items-center justify-center gap-10 w-full">
            <div className="flex flex-col items-center">
              <button
                className="w-18 h-18 border-2  rounded-full overflow-hidden text-lg mb-2 flex items-center justify-center"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                {profile.image && (
                  <Image
                    src={profile.image}
                    className="w-18 h-18"
                    alt="Custom avatar"
                    width={100}
                    height={100}
                  />
                )}
              </button>
              <p className="text-gray-600 text-xs">
                Click to change custom image
              </p>
            </div>
            <button
              className="w-40 h-12 bg-green-300 text-gray-500 font-semibold hover:bg-green-400 rounded-lg text-lg mb-2"
              onClick={() => {
                if (uploading === loadingMode.inactive) {
                  handleUploadImage();
                }
              }}
            >
              {uploading === loadingMode.pending ? <Loader /> : "Upload Image"}
            </button>
            <p
              className="text-red-600 text-sm underline cursor-pointer "
              onClick={() => {
                setCustom(false);
              }}
            >
              Discard Custom Image
            </p>
          </div>
        </Activity>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImgFile(file);
              const reader = new FileReader();
              reader.onloadend = () => {
                setProfile((prev) => ({
                  ...prev,
                  image: reader.result as string,
                }));

                setCustomActive(true);
                setCustom(true);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="border border-gray-300 rounded-lg p-2"
        />
        <button
          className="w-30 h-10 hover:bg-green-400 text-gray-600 bg-green-300 rounded-lg font-bold text-xl"
          onClick={() => {
            try {
              handleUpdate();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {isloading ? <Loader /> : "Save"}
        </button>
      </div>
      <div
        className={`border w-85 h-15 absolute right-2 ${uploading == loadingMode.failed ? "bottom-2" : "top-2"} `}
      ></div>
    </div>
  );
};

export default Select_Profile_Image;
