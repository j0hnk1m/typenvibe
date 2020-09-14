import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Progress from 'react-progressbar';
import Head from './Head';
import Stats from './Stats';

const Typing = () => {
  // Global state
  const curSong = useSelector((state) => state.app.curSong);
  const curSongLength = useSelector((state) => state.app.curSongLength);
  const curSongUrl = useSelector((state) => state.app.curSongUrl);
  const volume = useSelector((state) => state.app.volume);
  const lrc = useSelector((state) => state.app.lrc);

  // Typing state
  const [linePos, setLinePos] = useState(0);
  const [wordPos, setWordPos] = useState(0);
  const [lastWord, setLastWord] = useState('');
  const [finishedPrevLine, setFinishedPrevLine] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [nextWordList, setNextWordList] = useState([]);
  const [wordListStatus, setWordListStatus] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typedWordCount, setTypedWordCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [curWord, setCurWord] = useState('');

  const reset = () => {
    setLinePos(0);
    setWordPos(0);
    setWordList([]);
    setWordListStatus([]);
    setNextWordList([]);
    setCorrectWordCount(0);
    setTypedWordCount(0);
    setSeconds(0);
    setIsActive(false);
    setCurWord('');
  };

  const finish = () => {
    setIsActive(false);
    setCurWord('');
  };

  const nextLine = () => {
    setFinishedPrevLine(true);
    setWordPos(0);
    setLinePos(linePos + 1);
  };

  const skipToNextLine = () => {
    setFinishedPrevLine(false);
    setLinePos(linePos + 1);
    setWordPos(0);
    setWordList(nextWordList);
  };

  const addWordListStatus = (newStatus) => setWordListStatus([...wordListStatus, newStatus]);
  const handleCurWordChange = (e) => setCurWord(e.target.value);

  // Only when curSong changes (not on mount / initial render) does it reset
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) reset();
    else didMountRef.current = true;
  }, [curSong]);

  useEffect(() => {
    // Compare the word you typed with the answer
    const actual = wordList[wordPos];
    const typed = curWord.trim();

    // Start the song + timer once the user has started typing
    if (typed !== '' && wordPos < wordList.length) setIsActive(true);
    else setCurWord('');

    // If user entered word (by pressing space), evaluate word
    if (typed.length > 0 && curWord.indexOf(' ') >= 0 && wordListStatus.length <= wordList.length) {
      setCurWord('');
      setTypedWordCount(typedWordCount + 1);
      const correct = actual === typed || (!finishedPrevLine && typed === lastWord);
      if (finishedPrevLine) addWordListStatus(correct);
      if (correct) setCorrectWordCount(correctWordCount + 1);

      if (!(wordPos === 0 && !finishedPrevLine)) setWordPos(wordPos + 1);
      setFinishedPrevLine(true);
    }
  }, [curWord]);

  useEffect(() => {
    if (wordPos !== 0) setLastWord(wordList[wordPos]);
  }, [wordPos]);

  useEffect(() => {
    if (linePos >= lrc.length) reset();
    if (curSong) {
      setWordList(lrc[linePos].text.split(' '));
      if (linePos < lrc.length - 2) setNextWordList(lrc[linePos + 1].text.split(' '));
      else setNextWordList([]);
    }
  }, [linePos]);

  // Runs a timer that updates every half second
  useEffect(() => {
    if (linePos < lrc.length - 1 && seconds >= lrc[linePos + 1].start) {
      if (curWord === '') nextLine();
      else skipToNextLine();
    } else if (seconds > curSongLength + 10) {
      finish();
    }

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
      {
        curSong
          && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ReactPlayer
              url={curSongUrl}
              playing={isActive}
              volume={volume}
            />
          </div>
          )
      }

      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>{seconds}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>last word: {lastWord}</p>
      </div>

      <div>
        <Stats
          wpm={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / seconds) * 60)}
          acc={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / typedWordCount) * 100)}
        />
        <Progress completed={seconds > curSongLength ? 100 : (seconds / curSongLength) * 100} />

        <div className="typing-area">
          {wordList.map((word, i) => {
            let color = 'grey';
            if (i === wordListStatus.length) color = 'purple';
            else if (i < wordListStatus.length) color = wordListStatus[i] ? 'green' : 'red';

            return (
              <p key={i} style={{ display: 'inline', color: [color] }}>
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
