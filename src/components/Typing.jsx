import React, { useState, useEffect } from 'react';
import Head from './Head';
import Stats from './Stats';

const Typing = ({ lyrics, togglePlayback }) => {
  const wordList = lyrics.split(' ');
  const [wordListStatus, setWordListStatus] = useState([]);

  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [curWord, setCurWord] = useState('');
  const [pos, setPos] = useState(0);
  const [curWordStatus, setCurWordStatus] = useState(true);

  // Resets typing
  const reset = () => {
    setCurWord('');
    setPos(0);
    setWordListStatus([]);
    setCorrectWordCount(0);
    setSeconds(0);
    setIsActive(false);
  };

  const addWordListStatus = (newStatus) => setWordListStatus([...wordListStatus, newStatus]);
  const handleCurWordChange = (e) => setCurWord(e.target.value);

  useEffect(() => {
    // Compare the word you typed with the answer
    const word1 = wordList[pos];
    const word2 = curWord.trim();
    if (!isActive && word2 === '') setCurWord('');
    setCurWordStatus(word1 === word2);

    // Start the song + timer once the user has started typing
    if (curWord !== '' && pos < wordList.length - 1) {
      setIsActive(true);
      togglePlayback();
    }

    // If user entered word (by pressing space), evaluate word
    if (word2.length > 0 && curWord.indexOf(' ') >= 0 && wordListStatus.length <= wordList.length) {
      setCurWord('');
      addWordListStatus(word1 === word2);
      if (word1 === word2) setCorrectWordCount(correctWordCount + 1);
      setPos(pos + 1);
    }
  }, [curWord]);

  useEffect(() => {
    if (pos > wordList.length - 1) setIsActive(false);
  }, [pos]);

  // Runs a timer that updates every second
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(Math.round((seconds + 0.1 + Number.EPSILON) * 100) / 100);
      }, 100);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <Head />
      <p>{isActive ? 'active' : 'not active'}</p>
      <p>time: {seconds}</p>
      <br />

      <div>
        <Stats
          wpm={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / seconds)) * 60}
          acc={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / wordList.length) * 100)}
        />

        <div className="typing-area">
          {wordList.map((word, i) => {
            let color = 'grey';
            if (i === wordListStatus.length) {
              // Current word that's being typed
              color = 'purple';
            } else if (i < wordListStatus.length) {
              // Past words
              color = wordListStatus[i] ? 'green' : 'red';
            }

            return (
              <p key={i} style={{ display: 'inline', color: [color] }}>
                {word}
                {' '}
              </p>
            );
          })}

          <div className="bar">
            <input className="input-field" type="text" value={curWord} onChange={handleCurWordChange} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" tabIndex="1" />
            <button className="redo-button" onClick={reset} tabIndex="2">redo</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Typing;
