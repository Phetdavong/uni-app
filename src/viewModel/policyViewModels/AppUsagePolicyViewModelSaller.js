import {View, Text} from 'react-native';
import React, {useState} from 'react';

// page create function
const AppUsagePolicyViewModel = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  return {
    isChecked,
    setIsChecked,
  };
};

export default AppUsagePolicyViewModel;
