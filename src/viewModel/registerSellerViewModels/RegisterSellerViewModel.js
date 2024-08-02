import { View, Text } from "react-native";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

const RegisterSellerViewModel = () => {
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const [name, setName] = useState(null);

  const bottomSheetRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOne, setModalVisibleOne] = useState(false);

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  return {
    backgroundPhoto,
    setBackgroundPhoto,
    isVisible,
    setIsVisible,
    galleryPhoto,
    setGalleryPhoto,

    allFieldsFilled,
    setAllFieldsFilled,
    
    cameraPhoto,
    setCameraPhoto,
    phone,
    setPhone,
    bottomSheetRef,
    email,
    setEmail,
    name,
    setName,
    modalVisible,
    setModalVisible,
    modalVisibleOne,
    setModalVisibleOne,
  };
};

export default RegisterSellerViewModel;
