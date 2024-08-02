import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { enUS, lo, th } from "date-fns/locale";
import { format } from "date-fns";

const PassportRegisterViewModel = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [expirationId, setExpirationId] = useState(new Date());

  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [numberIdCard, setNumberIdCard] = useState();

  const [dateOfIssueCardPicker, setDateOfIssueCardPicker] = useState(false);
  const [DateOfCardIssue, setDateOfCardIssue] = useState(new Date());

  const [languageKey, setLanguage] = useState();
  const bottomSheetRef = useRef(null);

  const [expirationIdPicker, setExpirationIdPicker] = useState(false);

  const [modalVisibleOne, setModalVisibleOne] = useState(false);
  const [authority, setAuthority] = useState();

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const formatLaoDate = (date) => {
    const months = [
      "ມັງກອນ",
      "ກຸມພາ",
      "ມີນາ",
      "ເມສາ",
      "ພຶດສະພາ",
      "ມິຖຸນາ",
      "ກໍລະກົດ",
      "ສິງຫາ",
      "ກັນຍາ",
      "ເມສາະ",
      "ພະຈິກ",
      "ທັນວາ",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  const formatDate = (date, locale) => {
    switch (locale) {
      case "th":
        return format(date, "dd/MM/yyyy", { locale: th });
      case "la":
        return format(date, "dd/MM/yyyy", { locale: lo });
      default:
        return format(date, "dd/MM/yyyy", { locale: enUS });
    }
  };

  return {
    formatDate,

    firstName,
    setFirstName,

    lastName,
    setLastName,

    allFieldsFilled,
    setAllFieldsFilled,

    DateOfCardIssue,
    setDateOfCardIssue,

    expirationId,
    setExpirationId,

    expirationIdPicker,
    setExpirationIdPicker,

    languageKey,
    setLanguage,

    authority,
    setAuthority,

    bottomSheetRef,

    numberIdCard,
    setNumberIdCard,

    dateOfIssueCardPicker,
    setDateOfIssueCardPicker,

    modalVisibleOne,
    setModalVisibleOne,

    galleryPhoto,
    setGalleryPhoto,

    cameraPhoto,
    setCameraPhoto,
  };
};

export default PassportRegisterViewModel;
