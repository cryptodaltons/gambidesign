import { createContext } from "react";

export interface ISidebarContext {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<ISidebarContext | undefined>(
  undefined,
);
