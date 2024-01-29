import React from 'react';

const countItemsByCategory = data => {
  const counts = {};

  data.forEach(item => {
    if (counts[item.categories_id]) {
      counts[item.categories_id].count++;
    } else {
      counts[item.categories_id] = {
        categories_id: item.categories_id,
        count: 1,
        categoryName: item.categories_name[0].Name, // assuming each item only has one category name
      };
    }
  });

  return Object.values(counts);
};

export default countItemsByCategory;
