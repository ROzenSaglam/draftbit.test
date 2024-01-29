import React from 'react';

const colorPriority = text => {
  if (text === 'High') {
    return 'red';
  } else if (text === 'Medium') {
    return 'orange';
  } else if (text === 'Green') {
    return 'green';
  }
};

export default colorPriority;
