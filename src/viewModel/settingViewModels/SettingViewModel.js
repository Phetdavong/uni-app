import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageList from "../../service/constantData/LanguageList";
import i18next from "../../service/languageService/i18next";
import { View, Text } from "react-native";
import React, { useState } from "react";

const SettingViewModel = () => {
  const handleSheetChanges = ({ index, isVisible, setIsvisible, bottomSheetRef }) => {
    // console.log(index);
    if (index === 0 && isVisible) {
      bottomSheetRef?.current?.close();
      setTimeout(() => {
        setIsvisible(false);
      }, 150);
    }
  };

  const handleChangelanguage = async ({
    language,
    bottomSheetRef,
    setIsvisible,
    setCurrentLanguage
  }) => {
    await AsyncStorage.setItem("Language", language);
    i18next.changeLanguage(language);
    bottomSheetRef.current.close();
    setTimeout(() => {
      setIsvisible(false);
      setCurrentLanguage(language);
    }, 150);
  };

  const handleLoadLanguage = async () =>{
    const asyncLanguage = await AsyncStorage.getItem("Language");
    if(asyncLanguage){
        i18next.changeLanguage(asyncLanguage)
    }
  }

  const handleGetLanguageKey = async () => {
    const asyncLanguage = await AsyncStorage.getItem("Language");
    return asyncLanguage;
  };

  const handleSwitchGlobleLanguageKey = (key) => {
    switch (key) {
      case "la":
        return "lo";
      case "en":
        return "en";
      case "th":
        return "th";
      default:
        return "en";
    }
  };

  const handleGetLanguageIcon = async (setLanguageIcon) =>{
    const asyncLanguage = await AsyncStorage.getItem("Language");
    if(asyncLanguage){
        setLanguageIcon(LanguageList[asyncLanguage]?.flag)
    }
  }

  return {
    handleLoadLanguage,
    handleSheetChanges,
    handleChangelanguage,
    handleSwitchGlobleLanguageKey,
    handleGetLanguageIcon,
    handleGetLanguageKey,
  };
};

export default SettingViewModel;
