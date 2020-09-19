import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong } from 'state/app';

// const selectStyle = {
//   control: styles => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     return {
//       ...styles,
//       backgroundColor: '#1a1a1a',
//       color: '#FFF',
//       cursor: isDisabled ? 'not-allowed' : 'default',
//     };
//   },
// };

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const typingMode = useSelector((state) => state.app.typingMode);
  const [sel, setSel] = useState({ value: curSong, label: curSong !== null ? `${songs[curSong].title} - ${songs[curSong].artist}` : '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (sel.value !== null) {
      dispatch(setCurSong(sel.value));
      dispatch(getLrc({
        key: songs[sel.value].key,
        delay: songs[sel.value].delay,
        typingMode,
      }));
    }
  }, [sel]);

  const options = songs
    ? Object.keys(songs).map((i) => ({ value: Number(i), label: `${songs[i].title} - ${songs[i].artist}` }))
    : [];

  return (
    <>
      <div className="w-full">
        <Select
          value={sel}
          options={options}
          onChange={setSel}
          // styles={selectStyle}
        />
      </div>
    </>
  );
};

export default Boombox;
