import React from 'react';

const transformOnlyDate = value => {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

export default transformOnlyDate;
