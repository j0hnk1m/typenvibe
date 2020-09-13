import axios from 'axios';
import { useStaticQuery, graphql } from 'gatsby';
import lrcParser from 'lrc-parser';

const initialState = {
  songs: [],
  curSong: null,
  curSongUrl: null,
  curSongLength: 0,
  typingMode: 'basic',
  isPlaying: false,
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
  const lrctest="\ufeff[00:00.00]by RentAnAdviser.com\n[00:00.00]\n[00:14.11]I just pretend that I am in the dark\n[00:23.81]\n[00:23.91]I don′t regret ′cause my heart can′t take a loss\n[00:32.71]\n[00:32.81]I had rather be so oblivious\n[00:37.81]\n[00:37.90]I had rather be with you\n[00:42.10]\n[00:43.40]When It is said‚ when It is done‚ yeah\n[00:45.60]\n[00:45.71]I don′t ever wanna know\n[00:48.01]\n[00:48.12]I can tell what you done‚ yeah\n[00:50.32]\n[00:50.41]When I look at you\n[00:52.01]\n[00:52.11]In your eyes\n[00:54.61]\n[00:54.72]I see there′s something burning inside you\n[00:58.72]\n[00:58.81]Oh‚ inside you\n[01:01.21]\n[01:01.30]In your eyes‚ I know it hurts to smile but you try to\n[01:08.30]\n[01:08.41]Oh‚ you try to\n[01:10.91]\n[01:11.01]You always try to hide the pain\n[01:13.31]\n[01:13.41]You always know just what to say\n[01:15.51]\n[01:15.61]I always look the other way\n[01:18.41]\n[01:18.50]I am blind‚ I am blind\n[01:20.40]\n[01:20.51]In your eyes‚ you lie‚ but I don′t let it define you\n[01:27.81]\n[01:27.91]Oh‚ define you\n[01:31.01]\n[01:31.12]I tried to find love\n[01:35.02]\n[01:35.11]In someone else too many times\n[01:40.31]\n[01:40.40]But I hope you know I mean it (Mean it)\n[01:44.80]\n[01:44.91]When I tell you You are the one that was on my mind‚ oh\n[01:50.71]\n[01:50.81]When It is said‚ when It is done‚ yeah\n[01:52.81]\n[01:52.91]I would never let you know (Let you know)\n[01:55.41]\n[01:55.52]I am ashamed of what I have done‚ yeah\n[01:57.62]\n[01:57.71]When I look at you\n[01:59.21]\n[01:59.30]In your eyes (Your eyes)\n[02:02.00]\n[02:02.11]I see there′s something burning inside you (Inside you)\n[02:06.01]\n[02:06.10]Oh‚ inside you (Oh‚ inside you)\n[02:08.70]\n[02:08.82]In your eyes‚ I know it hurts to smile but you try to (But you try to)\n[02:15.21]\n[02:15.30]Oh‚ you try to (You try to)\n[02:18.75]\n[02:18.80]You always try to hide the pain\n[02:21.00]\n[02:21.10]You always know just what to say (Oh‚ dear)\n[02:22.90]\n[02:23.01]I always look the other way\n[02:25.20]\n[02:25.30]I am blind‚ I am blind\n[02:27.80]\n[02:27.92]In your eyes‚ you lie‚ but I don′t let it define you\n[02:34.51]\n[02:34.61]Oh‚ define you\n[02:37.91]\n[02:46.71]In your eyes\n[02:49.71]\n[02:49.81]I see there′s something burning inside you\n[02:53.91]\n[02:54.00]Oh‚ inside you\n[02:56.60]\n[02:56.71]You always try to hide the pain\n[02:59.01]\n[02:59.10]You always know just what to say\n[03:01.20]\n[03:01.30]I always look the other way\n[03:03.60]\n[03:03.72]I am blind‚ I am blind\n[03:06.22]\n[03:06.32]In your eyes‚ you lie‚ but I don′t let it define you\n[03:13.32]\n[03:13.40]Oh‚ define you\n[03:17.20]\n[03:18.20]by RentAnAdviser.com\n[03:27.20]\n";
  const data = lrcParser(lrc.toString('utf8'));

  if (data) {
    const length = data.scripts[data.scripts.length - 1].end;
    dispatch(setCurSongLength(length));

    // Trims garbage if LRC file is from RentAnAdviser.com
    const cleaned = data.scripts.filter((line) => !line.text.includes('RentAnAdviser'));

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

const SET_ISPLAYING = 'SET_ISPLAYING';
export const setIsPlaying = (isPlaying) => (dispatch) => {
  dispatch({
    type: SET_ISPLAYING,
    payLoad: isPlaying,
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
    case SET_ISPLAYING:
      return { ...state, isPlaying: action.payload };
    default:
      return state;
  }
};

export default reducer;
