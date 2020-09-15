import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong, setCurSongUrl } from 'state/app';

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const typingMode = useSelector((state) => state.app.typingMode);
  const [sel, setSel] = useState({ value: curSong ? curSong.label : '', label: curSong ? curSong.label : '' });
  const dispatch = useDispatch();

  const temp = {
    'believer_imagineDragons.lrc': 'https://www.youtube.com/watch?v=IhP3J0j9JmY',
    'blindingLights_weeknd.lrc': 'https://www.youtube.com/watch?v=fHI8X4OXluQ',
    'dynamite_bts.lrc': 'https://www.youtube.com/watch?v=OiMWFojB9Ok',
    'allOfMe_johnLegend.lrc': 'https://www.youtube.com/watch?v=Mk7-GRWq7wA',
  };

  useEffect(() => {
    dispatch(setCurSong(sel));
    dispatch(setCurSongUrl(temp[sel.value]));
    dispatch(getLrc(sel.value, typingMode));
  }, [sel]);

  const options = songs
    ? songs.map((song) => ({ value: song.lrc, label: `${song.title} - ${song.artist}` }))
    : [];

  return (
    <>
      <div className="bar">
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
