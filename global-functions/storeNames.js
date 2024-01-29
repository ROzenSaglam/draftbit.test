import React from 'react';

const storeNames = data => {
  const storeNames = data.map(item => item.Name);
  return storeNames;
};

export default storeNames;
