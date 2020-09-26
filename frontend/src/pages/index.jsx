import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import Layout from 'components/layout/Layout';
import Boombox from 'components/Boombox';
import Typing from 'components/Typing';
import AuthPage from 'components/auth/AuthPage';
import AuthFooter from 'components/auth/AuthFooter';
import Spinner from 'components/Spinner';
import { getSongs } from 'state/app';

const Content = ({ auth, curSong, lrc, loading } = {}) => {
  if (auth && auth !== 'logged out') {
    if (curSong !== null && lrc && lrc.length !== 0) {
      // AUTHORIZED + SONG SELECTED VIEW
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex col-span-1 h-20 items-center justify-center">
              <Boombox />
            </div>
            <Typing />
          </div>
          <div className="flex justify-center items-center w-full mt-5">
            <AuthFooter />
          </div>
        </>
      );
    }

    // AUTHORIZED + NO SONG SELECTED VIEW
    return (
      <>
        <div className="flex w-3/5 mx-auto">
          <Boombox />
        </div>
        <div className="flex justify-center items-center mt-5">
          <AuthFooter />
        </div>
      </>
    );
  }

  // NOT AUTHORIZED = AUTH VIEW
  return (
    <div className="flex justify-center items-center mt-5">
      <AuthPage />
    </div>
  );
};

const Home = () => {
  // global app state
  const curSong = useSelector((state) => state.app.curSong);
  const lrc = useSelector((state) => state.app.lrc);
  const loading = useSelector((state) => state.app.loading);
  const auth = useSelector((state) => state.app.auth);

  const dispatch = useDispatch();
  dispatch(getSongs());

  const url = typeof window !== 'undefined' ? window.location.href : '';
  if (process.env.NODE_ENV === 'development' && url.substring('http://localhost:8000/'.length, url.length) !== '') navigate('/');

  // first time = modal
  const [modal, showModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('visited')) {
      setTimeout(() => {
        showModal(true);
        localStorage.setItem('visited', true);
      }, 500);
    }
  }, []);

  return (
    <>
      <SpotifyApiContext.Provider value={Cookies.get('spotifyAuthToken')}>
        <Layout>
          {loading && <Spinner />}
          <Content
            auth={auth}
            curSong={curSong}
            lrc={lrc}
            loading={loading}
          />

          {modal
          && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center justify-center text-center p-5">
                      <h3 className="text-3xl font-semibold">
                        Welcome
                      </h3>
                    </div>

                    {/*body*/}
                    <div className="relative px-6 flex-auto">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        typenvibe is a site where you can practice typing lyrics 
                        in rythm to the song! For audio playback, you can choose 
                        between Spotify (premium) or Youtube. For more details, please 
                        visit the about page by clicking the question in the bottom 
                        nav footer.
                      </p>
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-center p-6 rounded-b">
                      <button className="bg-teal-400 text-white font-bold px-6 py-2 text-lg border-2 rounded-lg w-full focus:outline-none mr-1 mb-1" type="button" onClick={() => showModal(false)}>Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </>
          )}
        </Layout>
      </SpotifyApiContext.Provider>
    </>
  );
};

export default Home;
