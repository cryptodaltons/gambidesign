import { ReactNode, useState } from "react";
import { SidebarContext } from "./SidebarContext";

interface Props {
  children: ReactNode;
}

export function SidebarContextProvider(props: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => setExpanded(!expanded);

  return (
    <SidebarContext.Provider
      value={{ isOpen: expanded, toggleSidebar: toggleSidebar }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
}
