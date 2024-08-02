import { View, Text } from "react-native";
import React, { useState } from "react";
import moment from "moment";
const RegisterSellerThreeViewModel = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTime, setSelectedTime] = useState(true);
  const [selectedTimeOut, setSelectedTimeOut] = useState();

  const [date, setDate] = useState();

  const [openShop, setOpenShop] = useState(true);
  const [breakTime, setBreakTime] = useState();

  const [saveDate, setSaveDate] = useState();

  const formatDate = (date) => {
    return moment(date).format('HH:mm');
  };

  // const initializeTimeS = () => {
  //   let newDate = new Date();
  //   newDate.setHours(8);
  //   newDate.setMinutes(30);
  //   return newDate;
  // };

  // const initializeTimeE = () => {
  //   let newDate = new Date();
  //   newDate.setHours(17);
  //   newDate.setMinutes(30);
  //   return newDate;
  // };

  // const initializeBreakS = () => {
  //   let newDate = new Date();
  //   newDate.setHours(12);
  //   newDate.setMinutes(10);
  //   return newDate;
  // };

  // const initializeBreakE = () => {
  //   let newDate = new Date();
  //   newDate.setHours(13);
  //   newDate.setMinutes(30);
  //   return newDate;
  // };

  const [start, setStart] = useState(true);
  const [end, setEnd] = useState();
  
  return {
    modalVisible,
    setModalVisible,
    selectedTime,
    setSelectedTime,
    selectedTimeOut,
    setSelectedTimeOut,
    openShop,
    setOpenShop,
    breakTime,
    setBreakTime,
    saveDate,
    setSaveDate,
    date,
    setDate,

    start,
    setStart,
    end,
    setEnd,

    formatDate,
  };
};

export default RegisterSellerThreeViewModel;
