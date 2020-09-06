import React from 'react';

const Ui = ({ setPage }) => (
  <div classname="theme-center">
    <p className="button" onClick={() => setPage(0)}>back</p>
  </div>
);

export default Ui;
