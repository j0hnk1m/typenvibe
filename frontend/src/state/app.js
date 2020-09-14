import axios from 'axios';
import { useStaticQuery, graphql } from 'gatsby';
import lrcParser from 'lrc-parser';

const initialState = {
  songs: [],
  curSong: null,
  curSongUrl: null,
  curSongLength: 0,
  typingMode: 'basic',
  lrcBasic: [],         // all lowercase, no punctuation
  lrcPunc: [],          // lrcBasic + punctuation
  lrcUpper: [],         // lrcBasic + uppercase
  lrcProper: [],        // lrcBasic + punctuation + uppercase
};

const config = () => (
  {
    headers: {
      'Content-Type': null,
      Accept: '*/*',
    },
  }
);

const GET_SONGS = 'GET_SONGS';
export const getSongs = () => (dispatch) => {
  const query = useStaticQuery(graphql`
    query IndexQuery {
      allS3Object {
        edges {
          node {
            Key
          }
        }
      }
    }
  `);
  dispatch({
    type: GET_SONGS,
    payload: query.allS3Object.edges.map((edge) => edge.node),
  });
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

const SET_LRCBASIC = 'SET_LRCBASIC';
export const setLrcBasic = (lrcBasic) => (dispatch) => {
  dispatch({
    type: SET_LRCBASIC,
    payload: lrcBasic,
  });
};

const SET_LRCPUNC = 'SET_LRCPUNC';
export const setLrcPunc = (lrcPunc) => (dispatch) => {
  dispatch({
    type: SET_LRCPUNC,
    payload: lrcPunc,
  });
};

const SET_LRCUPPER = 'SET_LRCUPPER';
export const setLrcUpper = (lrcUpper) => (dispatch) => {
  dispatch({
    type: SET_LRCUPPER,
    payload: lrcUpper,
  });
};

const SET_LRCPROPER = 'SET_LRCPROPER';
export const setLrcProper = (lrcProper) => (dispatch) => {
  dispatch({
    type: SET_LRCPROPER,
    payload: lrcProper,
  });
};

// Parses the LRC file received from action GET_LRC and sets curSongLength, lrc, and lrcPunc
const parseLrc = (lrc) => (dispatch) => {
  const data = lrcParser(lrc.toString('utf8'));

  if (data) {
    const length = data.scripts[data.scripts.length - 1].end;
    dispatch(setCurSongLength(length));

    // Trims garbage if LRC file is from RentAnAdviser.com
    let cleaned = data.scripts.filter((line) => !line.text.includes('RentAnAdviser'));
    cleaned = cleaned.map(({ start, text, end }) => ({ start, text: text.trim(), end }));
    cleaned = cleaned.filter((line) => line.text);

    const lrcProper = cleaned.map(({ start, text, end }) => ({ start, text: text.trim(), end }));
    const lrcUpper = lrcProper.map(({ start, text, end }) => ({ start, text: text.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '), end }));
    const lrcPunc = lrcProper.map(({ start, text, end }) => ({ start, text: text.toLowerCase(), end }));
    const lrcBasic = lrcUpper.map(({ start, text, end }) => ({ start, text: text.toLowerCase(), end }));

    dispatch(setLrcPunc(lrcPunc));
    dispatch(setLrcUpper(lrcUpper));
    dispatch(setLrcProper(lrcProper));
    return lrcBasic;
  }
  return null;
};

const GET_LRC = 'GET_LRC';
export const getLrc = (key) => (dispatch) => {
  axios.get(`https://${process.env.CLOUDFRONT_URL}/${key}`, config())
    .then((res) => {
      dispatch({
        type: GET_LRC,
        payload: dispatch(parseLrc(res.data)),
      });
    })
    .catch((err) => console.log(err));
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
      return { ...state, songs: action.payload };
    case GET_LRC:
      return { ...state, lrcBasic: action.payload };
    case SET_LRCPUNC:
      return { ...state, lrcPunc: action.payload };
    case SET_LRCUPPER:
      return { ...state, lrcUpper: action.payload };
    case SET_LRCPROPER:
      return { ...state, lrcProper: action.payload };
    case SET_CURSONG:
      return { ...state, curSong: action.payload };
    case SET_CURSONGURL:
      return { ...state, curSongUrl: action.payload };
    case SET_CURSONGLENGTH:
      return { ...state, curSongLength: action.payload };
    case SET_TYPINGMODE:
      return { ...state, typingMode: action.payload };
    default:
      return state;
  }
};

export default reducer;
