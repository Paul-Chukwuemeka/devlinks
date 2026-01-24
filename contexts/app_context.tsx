"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import {
  AppContextType,
  userType,
  DisplayType,
  LinkType,
  cardType,
} from "@/types/types";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/utils/getUserInfo";

export const AppContext = createContext<AppContextType | null>({
  user: null,
  setUser: () => {},
  links: [],
  setLinks: () => {},
  cards: [],
  setCards: () => {},
  isPreviewMode: false,
  setIsPreviewMode: () => {},
  display: "links",
  setDisplay: () => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [cards, setCards] = useState<cardType[]>([]);
  const [display, setDisplay] = useState<DisplayType>("links");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const contextValue: AppContextType = {
    user,
    setUser,
    links,
    setLinks,
    cards,
    setCards,
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
        setUser(data as any);
      }
    }
    getData();
  }, [currentUser, user]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        if (user.links) setLinks(user.links);
        if (user.cards) setCards(user.cards);
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    console.log("Preview Mode:", isPreviewMode);
  }, [isPreviewMode]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
