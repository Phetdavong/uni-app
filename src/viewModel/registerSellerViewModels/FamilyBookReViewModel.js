import { View, Text, PermissionsAndroid } from "react-native";
import React, { useState, useRef } from "react";
import { enUS, lo, th } from "date-fns/locale";
import { format } from "date-fns";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { FlagIcon } from "react-native-heroicons/outline";

const FamilyBookReViewModel = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState(new Date());
  const [censusDate, setCensusDate] = useState(new Date());
  const [numberIdCardF, setNumberIdCardF] = useState();
  const [issuedAtF, setIssuedAtF] = useState();

  //state function color bottom cheng
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [languageKey, setLanguage] = useState();

  const [dateOfIssuePicker, setDateOfIssuePicker] = useState(false);

  const [galleryPhotoF, setGalleryPhotoF] = useState(null);
  const [cameraPhotoF, setCameraPhotoF] = useState(null);

  const [galleryPhotoCFF, setGalleryPhotoCFF] = useState(null);
  const [cameraPhotoCFF, setCameraPhotoCFF] = useState(null);

  const [galleryPhotoFProfile, setGalleryPhotoFProfile] = useState(null);
  const [cameraPhotoFProfile, setCameraPhotoFProfile] = useState(null);

  const [modalVisibleOne, setModalVisibleOne] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleThree, setModalVisibleThree] = useState(false);

  const bottomSheetRef = useRef(null);

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

  let options = {
    saveToPhotos: true,
    mediaType: "photo", // or 'video' if you want video
    quality: 1, // Maximum quality
    // selectionLimit: 5,
  };

  const openCameraFP = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhotoF(result.assets[0].uri);
      setModalVisibleOne(false);
    }
  };

  const openGalleryFP = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        setGalleryPhotoF(result.assets[0].uri);
        setModalVisibleOne(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openCameraCFF = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhotoCFF(result.assets[0].uri);
      setModalVisibleTwo(false);
    }
  };

  const openGalleryCFF = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        setGalleryPhotoCFF(result.assets[0].uri);
        setModalVisibleTwo(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openCameraFFProfile = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhotoFProfile(result.assets[0].uri);
      setModalVisibleThree(false);
    }
  };

  const openGalleryFFProfile = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        setGalleryPhotoFProfile(result.assets[0].uri);
        setModalVisibleThree(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePressCloseOne = () => {
    setCameraPhotoF(null);
    setGalleryPhotoF(null);
  };
  const handlePressCloseTwo = () => {
    setCameraPhotoCFF(null);
    setGalleryPhotoCFF(null);
  };

  const handlePressCloseThree = () => {
    setCameraPhotoFProfile(null);
    setGalleryPhotoFProfile(null);
  };

  return {
    allFieldsFilled,
    setAllFieldsFilled,

    firstName,
    setFirstName,

    lastName,
    setLastName,

    modalVisibleThree,
    setModalVisibleThree,
    modalVisibleTwo,
    setModalVisibleTwo,

    handlePressCloseOne,
    handlePressCloseTwo,
    handlePressCloseThree,

    censusDate,
    setCensusDate,

    openCameraFP,
    openGalleryFP,

    openCameraFFProfile,
    openGalleryFFProfile,

    openCameraCFF,
    openGalleryCFF,

    formatDate,

    languageKey,
    setLanguage,

    dateOfIssuePicker,
    setDateOfIssuePicker,

    birthDate,
    setBirthDate,

    numberIdCardF,
    setNumberIdCardF,

    issuedAtF,
    setIssuedAtF,

    galleryPhotoF,
    setGalleryPhotoF,

    cameraPhotoF,
    setCameraPhotoF,

    galleryPhotoCFF,
    setGalleryPhotoCFF,

    cameraPhotoCFF,
    setCameraPhotoCFF,

    galleryPhotoFProfile,
    setGalleryPhotoFProfile,

    cameraPhotoFProfile,
    setCameraPhotoFProfile,

    modalVisibleOne,
    setModalVisibleOne,

    bottomSheetRef,
  };
};

export default FamilyBookReViewModel;
