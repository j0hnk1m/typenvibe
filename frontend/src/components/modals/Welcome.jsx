import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from 'state/app';

const WelcomeModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={() => dispatch(setModal(null))}>
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-between items-center p-5">
              <h3 className="w-full text-left text-3xl font-semibold">
                Welcome
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => dispatch(setModal(null))}
                type="button"
              >
                <span className="bg-transparent text-gray-700 opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none hover:font-bold">×</span>
              </button>
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
              <button
                className="bg-teal-400 text-white font-bold px-6 py-2 text-lg border-2 rounded-lg w-full focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => dispatch(setModal(null))}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};

export default WelcomeModal;
