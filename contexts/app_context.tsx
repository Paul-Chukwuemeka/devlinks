"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { AppContextType, userType, DisplayType,LinkType } from "@/types/types";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/utils/getUserInfo";

export const AppContext = createContext<AppContextType | null>({
  user: null,
  setUser: () => {},
  links: [],
  setLinks: () => {},
  isPreviewMode: false,
  setIsPreviewMode: () => {},
  display: "links",
  setDisplay: () => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [display, setDisplay] = useState<DisplayType>("links");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const contextValue: AppContextType = {
    user,
    setUser,
    links,
    setLinks,
    isPreviewMode,
    setIsPreviewMode,
    display,
    setDisplay,
  };
  const currentUser = authClient.useSession().data?.user;
  useEffect(() => {
    async function getData() {
      if (currentUser && !user) {
        const data = await getUser(currentUser.id);
        setUser(data)
      }
    }
    getData();
  }, [currentUser,user]);

  // useEffect(()=>{
  //   async function fetchLinks() {
  //     if (user && user.links) {
  //       setLinks(user.links);
  //     }
  //   }
  //   fetchLinks();
  // },[])

  useEffect(() => {
    console.log("Preview Mode:", isPreviewMode);
  }, [isPreviewMode]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
