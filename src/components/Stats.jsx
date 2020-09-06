import React from 'react';

const Stats = ({ wpm, acc }) => (
  <>
    <div className="bar">
      <div className="left-wing" />
      <div className="right-wing">
        WPM: {wpm} / ACC: {acc}
      </div>
    </div>
  </>
);

export default Stats;
