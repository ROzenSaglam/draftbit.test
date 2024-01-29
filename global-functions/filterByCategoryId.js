import React from 'react';

const filterByCategoryId = (data, id) => {
  return data.filter(item => {
    return item.categories_id === id;
  });
};

export default filterByCategoryId;
