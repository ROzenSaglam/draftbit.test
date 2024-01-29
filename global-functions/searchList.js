import React from 'react';

const searchList = (data, textInputValue) => {
  if (!data || !Array.isArray(data) || typeof textInputValue !== 'string') {
    //console.error("Invalid input parameters.");
    return [];
  }

  const newList = data.filter(
    item =>
      item &&
      item.Task &&
      item.Task.toLowerCase().includes(textInputValue.toLowerCase())
  );

  return newList;
};

export default searchList;
