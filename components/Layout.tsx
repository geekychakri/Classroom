import React from "react";
import Navigation from "./Navigation";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-full flex flex-col">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
