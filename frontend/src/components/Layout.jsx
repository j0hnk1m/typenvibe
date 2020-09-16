import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Footer from './Footer';
import Head from './Head';

const Layout = ({ title, children }) => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Head title={title} />
      {/* <div className="flex">
        <div className="flex-none w-1/6 bg-gray-500 h-screen" />
        <div className="w-4/6 bg-gray-400 h-screen">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-12 justify-center bg-gray-300">
              1
            </div>
            <div className="col-span-2 h-12 bg-gray-300">2</div>
            <div className="col-span-1 h-12 bg-gray-300">3</div>
            <div className="col-span-1 h-12 bg-gray-300">4</div>
            <div className="col-span-2 h-12 bg-gray-300">5</div>
          </div>
        </div>
        <div className="flex-none w-1/6 bg-gray-500 h-screen" />
      </div> */}

      <h2 className="header">
        {query.site.siteMetadata.title}
      </h2>

      {children}

      <div className="footer">
        <Footer title={title} />
      </div>
    </>
  );
};

export default Layout;
