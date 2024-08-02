import { View, Text } from "react-native";
import React, { useState } from "react";

const RegisterSellerTwoViewModel = () => {
  const [selectedId, setSelectedId] = useState();
  const [isChecked, setIsChecked] = useState();
 

  return {
    isChecked,
    setIsChecked,
    
    selectedId,
    setSelectedId,

 
  };
};

export default RegisterSellerTwoViewModel;
