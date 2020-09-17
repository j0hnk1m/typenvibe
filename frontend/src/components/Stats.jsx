import React from 'react';

const Stats = ({ wpm, acc, score } = {}) => (
  <>
    <div className="flex justify-end text-xl">
      <p>WPM: {wpm} / ACC: {acc} / SCORE: {score}</p>
    </div>
  </>
);

export default Stats;
