import React from 'react';

import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-grow flex-col overflow-auto bg-body">
        {children}
      </div>
    </div>
  );
};

export default Layout;
