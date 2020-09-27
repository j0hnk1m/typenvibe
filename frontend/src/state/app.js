import axios from 'axios';
import lrcParser from 'lrc-parser';

// constants
const CLOUDFRONT_URL = 'https://darjms2fiq11j.cloudfront.net';
const SPOTIFY_URL = 'https://api.spotify.com/v1/tracks';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com';
const SONGLIST = 'songs.csv';

const initialState = {
  songs: {},
  curSong: null,
  mode: 'default',
  grammar: 'basic',
  lrc: [],
  theme: 'light',
  loading: false,
  auth: null,
};

const config = (spotifyAuthToken) => (
  {
    headers: {
      Authorization: `Bearer ${spotifyAuthToken}`,
    },
  }
);

// Action Types
const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';
const GET_SONGS = 'GET_SONGS';
const GET_TRACK_INFO = 'GET_TRACK_INFO';
const SET_CURSONG = 'SET_CURSONG';
const GET_LRC = 'GET_LRC';
const SET_THEME = 'SET_THEME';
const SET_GRAMMAR = 'SET_GRAMMAR';
const SET_AUTH = 'SET_AUTH';
const SET_MODE = 'SET_MODE';
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

export const getTrackInfo = (spotifyTrackId, spotifyAuthToken) => (dispatch) => {
  axios.get(`${CORS_PROXY}/${SPOTIFY_URL}/${spotifyTrackId}`, config(spotifyAuthToken))
    .then((res) => {
      const trackInfo = {
        id: res.data.id,
        name: res.data.name,
        artists: res.data.artists.map((artist) => artist.name),
        duration: res.data.duration_ms / 1000,
        previewUrl: res.data.preview_url,
      };

      dispatch({
        type: GET_TRACK_INFO,
        payload: { ...trackInfo },
      });
    })
    .catch((err) => console.log(err));
};

export const getSongs = (spotifyAuthToken) => (dispatch) => {
  axios.get(`${CORS_PROXY}/${CLOUDFRONT_URL}/${SONGLIST}`)
    .then((res) => {
      const data = res.data.split('\n').filter((line) => line);
      data.shift();
      const songs = data.filter((line) => line).map((song) => {
        const parts = song.split(',');
        const [spotifyTrackId, delay, difficulty] = parts || {};

        // axios is async, so this independently edits the state
        dispatch(getTrackInfo(spotifyTrackId, spotifyAuthToken));

        return {
          spotifyTrackId,
          delay,
          difficulty: difficulty.trim(),
        };
      });

      dispatch({
        type: GET_SONGS,
        payload: { ...songs },
      });
    })
    .catch((err) => console.log(err));
};

// parses the LRC file received from action GET_LRC
const parseLrc = ({ lrc, delay, grammar } = {}) => (dispatch) => {
  const data = lrcParser(lrc.toString('utf8'));

  if (data) {
    const offset = delay ? Number(delay) : 0;

    // trims garbage if LRC file is from RentAnAdviser.com
    let cleaned = data.scripts.filter((line) => !line.text.includes('RentAnAdviser'));

    cleaned = cleaned.map(({ start, text, end }) => ({ start: start - offset, text: text.trim(), end: end - offset })).filter((line) => line.text);

    // joins two verses into one line
    // cleaned = cleaned.flatMap((line, i) => {
    //   if (i < cleaned.length - 1 && i % 2 === 0) return { start: line.start, text: line.text.concat(' ', cleaned[i + 1].text), end: cleaned[i + 1].end };
    //   if (i % 2 === 0) return line;
    //   return [];
    // });

    const lrcProper = cleaned.map(({ start, text, end }) => ({ start, text: text.trim(), end }));
    const lrcUpper = lrcProper.map(({ start, text, end }) => ({ start, text: text.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '), end }));
    const lrcPunc = lrcProper.map(({ start, text, end }) => ({ start, text: text.toLowerCase(), end }));
    const lrcBasic = lrcUpper.map(({ start, text, end }) => ({ start, text: text.toLowerCase(), end }));

    switch (grammar) {
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

export const getLrc = ({ spotifyTrackId, delay, grammar } = {}) => (dispatch) => {
  dispatch(startLoading());
  axios.get(`${CORS_PROXY}/${CLOUDFRONT_URL}/${spotifyTrackId}.lrc`, config())
    .then((res) => {
      dispatch({
        type: GET_LRC,
        payload: dispatch(parseLrc({
          lrc: res.data,
          delay,
          grammar,
        })),
      });
      dispatch(endLoading());
    })
    .catch((err) => console.log(err));
};

export const setTheme = (theme) => (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: theme,
  });
};

export const setGrammar = (grammar) => (dispatch) => {
  dispatch({
    type: SET_GRAMMAR,
    payload: grammar,
  });
};

export const setAuth = (auth) => (dispatch) => {
  dispatch({
    type: SET_AUTH,
    payload: auth,
  });
};

export const setMode = (mode) => (dispatch) => {
  dispatch({
    type: SET_MODE,
    payload: mode,
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
    case GET_TRACK_INFO:
      const updated = Object.keys(state.songs).find((i) => state.songs[i].spotifyTrackId === action.payload.id);
      const { id, ...rest } = action.payload;
      return { ...state, songs: { ...state.songs, [updated]: { ...state.songs[updated], ...rest } } };
    case GET_LRC:
      return { ...state, lrc: action.payload };
    case SET_CURSONG:
      return { ...state, curSong: action.payload };
    case SET_GRAMMAR:
      return { ...state, grammar: action.payload };
    case SET_AUTH:
      return { ...state, auth: action.payload };
    case SET_MODE:
      return { ...state, mode: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
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
