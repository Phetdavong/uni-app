import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Modal,
} from "react-native";
import RegisterSellerViewModel from "../../../viewModel/registerSellerViewModels/RegisterSellerViewModel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingViewModel from "../../../viewModel/settingViewModels/SettingViewModel";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { themeColors, themeStyles } from "../../styles/index";
import * as OutLineIcon from "react-native-heroicons/outline";
import NavBarPageRegis from "../../components/NavBarPageRegis";
import ButtonAddImageMultiple from "../../components/ButtonAddImageMultiple";
import ButtonAddImage from "../../components/ButtonAddImage";
import BorderTextInput from "../../components/BorderTextInput";
import NavBar from "../../components/NavBar";
import React, { useState, useMemo, useEffect } from "react";
import RadiusButton from "../../components/RadiusButton";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import PhoneTextInput from "../../components/PhoneTextInput";
import { CountryPicker } from "react-native-country-codes-picker";
import { useSelector, useDispatch } from "react-redux";
import { registerBasicInfo } from "../../../stores/features/RegisterSlice";

const RegisterSeller = ({ navigation }) => {
  const {
    phone,
    setPhone,
    bottomSheetRef,
    name,
    setName,
    email,
    setEmail,
    modalVisible,
    setModalVisible,
    modalVisibleOne,
    setModalVisibleOne,

    allFieldsFilled,
    setAllFieldsFilled,
  } = RegisterSellerViewModel();

  let options = {
    saveToPhotos: true,
    mediaType: "photo", // or 'video' if you want video
    quality: 1, // Maximum quality
    selectionLimit: 5,
  };
  // const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(registerBasicInfo({ name: name, email: email, phone: phone }));

  };

  const [callingCode, setCallingCode] = useState("+856");
  const [countryFlag, setCountryFlag] = useState("🇱🇦");
  const [isCountryButtonSheet, setIsCountryButtonSheet] = useState(false);

  const snapPoints = useMemo(() => ["30%"], []);

  const { handleSheetChanges } = SettingViewModel();

  const [backgroundPhoto, setBackgroundPhoto] = useState([]);
  const [backgroundCamera, setBackgroundCamera] = useState(null);
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState(null);

  const handlePressClose = () => {
    setGalleryPhoto(null);
    setCameraPhoto(null);
  };

  const handlePressCloseBg = (index) => {
    setBackgroundPhoto((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
  };

  // use model
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        if (modalVisible) {
          bottomSheetRef?.current?.snapToIndex(0);
        }
      }, 130);
    }
  }, [modalVisible]);

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      setModalVisibleOne(false);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        setGalleryPhoto(result.assets[0].uri);
        setModalVisibleOne(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openImageLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const selectedImages = response.assets.map((asset) => ({
          uri: asset.uri,
        }));
        setBackgroundPhoto(selectedImages);
        console.log("Selected images URIs: ", selectedImages);
        setModalVisible(false);
      }
    });
  };

  const allPic = backgroundPhoto || galleryPhoto || cameraPhoto;

  useEffect(() => {
    if (phone && name && email && allPic) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [phone, name, email, allPic]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   setModalVisible(!modalVisible);
          // }}
        >
          <GestureHandlerRootView style={themeStyles.modalStyle}>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              onChange={(index) =>
                handleSheetChanges({
                  index: index,
                  setModalVisible: setModalVisible,
                  modalVisible: modalVisible,
                  bottomSheetRef: bottomSheetRef,
                })
              }
              style={{ zIndex: 500 }}
            >
              <View className={"p-5 space-y-1"}>
                <Text
                  style={[
                    themeStyles.headerTextStyle,
                    { color: themeColors.titleTextColor },
                    { borderBottomWidth: 1 },
                    { paddingBottom: 10 },
                    { borderColor: "#CFCFCF" },
                  ]}
                >
                  ອັບໂຫຼດຮູບຈາກ
                </Text>
                {/* <View>
                  <TouchableOpacity onPress={cameraImage}>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.titleTextStyle },
                      ]}
                    >
                      ຖ່າຍຮູບ
                    </Text>
                  </TouchableOpacity>
                </View> */}
                <View>
                  <TouchableOpacity onPress={openImageLibrary}>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.titleTextStyle },
                      ]}
                    >
                      ເລືອກຮຸບຈາກຄັງຮູບພາບ
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.titleTextStyle },
                      ]}
                    >
                      ຍົກເລິກ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </GestureHandlerRootView>
        </Modal>

        {/* select modal one */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleOne}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   setModalVisible(!modalVisible);
          // }}
        >
          <GestureHandlerRootView style={themeStyles.modalStyle}>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              onChange={(index) =>
                handleSheetChanges({
                  index: index,
                  setModalVisibleOne: setModalVisibleOne,
                  modalVisible: modalVisibleOne,
                  bottomSheetRef: bottomSheetRef,
                })
              }
              style={{ zIndex: 500 }}
            >
              <View className={"p-5 space-y-1"}>
                <Text
                  style={[
                    themeStyles.headerTextStyle,
                    { color: themeColors.titleTextColor },
                    { borderBottomWidth: 1 },
                    { paddingBottom: 10 },
                    { borderColor: "#CFCFCF" },
                  ]}
                >
                  ອັບໂຫຼດຮູບຈາກ
                </Text>
                <View>
                  <TouchableOpacity onPress={openCamera}>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.titleTextStyle },
                      ]}
                    >
                      ຖ່າຍຮູບ
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={openGallery}>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.titleTextStyle },
                      ]}
                    >
                      ເລືອກຮຸບຈາກຄັງຮູບພາບ
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setModalVisibleOne(false)}>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.titleTextStyle },
                      ]}
                    >
                      ຍົກເລິກ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </GestureHandlerRootView>
        </Modal>

        {/* end select modal one*/}

        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity>
              <OutLineIcon.ArrowLeftIcon
                size={30}
                color={themeColors.bgColor}
              />
            </TouchableOpacity>
          }
          insideLeftIcon={
            <Text
              style={[
                themeStyles.headerTextStyle,
                { color: themeColors.bgColor },
              ]}
            >
              ສະມັກເປັນຜູ້ຂາຍ
            </Text>
          }
        />
        <NavBarPageRegis value={0} />
        <View style={{ padding: 15 }}>
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.primaryColorS },
            ]}
          >
            ເພິ່ມຂໍ້ມູນຂອງຮ້ານ
          </Text>
          <View className="flex flex-row mt-5 justify-between items-center">
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ເພິ່ມຂໍ້ມູນຮູບໜ້າໄປຮໄຟລ໌
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.primaryColorS },
                ]}
                className={"ml-1"}
              >
                *
              </Text>
            </Text>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              {galleryPhoto || cameraPhoto ? "1/1" : "0/1"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <ButtonAddImage
              onPress={() => setModalVisibleOne(true)}
              onPressClose={() => handlePressClose()}
              cameraPhoto={cameraPhoto}
              galleryPhoto={galleryPhoto}
            />
          </View>
        </View>

        <View style={{ padding: 15 }}>
          <View className="flex flex-row mt-5 justify-between items-center">
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ເພິ່ມຮູບພື້ນຫຼັງ
            </Text>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              {backgroundPhoto.length}/5
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <ButtonAddImageMultiple
              onPress={() => setModalVisible(true)}
              onPressClose={() => handlePressCloseBg()}
              backgroundPhoto={backgroundPhoto}
              // backgroundCamera={backgroundCamera}
            />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
            className={"mb-2"}
          >
            ຊື່ຮ້ານ
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.primaryColorS },
              ]}
              className={"ml-1"}
            >
              *
            </Text>
          </Text>
          <View>
            <BorderTextInput
              value={name}
              keyboardType={"default"}
              // onChangeText={setShopName}
              placeholder={"ຊື່ຮ້ານ"}
              onChangeText={(val) => {
                setName(val);
              }}
            />
          </View>
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
            className={"mb-2"}
          >
            ອີເມວ
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.primaryColorS },
              ]}
            >
              *
            </Text>
          </Text>
          <View>
            <BorderTextInput
              value={email}
              keyboardType={"email"}
              onChangeText={(val) => {
                setEmail(val);
              }}
              placeholder={"ອິເມວ"}
            />
          </View>
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
            className={"mb-2"}
          >
            ເບີໂທຮ້ານ
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.primaryColorS },
              ]}
            >
              *
            </Text>
          </Text>
          <View>
            <CountryPicker
              show={isCountryButtonSheet}
              pickerButtonOnPress={(item) => {
                setCallingCode(item.dial_code);
                setCountryFlag(item.flag);
                setIsCountryButtonSheet(false);
              }}
              popularCountries={["en", "ua", "pl"]}
            />
            <PhoneTextInput
              callingCode={callingCode}
              setCallingCode={setCallingCode}
              phone={phone}
              setPhone={setPhone}
              // placeholder={t("please-enter-phone-number")}
              placeholder={"please Enter PhoneNumber"}
              flagImage={countryFlag}
              onFlagPress={() => {
                setIsCountryButtonSheet(true);
              }}
              onChangeText={(text) => {
                setPhone(text);
              }}
              // invalidText={t(phoneInvalidError)}
              // invalidText={"phoneInvalidError"}
              // invalid={"phoneInvalidError"}
            />
          </View>
          <View className="mt-5">
            <RadiusButton
              onPress={() => {
                handleRegister(), navigation.navigate("RegisterSellerTwo");
              }}
              // disabled={true}
              text={"ຕໍ່ໄປ"}
              textColor={"white"}
              backgroundColor={allFieldsFilled ? "#FF7466" : "#A0A0A0"}
              disabled={!allFieldsFilled}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 20,
  },
});

export default RegisterSeller;
