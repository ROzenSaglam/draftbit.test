import React from 'react';

const transformForRender = value => {
  if (value instanceof Date) {
    return value.toLocaleString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

export default transformForRender;
