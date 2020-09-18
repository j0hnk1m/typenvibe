import axios from 'axios';
import lrcParser from 'lrc-parser';

const REVERSE_PROXY = 'https://cors-anywhere.herokuapp.com';
const SONGLIST = 'songlist_6.txt';

const initialState = {
  songs: {},
  curSong: null,
  curSongLength: 0,
  volume: 0.5,
  typingMode: 'basic',
  lrc: [],
  theme: 'default',
  loading: false,
};

const config = () => (
  {
    headers: {
      'Content-Type': null,
      Accept: '*/*',
    },
  }
);

// Action Types
const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';
const GET_SONGS = 'GET_SONGS';
const SET_CURSONG = 'SET_CURSONG';
const SET_CURSONGLENGTH = 'SET_CURSONGLENGTH';
const GET_LRC = 'GET_LRC';
const SET_VOLUME = 'SET_VOLUME';
const SET_TYPINGMODE = 'SET_TYPINGMODE';
const RESET = 'RESET';

export const startLoading = () => (dispatch) => {
  dispatch({
    type: START_LOADING,
  });
};

export const endLoading = () => (dispatch) => {
  dispatch({
    type: END_LOADING,
  });
};

export const getSongs = () => (dispatch) => {
  axios.get(`https://${process.env.CLOUDFRONT_URL}/${SONGLIST}`, config())
    .then((res) => {
      const songs = res.data.split('\n').map((song) => {
        const parts = song.split(',');
        const [title, artist] = parts[0].split(' - ');
        return { title, artist, lrc: parts[1].trim(), url: parts[2].trim(), delay: parts[3] };
      });

      dispatch({
        type: GET_SONGS,
        payload: { ...songs },
      });
    })
    .catch((err) => console.log(err));
};

export const setCurSongLength = (curSongLength) => (dispatch) => {
  dispatch({
    type: SET_CURSONGLENGTH,
    payload: curSongLength,
  });
};

// Parses the LRC file received from action GET_LRC and sets curSongLength, lrc, and lrcPunc
const parseLrc = ({ lrc, delay, typingMode } = {}) => (dispatch) => {
  const data = lrcParser(lrc.toString('utf8'));

  if (data) {
    const length = data.scripts[data.scripts.length - 1].end;
    const offset = delay ? Number(delay) : 0;
    dispatch(setCurSongLength(length));

    // Trims garbage if LRC file is from RentAnAdviser.com
    let cleaned = data.scripts.filter((line) => !line.text.includes('RentAnAdviser'));

    cleaned = cleaned.map(({ start, text, end }) => ({ start: start - offset, text: text.trim(), end: end - offset })).filter((line) => line.text);
    cleaned = cleaned.flatMap((line, i) => {
      if (i < cleaned.length - 1 && i % 2 === 0) return { start: line.start, text: line.text.concat(' ', cleaned[i + 1].text), end: cleaned[i + 1].end };
      if (i % 2 === 0) return line;
      return [];
    });

    console.log(cleaned)
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

export const getLrc = ({ key, delay, typingMode } = {}) => (dispatch) => {
  dispatch(startLoading());
  axios.get(`https://${process.env.CLOUDFRONT_URL}/${key}`, config())
    .then((res) => {
      dispatch({
        type: GET_LRC,
        payload: dispatch(parseLrc({
          lrc: res.data,
          delay,
          typingMode,
        })),
      });
      dispatch(endLoading());
    })
    .catch((err) => console.log(err));
};

export const setVolume = (volume) => (dispatch) => {
  dispatch({
    type: SET_VOLUME,
    payload: volume,
  });
};

export const setTypingMode = (typingMode) => (dispatch) => {
  dispatch({
    type: SET_TYPINGMODE,
    payload: typingMode,
  });
};

export const setCurSong = (curSong) => (dispatch) => {
  dispatch({
    type: SET_CURSONG,
    payload: curSong,
  });
};

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
    case SET_CURSONGLENGTH:
      return { ...state, curSongLength: action.payload };
    case SET_TYPINGMODE:
      return { ...state, typingMode: action.payload };
    case START_LOADING:
      return { ...state, loading: true };
    case END_LOADING:
      return { ...state, loading: false };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
