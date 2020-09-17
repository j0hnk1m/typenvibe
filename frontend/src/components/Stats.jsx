import React from 'react';

const Stats = ({ wpm, acc, score } = {}) => (
  <>
    <div className="score">
      <div className="right-wing">
        WPM: {wpm} / ACC: {acc} / SCORE: {score}
      </div>
    </div>
  </>
);

export default Stats;
