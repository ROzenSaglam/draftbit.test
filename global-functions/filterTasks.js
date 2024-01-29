import React from 'react';

const filterTasks = (tasks, selectedPriority, selectedStatus) => {
  return tasks.filter(task => {
    const matchesPriority =
      !selectedPriority || task.Priority === selectedPriority;
    //console.log(selectedPriority);
    //console.log("Matches Priority:", matchesPriority);
    const matchesStatus = !selectedStatus || task.Status === selectedStatus;
    //console.log(selectedStatus);
    // console.log("Matches Status:", matchesStatus);
    return matchesPriority && matchesStatus;
  });
};

export default filterTasks;
