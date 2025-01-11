import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error(
      "Sidebar context must be used within the context provider.",
    );
  }

  return context;
}
