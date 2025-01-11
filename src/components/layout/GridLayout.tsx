import React, { ReactNode } from "react";
import styles from "../../styles/GridLayout.module.css";

interface GridLayoutProps {
  children: ReactNode;
  className?: string;
}

export const GridLayout = ({ children, className = "" }: GridLayoutProps) => {
  return (
    <div className={`${styles.gridContainer} ${className}`}>{children}</div>
  );
};
