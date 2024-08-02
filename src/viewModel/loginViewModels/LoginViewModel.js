import { View, Text } from "react-native";
import React, { useState, useRef } from "react";

const LoginViewModel = () => {
  const bottomSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsvisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);

  return {
    phone,
    setPhone,
    password,
    setPassword,
    isVisible,
    setIsvisible,
    bottomSheetRef,
    currentLanguage,
    setCurrentLanguage,
    modalVisible,
    setModalVisible,
  };
};

export default LoginViewModel;
