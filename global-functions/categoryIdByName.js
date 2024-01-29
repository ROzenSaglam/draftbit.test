import React from 'react';

const categoryIdByName = (data, pickerValue) => {
  for (let item of data) {
    if (item.Name === pickerValue) {
      return item.id;
    }
  }
  return null; // Return null if name is not found
};

export default categoryIdByName;
