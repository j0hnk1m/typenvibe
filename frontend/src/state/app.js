import axios from 'axios';
import lrcParser from 'lrc-parser';

const initialState = {
  songs: [],
  curSong: null,
  curSongUrl: null,
  curSongLength: 0,
  volume: 1,
  typingMode: 'basic',
  lrc: [],
};

const config = () => (
  {
    headers: {
      'Content-Type': null,
      Accept: '*/*',
    },
  }
);

const REVERSE_PROXY = 'https://cors-anywhere.herokuapp.com';

const GET_SONGS = 'GET_SONGS';
export const getSongs = () => (dispatch) => {
  axios.get(`${REVERSE_PROXY}/https://${process.env.CLOUDFRONT_URL}/songs.txt`, config())
    .then((res) => {
      dispatch({
        type: GET_SONGS,
        payload: res.data.split('\n'),
      });
    })
    .catch((err) => console.log(err));
};

const SET_CURSONGURL = 'SET_CURSONGURL';
export const setCurSongUrl = (curSongUrl) => (dispatch) => {
  dispatch({
    type: SET_CURSONGURL,
    payload: curSongUrl,
  });
};

const SET_CURSONGLENGTH = 'SET_CURSONGLENGTH';
export const setCurSongLength = (curSongLength) => (dispatch) => {
  dispatch({
    type: SET_CURSONGLENGTH,
    payload: curSongLength,
  });
};

// Parses the LRC file received from action GET_LRC and sets curSongLength, lrc, and lrcPunc
const parseLrc = (lrc, typingMode) => (dispatch) => {
  const data = lrcParser(lrc.toString('utf8'));

  if (data) {
    const length = data.scripts[data.scripts.length - 1].end;
    dispatch(setCurSongLength(length));

    // Trims garbage if LRC file is from RentAnAdviser.com
    let cleaned = data.scripts.filter((line) => !line.text.includes('RentAnAdviser'));
    cleaned = cleaned.map(({ start, text, end }) => ({ start, text: text.trim(), end })).filter((line) => line.text);
    cleaned = cleaned.flatMap((line, i) => {
      if (i < cleaned.length - 1 && i % 2 === 0) return { start: line.start, text: line.text.concat(' ', cleaned[i + 1].text), end: cleaned[i + 1].end };
      if (i % 2 === 0) return line;
      return [];
    });
    const lrcProper = cleaned.map(({ start, text, end }) => ({ start, text: text.trim(), end }));
    const lrcUpper = lrcProper.map(({ start, text, end }) => ({ start, text: text.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '), end }));
    const lrcPunc = lrcProper.map(({ start, text, end }) => ({ start, text: text.toLowerCase(), end }));
    const lrcBasic = lrcUpper.map(({ start, text, end }) => ({ start, text: text.toLowerCase(), end }));

    switch (typingMode) {
      case 'basic':
        return lrcBasic;
      case 'punc':
        return lrcPunc;
      case 'upper':
        return lrcUpper;
      default:
        return lrcProper;
    }
  }
  return null;
};

const GET_LRC = 'GET_LRC';
export const getLrc = (key, typingMode) => (dispatch) => {
  axios.get(`https://${process.env.CLOUDFRONT_URL}/${key}`, config())
    .then((res) => {
      dispatch({
        type: GET_LRC,
        payload: dispatch(parseLrc(res.data, typingMode)),
      });
    })
    .catch((err) => console.log(err));
};

const SET_VOLUME = 'SET_VOLUME';
export const setVolume = (volume) => (dispatch) => {
  dispatch({
    type: SET_VOLUME,
    payload: volume,
  });
};

const SET_TYPINGMODE = 'SET_TYPINGMODE';
export const setTypingMode = (typingMode) => (dispatch) => {
  dispatch({
    type: SET_TYPINGMODE,
    payload: typingMode,
  });
};

const SET_CURSONG = 'SET_CURSONG';
export const setCurSong = (curSong) => (dispatch) => {
  dispatch({
    type: SET_CURSONG,
    payload: curSong,
  });
};

const RESET = 'RESET';
export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
      return { ...state, songs: action.payload };
    case GET_LRC:
      return { ...state, lrc: action.payload };
    case SET_CURSONG:
      return { ...state, curSong: action.payload };
    case SET_CURSONGURL:
      return { ...state, curSongUrl: action.payload };
    case SET_CURSONGLENGTH:
      return { ...state, curSongLength: action.payload };
    case SET_TYPINGMODE:
      return { ...state, typingMode: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
