import React from 'react';

const categoryPercentage = tasksInCategory => {
  // If there are no tasks in the category, return 0% for all statuses
  if (tasksInCategory.length === 0) {
    return {
      'In progress': 0,
      'To do': 0,
      Completed: 0,
    };
  }

  // Count the number of tasks with each status
  const statusCounts = tasksInCategory.reduce((acc, task) => {
    acc[task.Status] = (acc[task.Status] || 0) + 1;
    return acc;
  }, {});

  // Calculate the percentage for each status
  const statusPercentage = [
    {
      x: 'To Do',
      y: ((statusCounts['To do'] || 0) / tasksInCategory.length) * 100,
    },
    {
      x: 'In Progress',
      y: ((statusCounts['In progress'] || 0) / tasksInCategory.length) * 100,
    },
    {
      x: 'Completed',
      y: ((statusCounts['Completed'] || 0) / tasksInCategory.length) * 100,
    },
  ];

  console.log(statusPercentage);
  return statusPercentage;
};

export default categoryPercentage;
