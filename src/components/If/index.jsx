import React from 'react';

const index = ({ test, children }) => {
  return test ? children : <></>;
};

export default index;
