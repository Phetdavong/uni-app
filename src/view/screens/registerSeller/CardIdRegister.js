import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import NavBar from "../../components/NavBar";
import * as OutLineIcon from "react-native-heroicons/outline";
import NavbarPageRegis from "../../components/NavBarPageRegis";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { themeColors, themeStyles } from "../../styles";
import RadiusButton from "../../components/RadiusButton";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import CardIdRegisterViewModel from "../../../viewModel/registerSellerViewModels/CardIdRegisterViewModel";
import SpinnerDateTimePicker from "../../components/SpinnerDateTimePicker";
import SettingViewModel from "../../../viewModel/settingViewModels/SettingViewModel";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import BorderTextInput from "../../components/BorderTextInput";
import React, { useEffect, useMemo, useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ButtonAddCardId from "../../components/ButtonAddCardId";
import { useDispatch } from "react-redux";
import { registerDocumentIdCard } from "../../../stores/features/RegisterSlice";
import moment from "moment";

const CardIdRegister = ({ navigation }) => {
  const {
    firstName,
    setFirstName,

    lastName,
    setLastName,

    issueBy,
    setIssueBy,

    modalVisibleOne,
    setModalVisibleOne,

    bottomSheetRef,

    galleryPhoto,
    setGalleryPhoto,

    cameraPhoto,
    setCameraPhoto,

    numberIdCard,
    setNumberIdCard,

    dateOfIssueCardPicker,
    setDateOfIssueCardPicker,

    DateOfCardIssue,
    setDateOfCardIssue,

    languageKey,
    setLanguage,

    expirationId,
    setExpirationId,

    expirationIdPicker,
    setExpirationIdPicker,

    allFieldsFilled,
    setAllFieldsFilled,

    formatDate,
  } = CardIdRegisterViewModel();

  const dispatch = useDispatch();

  const handleRegisterDocument = () => {
    dispatch(
      registerDocumentIdCard({
        firstName: firstName,
        lastName: lastName,
        docId: numberIdCard,
        issueDate: moment(DateOfCardIssue).format("YYYY-MM-DD"),
        issueBy: issueBy,
        expireDate: moment(expirationId).format("YYYY-MM-DD"),
      })
    );
  };

  //keep date whenChange
  const onPickerChange = (event, selectedDate) => {
    if (selectedDate) {
      if (Platform.OS === "android") {
        setDateOfIssueCardPicker(false);
      }
      setDateOfCardIssue(selectedDate);
    }
  };

  const onExPickerChange = (event, selectedDate) => {
    if (selectedDate) {
      if (Platform.OS === "android") {
        setExpirationIdPicker(false);
      }
      setExpirationId(selectedDate);
    }
  };

  const snapPoints = useMemo(() => ["30%"], []);

  const { handleSheetChanges } = SettingViewModel();

  let options = {
    saveToPhotos: true,
    mediaType: "photo", // or 'video' if you want video
    quality: 1, // Maximum quality
    selectionLimit: 5,
  };

  // use modal
  useEffect(() => {
    if (modalVisibleOne) {
      setTimeout(() => {
        if (modalVisibleOne) {
          bottomSheetRef?.current?.snapToIndex(0);
        }
      }, 130);
    }
  }, [modalVisibleOne]);

  //function OpenCamera
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

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      numberIdCard &&
      DateOfCardIssue &&
      issueBy &&
      expirationId
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [
    firstName,
    lastName,
    numberIdCard,
    DateOfCardIssue,
    issueBy,
    expirationId,
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {dateOfIssueCardPicker ? (
        Platform.OS === "android" ? (
          <RNDateTimePicker
            value={DateOfCardIssue}
            mode="date"
            display="spinner"
            onChange={onPickerChange}
            // locale={languageKey}
            dateFormat="dayofweek day month"
            positiveButton={{
              label: "ok", //t("ok"),
              textColor: themeColors.titleTextColor,
            }}
            negativeButton={{
              label: "cancel", //t("cancel"),
              textColor: themeColors.titleTextColor,
            }}
          />
        ) : (
          <SpinnerDateTimePicker
            date={DateOfCardIssue}
            // locale={languageKey}
            activeVisible={dateOfIssueCardPicker}
            onChange={onPickerChange}
            onAgreePress={() => setDateOfIssueCardPicker(false)}
            onDisagreePress={() => setDateOfIssueCardPicker(false)}
          />
        )
      ) : null}

      {/* time  */}
      {expirationIdPicker ? (
        Platform.OS === "android" ? (
          <RNDateTimePicker
            value={expirationId}
            mode="date"
            display="spinner"
            onChange={onExPickerChange}
            // locale={languageKey}
            dateFormat="dayofweek day month"
            positiveButton={{
              label: "ok", //t("ok"),
              textColor: themeColors.titleTextColor,
            }}
            negativeButton={{
              label: "cancel", //t("cancel"),
              textColor: themeColors.titleTextColor,
            }}
          />
        ) : (
          <SpinnerDateTimePicker
            date={expirationId}
            // locale={languageKey}n
            activeVisible={expirationIdPicker}
            onChange={onExPickerChange}
            onAgreePress={() => setExpirationIdPicker(false)}
            onDisagreePress={() => setExpirationIdPicker(false)}
          />
        )
      ) : null}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* select modal one */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleOne}
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
                    { borderColor: "#A0A0A0" },
                  ]}
                >
                   
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
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterSellerFour")}
            >
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
        <NavbarPageRegis value={3} />

        <View style={{ padding: 20, flex: 1 }}>
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.primaryColorS },
            ]}
          >
            ການຢືນຢັນໂຕຕົນຜ່ານບັດປະຈຳຕົວ
          </Text>
          <View style={{ flex: 1, marginTop: 10 }}>
            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                ຊື່
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
              <BorderTextInput
                value={firstName}
                keyboardType={"default"}
                placeholder={"ປ້ອນຊື່ຂອງທ່ານໃຫ້ຕົງກັບຊື່ໃນບັດປະຈຳຕົວ"}
                onChangeText={(val) => {
                  setFirstName(val);
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                ນາມສະກຸນ
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

              <BorderTextInput
                value={lastName}
                keyboardType={"default"}
                placeholder={"ປ້ອນນາມສະກຸນຂອງທ່ານໃຫ້ຕົງກັບຊື່ໃນບັດປະຈຳຕົວ"}
                onChangeText={(val) => {
                  setLastName(val);
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                ໝາຍເລກປະຈຳຕົວຂອງທ່ານ
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
              <BorderTextInput
                value={numberIdCard}
                keyboardType={"numeric"}
                // onChangeText={setShopName}
                placeholder={"ປ້ອນໝາຍເລກປະຈຳຕົວ"}
                onChangeText={(text) => {
                  setNumberIdCard(text);
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                ວັນເດືອນປິອອກບັດ
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
              <TouchableOpacity
                onPress={() => {
                  setDateOfIssueCardPicker(true);
                }}
                className="w-full flex-row items-center justify-between h-[60px]"
                style={{
                  borderColor: themeColors.textColor,
                  borderWidth: 2,
                  borderRadius: 10,
                  textAlign: "left",
                }}
              >
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    {
                      color: themeColors.titleTextColor,
                      paddingHorizontal: 20,
                    },
                  ]}
                >
                  {formatDate(DateOfCardIssue, languageKey)}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2 pt-5"}
              >
                ອອກໂດຍ
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

              <BorderTextInput
                value={issueBy}
                keyboardType={"default"}
                // onChangeText={setShopName}
                placeholder={"ປ້ອນບ່ອນອອກບັດ"}
                onChangeText={(text) => {
                  setIssueBy(text);
                }}
              />
            </View>

            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                ວັນໝົດອາຍຸ
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

              <TouchableOpacity
                onPress={() => {
                  setExpirationIdPicker(true);
                }}
                className="w-full flex-row items-center justify-between h-[60px]"
                style={{
                  borderColor: themeColors.textColor,
                  borderWidth: 2,
                  borderRadius: 10,
                  textAlign: "left",
                }}
              >
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    {
                      color: themeColors.titleTextColor,
                      paddingHorizontal: 20,
                    },
                  ]}
                >
                  {formatDate(expirationId, languageKey)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ButtonAddCardId
              onPress={() => setModalVisibleOne(true)}
              cameraPhoto={cameraPhoto}
              galleryPhoto={galleryPhoto}
            />
          </View>
          <View className="mt-5">
            <RadiusButton
              onPress={() => {
                handleRegisterDocument();
              }}
              // disabled={true}
              text={"ບັນທຶກ"}
              textColor={"white"}
              backgroundColor={allFieldsFilled ? '#FF7466' : '#A0A0A0'}
              
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardIdRegister;
