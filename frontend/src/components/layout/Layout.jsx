import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from '../Head';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head title={title} />

      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container flex-col mx-auto justify-center items-center w-8/12 max-w-screen-lg p-3">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
