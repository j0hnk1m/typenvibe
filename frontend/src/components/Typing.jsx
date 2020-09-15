import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Line } from 'rc-progress';
import Head from './Head';
import Stats from './Stats';

const Typing = () => {
  // Global app state
  const curSong = useSelector((state) => state.app.curSong);
  const curSongLength = useSelector((state) => state.app.curSongLength);
  const curSongUrl = useSelector((state) => state.app.curSongUrl);
  const volume = useSelector((state) => state.app.volume);
  const lrc = useSelector((state) => state.app.lrc);

  // Local typing state
  const [linePos, setLinePos] = useState(0);
  const [wordPos, setWordPos] = useState(0);
  const [ohShitTheLineChangedWhileIWasTyping, setOhShitTheLineChangedWhileIWasTyping] = useState(false);
  const [wordListStatus, setWordListStatus] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typedWordCount, setTypedWordCount] = useState(0);
  const [curWord, setCurWord] = useState('');
  const [prevWord, setPrevWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const wordList = lrc[linePos].text.split(' ');
  const nextWordList = (linePos <= lrc.length - 2) ? lrc[linePos + 1].text.split(' ') : [];


  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    setLinePos(0);
    setWordPos(0);
    setOhShitTheLineChangedWhileIWasTyping(false);
    setWordListStatus([]);
    setCorrectWordCount(0);
    setTypedWordCount(0);
    setCurWord('');
    setPrevWord('');
    setScore(0);
  };
  const addWordListStatus = (newStatus) => setWordListStatus([...wordListStatus, newStatus]);
  const handleCurWordChange = (e) => setCurWord(e.target.value);

  useEffect(() => {
    reset();
  }, [curSong]);

  useEffect(() => {
    // Compare the word you typed with the answer
    const actual = wordList[wordPos];
    const typed = curWord.trim();
    let correct;

    // Start the song + timer once the user has started typing
    if (typed !== '' && wordPos < wordList.length) setIsActive(true);
    else setCurWord('');

    // If user entered word (by pressing space), evaluate word
    if (typed.length > 0 && curWord.indexOf(' ') >= 0 && wordListStatus.length <= wordList.length) {
      setCurWord('');
      setTypedWordCount(typedWordCount + 1);

      if (ohShitTheLineChangedWhileIWasTyping) {
        correct = (typed === prevWord);
        if (correct) setScore(score + prevWord.length);
        setOhShitTheLineChangedWhileIWasTyping(false);
      } else {
        correct = (typed === actual);
        if (correct) setScore(score + actual.length);
        addWordListStatus(correct);
        setWordPos(wordPos + 1);
      }

      if (correct) setCorrectWordCount(correctWordCount + 1);
    }
  }, [curWord]);

  useEffect(() => {
    if (wordPos !== 0) setPrevWord(wordList[wordPos]);
  }, [wordPos]);

  useEffect(() => {
    if (linePos === lrc.length) reset();
    else setWordListStatus([]);
  }, [linePos]);

  useEffect(() => {
    if (isActive) {
      if (linePos < lrc.length - 1 && seconds >= lrc[linePos + 1].start) {
        // Line changes based on the time
        setOhShitTheLineChangedWhileIWasTyping(curWord !== '');
        setLinePos(linePos + 1);
        setWordPos(0);
      } else if (seconds > curSongLength + 10) {
        // Ends the typing session
        setIsActive(false);
        setCurWord('');
      }
    }

    // Runs a timer that updates every half second
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(Math.round((seconds + 0.5 + Number.EPSILON) * 100) / 100);
      }, 500);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <Head />
      <div style={{ padding: '20px', display: 'none', justifyContent: 'center', alignItems: 'center' }}>
        <ReactPlayer
          url={curSongUrl}
          playing={isActive}
          volume={volume}
        />
      </div>

      <div>
        <Stats
          wpm={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / seconds) * 60)}
          acc={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / typedWordCount) * 100)}
          points={score}
        />
        <div className="progress-bar">
          <Line strokeWidth="4" trailWidth="4" percent={seconds > curSongLength ? 100 : (seconds / curSongLength) * 100} />
        </div>
        <div className="typing-area">
          {wordList.map((word, i) => {
            let color = 'grey';
            if (i === wordListStatus.length) color = 'purple';
            else if (i < wordListStatus.length) color = wordListStatus[i] ? 'green' : 'red';

            return (
              <p
                key={i}
                style={{
                  display: 'inline',
                  color: [color],
                  fontWeight: i === wordListStatus.length && 'bold',
                  fontSize: i === wordListStatus.length ? '1.6rem' : '1rem',
                }}
              >
                {word}
                {' '}
              </p>
            );
          })}
          <br />
          {nextWordList.map((word, i) => {
            return (
              <p key={i} style={{ display: 'inline', color: 'grey' }}>
                {word}
                {' '}
              </p>
            );
          })}

          <div className="text-input-bar">
            <input className="input-field" type="text" value={curWord} onChange={handleCurWordChange} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" tabIndex="1" />
            <button className="redo-button" onClick={reset} tabIndex="2">
              redo
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Typing;
