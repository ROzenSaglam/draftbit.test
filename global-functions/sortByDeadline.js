import React from 'react';

const sortByDeadline = (tasks, direction) => {
  return tasks.sort((a, b) => {
    const dateA = new Date(a.Deadline);
    const dateB = new Date(b.Deadline);

    if (isNaN(dateA) || isNaN(dateB)) {
      return 0; // keeps the original order for tasks with invalid deadlines
    }

    if (direction === 'Upcoming to latest') {
      return dateA - dateB;
    } else if (direction === 'Latest to upcoming') {
      return dateB - dateA;
    } else {
      //console.log("No direction set yet!")
      return dateA - dateB;
    }
  });
};

export default sortByDeadline;
