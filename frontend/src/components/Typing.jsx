import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/file';
import AudioSpectrum from 'react-audio-spectrum';
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
  const mode = useSelector((state) => state.app.mode);

  // local typing state
  const [linePos, setLinePos] = useState(0);
  const [wordPos, setWordPos] = useState(0);
  const [lineJustChanged, setLineJustChanged] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [nextWordList, setNextWordList] = useState([]);
  const [wordListStatus, setWordListStatus] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typedWordCount, setTypedWordCount] = useState(0);
  const [curWord, setCurWord] = useState('');
  const [prevWord, setPrevWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [playerKey, setPlayerKey] = useState(0);

  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    setLinePos(0);
    setWordPos(0);
    setWordList([]);
    setNextWordList([]);
    setWordListStatus([]);
    setLineJustChanged(false);
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

    switch (mode) {
      case 'default':
        // prevents user from typing before the start (actual 0 s start or next line start)
        if (seconds >= lrc[0].start && wordPos < wordList.length && ((linePos + 1 < lrc.length && seconds < lrc[linePos + 1].start) || (linePos === lrc.length - 1))) {
          setCurWord(e.target.value);
        }
        break;
      case 'chill':
        setCurWord(e.target.value);
        break;
      default:
    }
  };

  // since change in curSong results in delayed change in lrc, lrc is dependency
  useEffect(() => {
    reset();
    switch (mode) {
      case 'default':
        setWordList(lrc[linePos].text.split(' '));
        setNextWordList((linePos <= lrc.length - 2) ? lrc[linePos + 1].text.split(' ') : []);
        break;
      case 'chill':
        const wordsStr = lrc.map((line) => line.text).join(' ');
        setWordList(wordsStr.slice(0, Math.floor(wordsStr.length / 2)).split(' ').filter((word) => word));
        setNextWordList(wordsStr.slice(Math.floor(wordsStr.length / 2), wordsStr.length).split(' ').filter((word) => word));
        break;
      default:
    }
  }, [lrc]);

  useEffect(() => {
    const actual = wordList[wordPos];
    const typed = curWord.trim();
    let correct = false;

    switch (mode) {
      case 'default':
        // user entered word (by pressing space), evaluate word
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
        }
        break;
      case 'chill':
        if (typed.length > 0 && curWord.indexOf(' ') >= 0 && wordListStatus.length <= wordList.length) {
          setCurWord('');
          setTypedWordCount(typedWordCount + 1);
          correct = actual === typed;
          addWordListStatus(correct);
          setWordPos(wordPos + 1);
        }
        break;
      default:
    }

    // update info if correct
    if (correct) {
      setScore(score + actual.length);
      setCorrectWordCount(correctWordCount + 1);
    }
  }, [curWord]);

  useEffect(() => {
    if (wordPos !== 0) setPrevWord(wordList[wordPos]);
  }, [wordPos]);

  useEffect(() => {
    switch (mode) {
      case 'default':
        if (linePos === lrc.length) {
          reset();
        } else {
          setWordListStatus([]);
          setWordList(nextWordList);
          setNextWordList(linePos + 1 < lrc.length ? lrc[linePos + 1].text.split(' ') : []);
        }
        break;
      case 'chill':
      default:
    }
  }, [linePos]);

  useEffect(() => {
    if (isActive) {
      switch (mode) {
        case 'default':
          // line changes based on the time
          if (linePos < lrc.length - 1 && seconds >= lrc[linePos + 1].start) {
            setLineJustChanged(true);
            setLinePos(linePos + 1);
            setWordPos(0);
          }

          // song ended, so end the typing session
          if (seconds > curSongLength + 5) {
            setIsActive(false);
            setCurWord('');
          }
          break;
        case 'chill':
          if (wordPos >= wordList.length && nextWordList) {
            setWordPos(0);
            setWordListStatus([]);
            setWordList(nextWordList);
            setNextWordList([]);
          }
          break;
        default:
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

  // placeholder text for the input field
  let inputPlaceholder;
  if (!isActive) {
    inputPlaceholder = 'type-any-key-to-start';
  } else if (mode === 'default' && seconds < lrc[0].start) {
    inputPlaceholder = `starting in ${Math.floor(lrc[0].start - seconds)}s`;
  }

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
          wpm={correctWordCount === 0 ? '0' : Math.round((correctWordCount / seconds) * 60)}
          acc={correctWordCount === 0 ? '0' : Math.round((correctWordCount / typedWordCount) * 100)}
          score={score}
        />
      </div>

      <div className="flex flex-col col-span-2 h-12 items-center justify-center">
        <Line strokeWidth="1" percent={seconds > curSongLength ? 100 : (seconds / curSongLength) * 100} />
      </div>

      <div className="flex flex-col col-span-2 justify-between w-full bg-typing border-2 rounded-lg border-transparent bg-white p-3 text-center leading-relaxed">
        <div className="mb-3">
          <div className={`flex ${mode === 'default' ? 'justify-center' : 'justify-start'} items-center flex-wrap w-full overflow-hidden`}>
            {wordList.map((word, i) => {
              let color = 'text-typing';
              let fontSize = mode === 'default' ? 'text-xl' : 'text-base';
              let fontWeight = 'font-normal';
              if (i === wordListStatus.length) {
                color = 'text-current';
                fontSize = 'text-3xl';
                fontWeight = 'font-extrabold';
              } else if (i < wordListStatus.length) {
                color = wordListStatus[i] ? 'text-correct' : 'text-wrong';
              }

              const styles = `${color} ${fontSize} ${fontWeight} text-opacity-100 mx-1`;
              return (
                <p key={i} className={styles}>
                  {word}
                </p>
              );
            })}
          </div>

          <div className="h-8 w-4/5 mx-auto">
            <p className="text-typing text-center opacity-50 mx-1 truncate">
              {nextWordList.join(' ')}
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <input
            className="w-11/12 mr-3 bg-input border-2 rounded-lg border-transparent text-xl p-1 text-typing placeholder-input"
            type="text"
            value={curWord}
            placeholder={inputPlaceholder}
            onChange={handleCurWordChange}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <button className="transition duration-300 ease-in-out bg-redo hover:bg-redo-hover transform hover:scale-110 py-2 px-2 rounded-lg text-redo" type="submit" onClick={reset}>
            redo
          </button>
        </div>
      </div>
    </>
  );
};

export default Typing;
