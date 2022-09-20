import React from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="bg-black ">
        <Header />
      </div>
      <div className="flex flex-col w-full bg-black grow">{children}</div>
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
