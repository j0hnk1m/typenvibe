import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong, setCurSongUrl } from 'state/app';

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const lrcBasic = useSelector((state) => state.app.lrcBasic);

  const dispatch = useDispatch();
  const [sel, setSel] = useState({ value: curSong || '', label: curSong || '' });

  useEffect(() => {
    dispatch(setCurSong(sel.value));
    dispatch(setCurSongUrl('https://www.youtube.com/watch?v=HWoRAxXRg14'));
    if (curSong && (sel.value !== curSong || lrcBasic.length === 0)) dispatch(getLrc(sel.value));
  }, [sel]);

  const options = songs.map((node) => ({ value: node.Key, label: node.Key }));

  return (
    <>
      <Select
        value={sel}
        options={options}
        onChange={setSel}
      />
    </>
  );
};

export default Boombox;
