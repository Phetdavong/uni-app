import { View, Text } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppUsagePolicyViewModel = () => {
  const bottomSheetRef = useRef(null);
  const [languageIcon, setLanguageIcon] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchHtmlContent = async ({ data, setContent }) => {
    const asyncLanguage = await AsyncStorage.getItem("Language");
    switch (asyncLanguage) {
      case "la":
        setContent(data?.content_la);
        break;
      case "en":
        setContent(data?.content_en);
        break;
      case "kr":
        setContent(data?.content_kr);
        break;
      case "th":
        setContent(data?.content_th);
        break;
      case "vn":
        setContent(data?.content_vn);
        break;
      case "ch":
        setContent(data?.content_ch);
        break;
      default:
        setContent(data?.content_en);
        break;
    }
  };

  return {
    isChecked,
    setIsChecked,
    currentContent,
    setCurrentContent,
    bottomSheetRef,
    isVisible,
    setIsVisible,
    languageIcon,
    setLanguageIcon,
    currentLanguage,
    setCurrentLanguage,
    handleSwitchHtmlContent,
  };
};

export default AppUsagePolicyViewModel;
