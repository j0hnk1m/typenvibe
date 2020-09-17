import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Line } from 'rc-progress';
import Stats from './Stats';

// Levenshtein distance
const editDistance = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  const costs = new Array(str1.length);
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

const similarity = (str1, str2) => {
  let longer = str1;
  let shorter = str2;
  if (str1.length < str2.length) {
    longer = str2;
    shorter = str1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

const Typing = () => {
  // Global app state
  const curSong = useSelector((state) => state.app.curSong);
  const curSongLength = useSelector((state) => state.app.curSongLength);
  const curSongUrl = useSelector((state) => state.app.curSongUrl);
  const volume = useSelector((state) => state.app.volume);
  const lrc = useSelector((state) => state.app.lrc);

  // Local typing state
  const defaultTextBox = 'Type any key to start';
  const [linePos, setLinePos] = useState(0);
  const [wordPos, setWordPos] = useState(0);
  const [lineJustChanged, setLineJustChanged] = useState(false);
  const [wordListStatus, setWordListStatus] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typedWordCount, setTypedWordCount] = useState(0);
  const [curWord, setCurWord] = useState(defaultTextBox);
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
    setLineJustChanged(false);
    setWordListStatus([]);
    setCorrectWordCount(0);
    setTypedWordCount(0);
    setCurWord(defaultTextBox);
    setPrevWord('');
    setScore(0);
  };
  const addWordListStatus = (newStatus) => setWordListStatus([...wordListStatus, newStatus]);
  const handleCurWordChange = (e) => setCurWord(e.target.value.replace(defaultTextBox));

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

      if (lineJustChanged) {
        /*
        Two cases: user can either type prev word or current word
        We decide what the user was trying to type based on Levenshtein distance
        https://en.wikipedia.org/wiki/Levenshtein_distance
        */
        const prevWordMatch = similarity(typed, prevWord);
        const actualMatch = similarity(typed, actual);
        if (prevWordMatch > actualMatch) {
          // if user intended to type prev word
          correct = (typed === prevWord);
        } else {
          // if user intended to type cur word
          correct = (typed === actual);
          addWordListStatus(correct);
          setWordPos(wordPos + 1);
        }
        setLineJustChanged(false);
      } else {
        correct = (typed === actual);
        addWordListStatus(correct);
        setWordPos(wordPos + 1);
      }

      if (correct) {
        setScore(score + actual.length);
        setCorrectWordCount(correctWordCount + 1);
      }
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
        setLineJustChanged(true);
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
      <div style={{ display: 'none', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <ReactPlayer
          url={curSongUrl}
          playing={isActive}
          volume={volume}
        />
      </div>
      <div className="flex col-span-1 h-20 justify-end">
        <Stats
          wpm={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / seconds) * 60)}
          acc={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / typedWordCount) * 100)}
          score={score}
        />
      </div>
      <div className="flex col-span-2 h-12 items-center justify-center">
        <Line strokeWidth="4" trailWidth="4" percent={seconds > curSongLength ? 100 : (seconds / curSongLength) * 100} />
      </div>
      <div className="flex col-span-2 h-48 items-center justify-center">
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
