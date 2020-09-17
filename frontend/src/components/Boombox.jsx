import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong, setCurSongUrl } from 'state/app';

const customStyles = {

};

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const typingMode = useSelector((state) => state.app.typingMode);
  const [sel, setSel] = useState({ value: curSong ? curSong.value : '', label: curSong ? curSong.label : '' });
  const dispatch = useDispatch();

  const temp = {
    'Believer - Imagine Dragons': 'https://www.youtube.com/watch?v=IhP3J0j9JmY',
    'Blinding Lights - The Weeknd': 'https://www.youtube.com/watch?v=fHI8X4OXluQ',
    'Dynamite - BTS': 'https://www.youtube.com/watch?v=OiMWFojB9Ok',
    'All Of Me - John Legend': 'https://www.youtube.com/watch?v=Mk7-GRWq7wA',
    'The A Team - Ed Sheeran': 'https://www.youtube.com/watch?v=tg5nMNyBqzs',
    'Hello - Adele': 'https://www.youtube.com/watch?v=4-jBiumYmXk',
  };

  useEffect(() => {
    if (sel.value) {
      dispatch(setCurSong(sel));
      dispatch(setCurSongUrl(temp[sel.label]));
      dispatch(getLrc(sel.value, typingMode));
    }
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
