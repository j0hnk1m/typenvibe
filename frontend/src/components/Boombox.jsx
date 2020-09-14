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

  const temp = {
    'believer_imagineDragons.lrc': 'https://www.youtube.com/watch?v=IhP3J0j9JmY',
    'blindingLights_weeknd.lrc': 'https://www.youtube.com/watch?v=fHI8X4OXluQ',
    'dynamite_bts.lrc': 'https://www.youtube.com/watch?v=OiMWFojB9Ok',
    'allOfMe_johnLegend.lrc': 'https://www.youtube.com/watch?v=Mk7-GRWq7wA',
  };

  useEffect(() => {
    dispatch(setCurSong(sel.value));
    dispatch(setCurSongUrl(temp[sel.value]));
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
