import React from 'react';

const Stats = ({ wpm, acc, points } = {}) => (
  <>
    <div className="score">
      <div className="left-wing" />
      <div className="right-wing">
        WPM: {wpm} / ACC: {acc}
        <br />
        POINTS: {points}
      </div>
    </div>
  </>
);

export default Stats;
