import React from 'react';

const colorStatus = text => {
  if (text === 'To do') {
    return 'red';
  } else if (text === 'In progress') {
    return 'orange';
  } else if (text === 'Completed') {
    return 'green';
  }
};

export default colorStatus;
