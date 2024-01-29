import React from 'react';

const filterCategory = (data, categoryId) => {
  return data.filter(data => {
    const matchesCategory = !categoryId || data.categories_id === categoryId;

    return matchesCategory;
  });
};

export default filterCategory;
