import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong, setCurSongUrl } from 'state/app';

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const typingMode = useSelector((state) => state.app.typingMode);
  const [sel, setSel] = useState({ value: curSong || '', label: curSong || '' });
  const dispatch = useDispatch();

  const temp = {
    'believer_imagineDragons.lrc': 'https://www.youtube.com/watch?v=IhP3J0j9JmY',
    'blindingLights_weeknd.lrc': 'https://www.youtube.com/watch?v=fHI8X4OXluQ',
    'dynamite_bts.lrc': 'https://www.youtube.com/watch?v=OiMWFojB9Ok',
    'allOfMe_johnLegend.lrc': 'https://www.youtube.com/watch?v=Mk7-GRWq7wA',
  };

  useEffect(() => {
    if (sel.value !== curSong) {
      dispatch(setCurSong(sel.value));
      dispatch(setCurSongUrl(temp[sel.value]));
      dispatch(getLrc(sel.value, typingMode));
    }
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
