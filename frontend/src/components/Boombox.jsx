import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getLrc, setCurSong } from 'state/app';

const Boombox = () => {
  const songs = useSelector((state) => state.app.songs);
  const curSong = useSelector((state) => state.app.curSong);
  const grammar = useSelector((state) => state.app.grammar);
  const [sel, setSel] = useState({ value: curSong, label: curSong !== null ? `${songs[curSong].title} - ${songs[curSong].artist}` : '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (sel.value !== null) {
      dispatch(setCurSong(sel.value));
      dispatch(getLrc({
        key: songs[sel.value].key,
        delay: songs[sel.value].delay,
        grammar,
      }));
    }
  }, [sel]);

  const difficulties = ['easy', 'medium', 'hard', 'difficult', 'impossible'];
  const options = difficulties.map((difficulty) => ({ label: difficulty, options: [] }));
  Object.keys(songs).forEach((i) => {
    options.find((group) => group.label === songs[i].difficulty).options.push({ label: `${songs[i].title} - ${songs[i].artist}`, value: Number(i) })
  });

  return (
    <>
      <div className="w-full">
        <Select
          value={sel}
          options={options}
          onChange={setSel}
          noOptionsMessage="failed to retrieve songs, try reloading"
        />
      </div>
    </>
  );
};

export default Boombox;
