import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import Switch from "react-switch";
import Layout from 'components/Layout';
import { setTypingMode } from 'state/app';

const Settings = () => {
  const dispatch = useDispatch();
  const typingMode = useSelector((state) => state.app.typingMode);
  const navigateHome = () => navigate('/');

  // Typing mode state
  const [upper, toggleUpper] = useState((typingMode && (typingMode === 'upper' || typingMode === 'proper')));
  const [punc, togglePunc] = useState((typingMode && (typingMode === 'punc' || typingMode === 'proper')));

  useEffect(() => {
    let mode;
    if (!upper && !punc) mode = 'basic';
    else if (!upper && punc) mode = 'punc';
    else if (upper && !punc) mode = 'upper';
    else mode = 'proper';

    dispatch(setTypingMode(mode));
    // localStorage.setItem('typingMode', mode);
  }, [upper, punc]);

  return (
    <>
      <Layout>
        <p className="button" onClick={navigateHome}>back</p>
        <h1>settings</h1>

        <span>Uppercase? </span>
        <Switch onChange={toggleUpper} checked={upper} />
        <br />
        <span>Punctuation? </span>
        <Switch onChange={togglePunc} checked={punc} />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default Settings;
