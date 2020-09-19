import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import Slider from 'rc-slider';
import Layout from 'components/layout/Layout';
import { setVolume, setTheme, setTypingMode } from 'state/app';

import 'rc-slider/assets/index.css';

export const THEMES = [
  'light',
  'dark',
  'moderndolch',
  'striker',
  'dots',
  '8008',
  '9009',
  'carbon',
  'eclipse',
  'sublimetext',
  'solarizedlight',
  'yuri',
  'bento',
  'pulse',
  'blink',
  'lime',
  'nautilus2',
  'redsuns',
  'laser',
  'granite',
];

const Settings = () => {
  const dispatch = useDispatch();
  const typingMode = useSelector((state) => state.app.typingMode);
  const volume = useSelector((state) => state.app.volume);
  const theme = useSelector((state) => state.app.theme);

  // Typing mode state
  const [upper, toggleUpper] = useState((typingMode && (typingMode === 'upper' || typingMode === 'proper')));
  const [punc, togglePunc] = useState((typingMode && (typingMode === 'punc' || typingMode === 'proper')));
  const [vol, setVol] = useState(volume);
  const [themeChoice, setThemeChoice] = useState(theme);

  useEffect(() => {
    let mode;
    if (!upper && !punc) mode = 'basic';
    else if (!upper && punc) mode = 'punc';
    else if (upper && !punc) mode = 'upper';
    else mode = 'proper';

    dispatch(setTypingMode(mode));
  }, [upper, punc]);

  useEffect(() => {
    dispatch(setTheme(themeChoice));
  }, [themeChoice]);

  useEffect(() => {
    dispatch(setVolume(vol));
  }, [vol]);

  return (
    <>
      <Layout title="settings">
        <div className="flex w-full h-64 justify-center">
          <div className="overflow-hidden overflow-y-scroll scrolling-auto w-1/2 h-full mx-2 p-2 border-2 border-primary rounded-lg justify-center items-center">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((choice) => (
                <button key={choice} className={`w-full h-16 border-2 rounded-lg transition duration-300 ease-in-out bg-white transform hover:scale-110 py-2 px-2 rounded-lg theme-${choice} bg-primary border-primary`} onClick={() => setThemeChoice(choice)}>
                  <p className="text-display">{choice}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="w-1/2 h-full mx-2 p-2 border-2 rounded-lg border-primary justify-center items-center">
            <div className="flex justify-start items-center m-2">
              <Switch onChange={toggleUpper} checked={upper} />
              <p className="px-3 text-secondary">uppercase</p>
              <svg className="w-6 h-6 hover:" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            </div>
            <div className="flex justify-start items-center m-2">
              <Switch onChange={togglePunc} checked={punc} />
              <p className="px-3 text-secondary">punctuation</p>
              <svg className="w-6 h-6 hover:" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            </div>
            <div className="flex justify-start items-center m-2 pt-4">
              <Slider
                defaultValue={volume}
                value={vol}
                onChange={setVol}
                min={0}
                max={1}
                step={0.01}
                marks={0}
              />
            </div>
            <div className="flex justify-center items-center m-2">
              <p className="text-secondary">volume: {vol}</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Settings;
