import React from 'react';

const displayDeadline = text => {
  if (text === null) {
    return '-';
  }
  return text;
};

export default displayDeadline;
