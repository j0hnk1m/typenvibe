import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import Slider from 'rc-slider';
import ReactTooltip from 'react-tooltip';
import Layout from 'components/layout/Layout';
import { setVolume, setTheme, setGrammar, setMode } from 'state/app';

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

  // global app state
  const grammar = useSelector((state) => state.app.grammar);
  const mode = useSelector((state) => state.app.mode);
  const volume = useSelector((state) => state.app.volume);
  const theme = useSelector((state) => state.app.theme);

  // local settings
  const [upper, toggleUpper] = useState((grammar && (grammar === 'upper' || grammar === 'proper')));
  const [punc, togglePunc] = useState((grammar && (grammar === 'punc' || grammar === 'proper')));
  const [vol, setVol] = useState(volume);
  const [mode_, toggleMode] = useState(mode === 'chill');
  const [theme_, setTheme_] = useState(theme);

  useEffect(() => {
    let grammar_;
    if (!upper && !punc) grammar_ = 'basic';
    else if (!upper && punc) grammar_ = 'punc';
    else if (upper && !punc) grammar_ = 'upper';
    else grammar_ = 'proper';

    dispatch(setGrammar(grammar_));
  }, [upper, punc]);

  useEffect(() => {
    dispatch(setTheme(theme_));
  }, [theme_]);

  useEffect(() => {
    dispatch(setMode(mode_ ? 'chill' : 'default'));
  }, [mode_]);

  useEffect(() => {
    dispatch(setVolume(vol));
  }, [vol]);

  return (
    <>
      <Layout title="settings">
        <div className="flex w-full h-64">
          <div className="w-1/2 h-full mx-2 p-2 border-2 border-primary rounded-lg overflow-hidden overflow-y-scroll">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((choice) => (
                <button key={choice} type="submit" className={`w-full h-16 border-2 rounded-lg transition duration-300 ease-in-out bg-white transform hover:scale-110 py-2 px-2 theme-${choice} bg-primary border-primary`} onClick={() => setTheme_(choice)}>
                  <p className="text-display truncate">{choice}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-1/2 h-full mx-2 p-2 border-2 rounded-lg border-primary text-inverse">
            <div className="flex justify-start items-center m-2">
              <Switch onChange={toggleMode} checked={mode === 'chill'} />
              <p className="px-3 truncate">"chill" mode</p>
              <svg data-tip data-for="mode" className="w-6 h-6 hover:" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              <ReactTooltip id="mode">
                <p>enabling chill mode will stop the line from changing automatically</p>
                <p>so you're free to type at your own pace</p>
              </ReactTooltip>
            </div>
            <div className="flex justify-start items-center m-2">
              <Switch onChange={toggleUpper} checked={upper} />
              <p className="px-3 truncate">uppercase</p>
              <svg data-tip data-for="uppercase" className="w-6 h-6 hover:" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              <ReactTooltip id="uppercase">
                <p>uppercase letters will show up as you type</p>
              </ReactTooltip>
            </div>
            <div className="flex justify-start items-center m-2">
              <Switch onChange={togglePunc} checked={punc} />
              <p className="px-3 truncate">punctuation</p>
              <svg data-tip data-for="punctuation" className="w-6 h-6 hover:" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              <ReactTooltip id="punctuation">
                <p>punctuation (,.!?*"-') will show up as you type</p>
              </ReactTooltip>
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
