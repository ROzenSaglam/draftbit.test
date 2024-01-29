import React from 'react';

const countStatus = data => {
  const statusCounts = {};

  data.forEach(item => {
    if (statusCounts[item.Status]) {
      statusCounts[item.Status]++;
    } else {
      statusCounts[item.Status] = 1;
    }
  });

  return statusCounts;
};

export default countStatus;
