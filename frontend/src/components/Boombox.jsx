import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Boombox = ({ setSong, }) => {
  const [sel, setSel] = useState({ value: '', label: '' });
  const onSongSel = (e) => {
    setSel(e.label);
    setSong(e.value);
  };
  const songOptions = [
    {
      value: 'believer_imagineDragons',
      label: 'Believer',
    },
    {
      value: 'dynamite_bts',
      label: 'Dynamite',
    },
    {
      value: 'blindingLights_weeknd',
      label: 'Blinding Lights ',
    },
  ];

  return (
    <>
      <p>boombox</p>
      <Select options={songOptions} onChange={onSongSel} />
      <p>{sel.label}</p>
    </>
  );
};

export default Boombox;
