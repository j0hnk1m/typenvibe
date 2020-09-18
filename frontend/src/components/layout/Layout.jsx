import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from '../Head';

const Layout = ({ title, children }) => (
  <>
    <Head title={title} />

    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <div className="mx-auto justify-center items-center max-w-screen-md p-3">
        {children}
      </div>
      <Footer />
    </div>
  </>
);

export default Layout;
