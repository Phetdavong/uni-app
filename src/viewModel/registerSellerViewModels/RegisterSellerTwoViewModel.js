import { View, Text } from "react-native";
import React, { useState } from "react";

const RegisterSellerTwoViewModel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [description, setDescription] = useState("");
  const [addressShope, setAddressShope] = useState("")

  return {
    modalVisible,
    setModalVisible,
    description,
    modalVisibleTwo,
    setModalVisibleTwo,
    setDescription,
    addressShope,
setAddressShope,
  };
};

export default RegisterSellerTwoViewModel;
