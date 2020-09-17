import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import { Line } from 'rc-progress';
import Stats from './Stats';

// levenshtein distance
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
  // global app state
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const curSongLength = useSelector((state) => state.app.curSongLength);
  const volume = useSelector((state) => state.app.volume);
  const lrc = useSelector((state) => state.app.lrc);

  // local typing state
  const [linePos, setLinePos] = useState(0);
  const [wordPos, setWordPos] = useState(0);
  const [lineJustChanged, setLineJustChanged] = useState(false);
  const [wordListStatus, setWordListStatus] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typedWordCount, setTypedWordCount] = useState(0);
  const [curWord, setCurWord] = useState('');
  const [prevWord, setPrevWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [playerKey, setPlayerKey] = useState(0);
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
    setCurWord('');
    setPrevWord('');
    setScore(0);
    setPlayerKey(playerKey + 1);
  };

  const addWordListStatus = (newStatus) => setWordListStatus([...wordListStatus, newStatus]);
  const handleCurWordChange = (e) => {
    // start the song + timer if user has typed something
    if (!isActive) setIsActive(true);

    // prevents user from typing before the start
    else if (seconds >= lrc[0].start) setCurWord(e.target.value);
  };

  useEffect(() => {
    reset();
  }, [curSong]);

  useEffect(() => {
    const actual = wordList[wordPos];
    const typed = curWord.trim();
    let correct;

    // if user entered word (by pressing space), evaluate word
    if (seconds > lrc[0].start && (typed.length > 0 && curWord.indexOf(' ') >= 0 && wordListStatus.length <= wordList.length)) {
      setCurWord('');
      setTypedWordCount(typedWordCount + 1);

      if (lineJustChanged && prevWord) {
        /*
        two cases: user can either type prev word or current word.
        we decide what the user was trying to type based on Levenshtein distance
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
        // line changes based on the time
        setLineJustChanged(true);
        setLinePos(linePos + 1);
        setWordPos(0);
      } else if (seconds > curSongLength + 10) {
        // ends the typing session
        setIsActive(false);
        setCurWord('');
      }
    }

    // runs a timer that updates every half second
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
      <ReactPlayer
        key={playerKey}
        url={songs[curSong].url}
        playing={isActive}
        volume={volume}
        style={{ display: 'none' }}
      />

      <div className="flex flex-col col-span-1 h-20 justify-center">
        <Stats
          wpm={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / seconds) * 60)}
          acc={correctWordCount === 0 ? 'XX' : Math.round((correctWordCount / typedWordCount) * 100)}
          score={score}
        />
      </div>

      <div className="flex flex-col col-span-2 h-12 items-center justify-center">
        <Line strokeWidth="1" percent={seconds > curSongLength ? 100 : (seconds / curSongLength) * 100} />
      </div>

      <div className="flex col-span-2 h-48">
        <div className="w-full border-2 rounded-lg border-gray-400 bg-white p-3 flex flex-col text-center leading-relaxed">
          <div className="mb-4">
            <div className="flex justify-start items-center break-normal flex-wrap w-9/12">
              {wordList.map((word, i) => {
                let color = 'text-gray-600';
                let fontSize = 'text-base';
                let fontWeight = 'font-normal';
                if (i === wordListStatus.length && seconds >= lrc[0].start) {
                  color = 'text-gray-900';
                  fontSize = 'text-3xl';
                  fontWeight = 'font-extrabold';
                } else if (i < wordListStatus.length) {
                  color = wordListStatus[i] ? 'text-green-400' : 'text-red-400';
                }

                const styles = `${color} ${fontSize} ${fontWeight} text-opacity-100 mx-1`;

                return (
                  <p key={i} className={styles}>
                    {word}
                  </p>
                );
              })}
            </div>
            <div className="flex justify-end float-right items-center flex-wrap w-9/12">
              {nextWordList.map((word, i) => (
                <p key={i} className="inline text-gray-600 text-opacity-50 mx-1 break-normal">
                  {word}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <input className={`w-11/12 border-2 rounded-lg border-gray-400 text-xl p-1 ${isActive ? 'text-gray-700' : 'text-gray-500'}`} type="text" value={curWord} placeholder={isActive ?  (seconds < lrc[0].start ? `starting in ${Math.floor(lrc[0].start - seconds)}s` : curWord) : 'type-any-key-to-start'} onChange={handleCurWordChange} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
            <button className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:scale-110 py-2 px-2 rounded-lg text-white" type="submit" onClick={reset}>
              redo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Typing;
