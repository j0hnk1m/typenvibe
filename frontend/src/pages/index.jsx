import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import Layout from 'components/layout/Layout';
import Typing from 'components/Typing';
import AuthPage from 'components/auth/AuthPage';
import AuthFooter from 'components/auth/AuthFooter';
import Spinner from 'components/Spinner';
import Modal from 'components/modals/Modal';
import { getSongs, setModal } from 'state/app';

const Content = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const auth = useSelector((state) => state.app.auth);
  const lrc = useSelector((state) => state.app.lrc);
  const dispatch = useDispatch();

  if (auth && auth !== 'logged out') {
    if (curSong !== null && lrc && lrc.length !== 0) {
      // AUTHORIZED + SONG SELECTED VIEW
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex col-span-1 items-center justify-center">
              <button
                className="text-inverse w-full h-10 border-2 rounded-lg p-2 outline-none focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
                type="button"
                onClick={() => dispatch(setModal('songlibrary'))}
              >
                <p className="text-inverse text-left truncate">
                  {songs[curSong].artists
                    ? (
                      <>{songs[curSong].name} - {songs[curSong].artists.join(', ')}</>
                    ) : (
                      <>{songs[curSong].name}</>
                    )}
                </p>

              </button>
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
        <div className="flex w-1/5 mx-auto justify-center">
          <button
            className="text-inverse text-xl h-20 border-2 rounded-lg p-2 outline-none focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
            type="button"
            onClick={() => dispatch(setModal('songlibrary'))}
          >
            Song Library
          </button>
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
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const spotifyAuthToken = Cookies.get('spotifyAuthToken');
  dispatch(getSongs(spotifyAuthToken));

  // removes access token + other params in url
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'https://typenvibe.com/'
  if (url.substring(baseUrl.length, url.length) !== '') navigate('/');

  useEffect(() => {
    if (!localStorage.getItem('visited')) {
      setTimeout(() => {
        dispatch(setModal('welcome'));
        localStorage.setItem('visited', true);
      }, 500);
    }
  }, []);

  return (
    <>
      <SpotifyApiContext.Provider value={Cookies.get('spotifyAuthToken')}>
        <Layout>
          {loading && <Spinner />}
          <Modal />
          <Content />
        </Layout>
      </SpotifyApiContext.Provider>
    </>
  );
};

export default Home;
