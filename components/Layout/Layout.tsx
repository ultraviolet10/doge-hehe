import React from "react";

import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex flex-col w-full h-full bg-black grow">
        {children}
      </div>
    </div>
  );
};

export default Layout;
