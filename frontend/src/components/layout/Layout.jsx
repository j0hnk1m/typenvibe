import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Head from '../Head';

const Layout = ({ title, children }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <>
      <Head title={title} />
      <div className={`theme-${theme}`}>
        <div className="flex flex-col h-screen justify-between bg-primary">
          <Header />
          <div className="flex flex-col justify-center items-center mx-auto h-full w-3/5 max-w-screen-md p-3">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
