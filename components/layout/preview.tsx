import { useContext } from "react";
import Image from "next/image";
import { AppContext } from "../../contexts/app_context";
import { User } from "lucide-react";
import RenderLinks from "./renderLinks";

const Preview = () => {
  const { user, links } = useContext(AppContext)!;

  return (
    <div className="hidden lg:flex items-center justify-center p-6">
      <div className="border-2 border-gray-200 rounded-xl w-80 h-full max-h-160">
        <div className="flex flex-col hide-scrollbar h-full overflow-y-scroll">
          <div className="" />
          <div className="flex flex-1 flex-col items-center pt-12">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-3 shadow-lg">
                  <User size={32} className="text-white" />
                </div>
              )}
              {user?.username && (
                <p className="text-xs font-medium mb-1">@{user.username}</p>
              )}
              {user?.name && (
                <h2 className="text-lg font-bold text-center">{user.name}</h2>
              )}
              {user?.bio && (
                <p className="text-xs text-center mt-1 px-4 line-clamp-2">
                  {user.bio}
                </p>
              )}
            </div>
            <RenderLinks links={links || []} />

            {/* Branding */}
            <div className="mt-auto pt-8 pb-4">
              <p className="text-[10px] font-medium">Made with DevLinks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
