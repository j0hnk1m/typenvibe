import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLrc, setCurSong, setModal, setSongLibrarySort, setSongLibraryView } from 'state/app';

const SongLibrary = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const grammar = useSelector((state) => state.app.grammar);
  const songLibrarySort = useSelector((state) => state.app.songLibrarySort);
  const songLibraryView = useSelector((state) => state.app.songLibraryView);

  // const [previewUrl, setPreviewUrl] = useState('');
  // const [isHovering, setIsHovering] = useState(false);

  const dispatch = useDispatch();

  let options = {};
  switch (songLibrarySort) {
    // returns object
    case 'difficulty':
      options = ['easy', 'medium', 'hard', 'impossible'].reduce((a, b) => (a[b] = [], a), {});
      Object.keys(songs).forEach((i) => options[songs[i].difficulty].push({ [i]: songs[i] }));
      Object.keys(options).forEach((i) => {
        if ('name' in options[i]) options[i].sort((a, b) => Object.values(a)[0].name.localeCompare(Object.values(b)[0].name));
      });
      break;

    // returns object
    case 'alphabetical':
      for (let i = 0; i < 26; i++) {
        options[String.fromCharCode(97 + i)] = [];
      }
      options['#'] = [];
      const sorted = Object.keys(songs)
        .sort((a, b) => {
          if (!songs[a].name) return -1;
          if (!songs[b].name) return 1;
          return songs[a].name.localeCompare(songs[b].name)
        })
        .map((i) => ({ [i]: songs[i] }));

      sorted.forEach((song) => {
        const name = Object.values(song)[0].name;
        if (name) {
          if (!(name.charAt(0).toLowerCase() in options)) options['#'].push(song);
          else options[name.charAt(0).toLowerCase()].push(song);
        }
      });

      options = Object.keys(options)
        .filter((i) => options[i].length > 0)
        .reduce((obj, i) => {
          obj[i] = options[i];
          return obj;
        }, {});
      break;
    default:
  }

  switch (songLibraryView) {
    case 'grid':
      return (
        <div className="flex-col justify-start">
          {Object.keys(options).map((group, idx) => (
            <div key={group}>
              <h1 className={`font-bold text-xl ${idx === 0 || 'mt-4'}`}>{group.toUpperCase()}</h1>
              <div className="flex flex-wrap justify-start gap-3">
                {options[group].map((song) => {
                  const i = Object.keys(song)[0];
                  return (
                    <button
                      key={i}
                      className="h-20 sm:h-24 md:h-32 w-20 sm:w-24 md:w-32 border-2 rounded-lg p-2 outline-none focus:outline-none transition duration-300 ease-in-out transform hover:scale-110 overflow-hidden"
                      type="button"
                      onClick={() => {
                        dispatch(setCurSong(i));
                        dispatch(setModal(null));
                        dispatch(getLrc({
                          spotifyTrackId: songs[i].spotifyTrackId,
                          delay: songs[i].delay,
                          grammar,
                        }));
                      }}
                      // onMouseEnter={() => {
                      //   setIsHovering(true);
                      //   setPreviewUrl(songs[i].previewUrl);
                      // }}
                      // onMouseLeave={() => setIsHovering(false)}
                    >
                      {songs[i].coverArt && (
                        <img className="h-10 sm:h-12 md:h-16 mx-auto" src={songs[i].coverArt.url} />
                      )}
                      <div className="text-start text-sm">
                        <p className="text-inverse truncate">{songs[i].name}</p>
                        <p className="text-inverse opacity-50 truncate">
                          {songs[i].artists
                            ? (
                              <>{songs[i].artists.join(', ')}</>
                            ) : (
                              <>{songs[i].artists}</>
                            )}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    case 'list':
      return (
        <div className="flex-col justify-start">
          {Object.keys(options).map((group, idx) => (
            <div key={group}>
              <h1 className={`font-bold text-xl ${idx === 0 || 'mt-4'}`}>{group.toUpperCase()}</h1>
              {options[group].map((song) => {
                const i = Object.keys(song)[0];
                const data = Object.values(song)[0];

                return (
                  <button
                    key={i}
                    className="flex justify-start text-sm hover:underline p-2 outline-none focus:outline-none overflow-hidden"
                    type="button"
                    onClick={() => {
                      dispatch(setCurSong(i));
                      dispatch(setModal(null));
                      dispatch(getLrc({
                        spotifyTrackId: data.spotifyTrackId,
                        delay: data.delay,
                        grammar,
                      }));
                    }}
                  >
                    <p className="text-inverse truncate inline">{Object.values(song)[0].name}</p>
                    <p className="text-inverse opacity-50 truncate inline">
                      {data.artists
                        ? (
                          <> - {data.artists.join(', ')}</>
                        ) : (
                          <> - {data.artists}</>
                        )}
                    </p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      );
    default:
  }
};

const ConfigHeader = () => {
  const songLibraryView = useSelector((state) => state.app.songLibraryView);

  const [sortDropdown, setSortDropdown] = useState(false);
  const toggleSortDropdown = () => setSortDropdown(!sortDropdown);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-end">
        {/* view grid/list buttons */}
        {songLibraryView === 'grid'
          ? (
            <button
              type="button"
              className="rounded-md focus:outline-none justify-center border-gray-300 px-2 bg-white text-sm leading-5 text-gray-700 hover:text-gray-500 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              onClick={() => dispatch(setSongLibraryView('list'))}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md focus:outline-none justify-center border-gray-300 px-2 bg-white text-sm leading-5 text-gray-700 hover:text-gray-500 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              onClick={() => dispatch(setSongLibraryView('grid'))}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          )}

        {/* sort by dropdown button */}
        <button
          type="button"
          className="rounded-lg inline-flex focus:outline-none justify-center w-30 border-2 border-gray-300 px-2 py-2 mx-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
          onClick={toggleSortDropdown}
        >
          sort by
          <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {sortDropdown
        && (
          <div className="absolute right-0 mt-2 mr-5 w-40 rounded-lg shadow-lg">
            <div className="rounded-md bg-white shadow-xs">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  className="w-full block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  onClick={() => {
                    dispatch(setSongLibrarySort('difficulty'));
                    toggleSortDropdown();
                  }}
                  type="button"
                >
                  difficulty
                </button>
                <button
                  className="w-full block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  onClick={() => {
                    dispatch(setSongLibrarySort('alphabetical'));
                    toggleSortDropdown();
                  }}
                  type="button"
                >
                  alphabetical
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

const SongLibraryModal = () => {
  const dispatch = useDispatch();

  // close modal if esc key is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      dispatch(setModal(null));
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="flex justify-center items-center h-auto w-4/5 max-w-screen-lg my-6 mx-auto">
          <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none h-auto text-inverse bg-primary border-primary">
            {/*header*/}
            <div className="flex justify-between items-center px-5 pt-5">
              <h3 className="w-full text-left text-3xl font-semibold">
                Library
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => dispatch(setModal(null))}
                type="button"
              >
                <span className="text-inverse opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none hover:font-bold">×</span>
              </button>
            </div>

            {/*body*/}
            <div className="px-5 pb-5">
              <ConfigHeader />

              <div className="h-64 sm:h-96 md:h-128 w-full p-4 border-2 border-primary rounded-lg overflow-hidden overflow-y-scroll mt-3">
                <SongLibrary />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};

export default SongLibraryModal;
