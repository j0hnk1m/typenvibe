import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong } from 'state/app';

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const typingMode = useSelector((state) => state.app.typingMode);
  const [sel, setSel] = useState({ value: curSong, label: curSong !== null ? `${songs[curSong].title} - ${songs[curSong].artist}` : '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (sel.value !== null) {
      dispatch(setCurSong(sel.value));
      dispatch(getLrc(songs[sel.value].lrc, typingMode));
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
        />
      </div>
    </>
  );
};

export default Boombox;
