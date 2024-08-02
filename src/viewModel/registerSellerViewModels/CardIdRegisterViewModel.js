import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { enUS, lo, th } from "date-fns/locale";
import { format } from "date-fns";

export default function componentName() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [issueBy, setIssueBy] = useState();
  const [modalVisibleOne, setModalVisibleOne] = useState(false);
  const bottomSheetRef = useRef(null);
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [numberIdCard, setNumberIdCard] = useState();

  const [dateOfIssueCardPicker, setDateOfIssueCardPicker] = useState(false);

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [DateOfCardIssue, setDateOfCardIssue] = useState(new Date());
  const [expirationId, setExpirationId] = useState(new Date());

  const [languageKey, setLanguage] = useState();

  const [expirationIdPicker, setExpirationIdPicker] = useState(false);

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

    allFieldsFilled,
setAllFieldsFilled,

    expirationId,
    setExpirationId,
    expirationIdPicker,
    setExpirationIdPicker,

    languageKey,
    setLanguage,

    issueBy,
    setIssueBy,

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

    DateOfCardIssue,
    setDateOfCardIssue,

    firstName,
    setFirstName,
    lastName,
    setLastName,
  };
}
