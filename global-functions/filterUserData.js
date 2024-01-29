import React from 'react';

const filterUserData = (data, userID) => {
  return data.filter(item => item.user_id === userID);
};

export default filterUserData;
