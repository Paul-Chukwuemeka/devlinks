import Preview from "./preview";
import { useContext } from "react";
import { AppContext } from "@/contexts/app_context";
import ProfileSetup from "./setup_profile";
import LinkSetup from "./link_setup";
import Sidebar from "./sidebar";
import Appearance from "./appearance";
import Settings from "./settings";

const Main = () => {
  const { display } = useContext(AppContext)!;

  const renderContent = () => {
    switch (display) {
      case "profile":
        return <ProfileSetup />;
      case "appearance":
        return <Appearance />;
      case "settings":
        return <Settings />;
      case "links":
      default:
        return <LinkSetup />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex">
        <main className="flex-1 p-6 max-lg:mt-7 lg:p-[17px_17px] overflow-y-auto">
          <div className="mx-auto">{renderContent()}</div>
        </main>

        <Preview />
      </div>
    </div>
  );
};

export default Main;
