export type cardType = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
};

export type userType = {
  id: string;
  email: string | null;
  image: string | null;
  name: string | null;
  bio: string | null;
  username: string | null;
  cards: cardType[];
};

export type DisplayType = "links" | "profile" | "appearance" | "settings";

export type AppContextType = {
  user: userType | null;
  setUser: (user: userType | null) => void;
  links?: LinkType[];
  setLinks: (links: LinkType[]) => void;
  isPreviewMode?: boolean;
  setIsPreviewMode: (isPreviewMode: boolean) => void;
  display?: DisplayType;
  setDisplay: (display: DisplayType) => void;
};

// Link types

export type LinkType = {
  title: string;
  url: string;
  active?: boolean;
  userId: string;
  orderNum?: number;
  collectionId?: string | null;
};



export type CreateLinkInput = {
  userId: string;
  title: string;
  url: string;
  orderNum?: number;
};

export type collectionType = {
  title: string;
  links: LinkType[];
  id: string;
};

// profile types
export type profileType = {
  image?: string;
  username?: string;
  name?: string;
  bio?: string;
};
