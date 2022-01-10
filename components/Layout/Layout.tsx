import React from 'react';
import Navbar from '@components/Navbar';

const Layout: React.FC = (props) => {
  const { children } = props;
  return (
    <main className="layout w-full h-full relative">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;