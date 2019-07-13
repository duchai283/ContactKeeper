import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <React.Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', display: 'block', margin: '0 auto' }}
      />
    </React.Fragment>
  );
};

export default Spinner;
