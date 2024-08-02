import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../styles";
import NavBar from "../../components/NavBar";
import React, { useMemo, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BorderTextInput from "../../components/BorderTextInput";
import NavbarPageRegis from "../../components/NavBarPageRegis";
import FamilyBookReViewModel from "../../../viewModel/registerSellerViewModels/FamilyBookReViewModel";
import SpinnerDateTimePicker from "../../components/SpinnerDateTimePicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ButtonAddImage from "../../components/ButtonAddImage";
import RadiusButton from "../../components/RadiusButton";
import SettingViewModel from "../../../viewModel/settingViewModels/SettingViewModel";
import { useDispatch } from "react-redux";
import { registerDocumentFamily } from "../../../stores/features/RegisterSlice";
import moment from "moment";

const FamilyBookRegister = ({ navigation }) => {
  const {
    handlePressCloseOne,
    handlePressCloseTwo,
    handlePressCloseThree,

    openCameraFP,
    openGalleryFP,

    openCameraFFProfile,
    openGalleryFFProfile,

    firstName,
    setFirstName,

    lastName,
    setLastName,

    formatDate,

    dateOfIssuePicker,
    setDateOfIssuePicker,

    censusDate,
    setCensusDate,

    birthDate,
    setBirthDate,

    languageKey,
    setLanguage,

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

    modalVisibleThree,
    setModalVisibleThree,

    modalVisibleTwo,
    setModalVisibleTwo,

    openCameraCFF,
    openGalleryCFF,

    modalVisibleOne,
    setModalVisibleOne,

    allFieldsFilled,
    setAllFieldsFilled,

    bottomSheetRef,
  } = FamilyBookReViewModel();

  const snapPoints = useMemo(() => ["30%"], []);

  const { handleSheetChanges } = SettingViewModel();

  const onPickerChange = (event, selectedDate) => {
    if (selectedDate) {
      if (Platform.OS === "android") {
        setDateOfIssuePicker(false);
      }
      setBirthDate(selectedDate);
    }
  };

  const onPickerChangeCensus = (event, selectedDate) => {
    if (selectedDate) {
      if (Platform.OS === "android") {
        setDateOfIssuePicker(false);
      }
      setCensusDate(selectedDate);
    }
  };

  const dispatch = useDispatch();

  const handelRegisterFamily = () => {
    dispatch(
      registerDocumentFamily({
        firstName: firstName,
        lastName: lastName,
        birthDate: moment(birthDate).format("YYYY-MM-DD"),
        docId: numberIdCardF,
        issueDate: moment(censusDate).format("YYYY-MM-DD"),
        issueBy: issuedAtF,
      })
    );
  };

  //Keep all state camera and gallery 
  const Profile = cameraPhotoF || galleryPhotoF;
  const frontDocument = galleryPhotoCFF || cameraPhotoCFF;
  const picProfile = cameraPhotoFProfile || galleryPhotoFProfile;

  //function change Color bottom
  useEffect(() => {
    if (
      (firstName &&
        lastName &&
        birthDate &&
        numberIdCardF &&
        censusDate &&
        censusDate &&
        Profile &&
        frontDocument &&
        picProfile
      )
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [
    firstName,
    lastName,
    numberIdCardF,
    censusDate,
    censusDate,
    cameraPhotoF,
    galleryPhotoF,
    galleryPhotoCFF,
    cameraPhotoCFF,
    cameraPhotoFProfile,
    galleryPhotoFProfile,
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* datepicker card */}
      {dateOfIssuePicker ? (
        Platform.OS === "android" ? (
          <RNDateTimePicker
            value={birthDate}
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
            date={birthDate}
            // locale={languageKey}
            activeVisible={dateOfIssuePicker}
            onChange={onPickerChange}
            onAgreePress={() => setDateOfIssuePicker(false)}
            onDisagreePress={() => setIsdateOfIssueCardPicker(false)}
          />
        )
      ) : null}

      {/* datepicker card */}
      {dateOfIssuePicker ? (
        Platform.OS === "android" ? (
          <RNDateTimePicker
            value={censusDate}
            mode="date"
            display="spinner"
            onChange={onPickerChangeCensus}
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
            date={censusDate}
            // locale={languageKey}
            activeVisible={dateOfIssuePicker}
            onChange={onPickerChangeCensus}
            onAgreePress={() => setDateOfIssuePicker(false)}
            onDisagreePress={() => setIsdateOfIssueCardPicker(false)}
          />
        )
      ) : null}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  <TouchableOpacity onPress={openCameraFP}>
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
                  <TouchableOpacity onPress={openGalleryFP}>
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleTwo}
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
                  setModalVisibleTwo: setModalVisibleTwo,
                  modalVisible: modalVisibleTwo,
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
                  <TouchableOpacity onPress={openCameraCFF}>
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
                  <TouchableOpacity onPress={openGalleryCFF}>
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
                  <TouchableOpacity onPress={() => setModalVisibleTwo(false)}>
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

        {/* end select modal Two*/}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleThree}
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
                  setModalVisibleThree: setModalVisibleThree,
                  modalVisible: modalVisibleThree,
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
                  <TouchableOpacity onPress={openCameraFFProfile}>
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
                  <TouchableOpacity onPress={openGalleryFFProfile}>
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
                  <TouchableOpacity onPress={() => setModalVisibleThree(false)}>
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

        {/* end select modal Three*/}

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
            ການຢືນຢັນໂຕຕົນຜ່ານປື້ມສຳມະໂນຄົວ
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
                >
                  *
                </Text>
              </Text>

              <BorderTextInput
                value={firstName}
                keyboardType={"default"}
                // onChangeText={setShopName}
                placeholder={"ປ້ອນຊື່ຂອງທ່ານໃຫ້ຕົງກັບຊື່ສຳມະໂນຄົວ"}
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
                >
                  *
                </Text>
              </Text>

              <BorderTextInput
                value={lastName}
                keyboardType={"default"}
                // onChangeText={setShopName}
                placeholder={"ປ້ອນນາມສະກຸນຂອງທ່ານໃຫ້ຕົງກັບນາມສະກຸນສຳມະໂນຄົວ"}
                onChangeText={(text) => {
                  setLastName(text);
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
                ວັນເດືອນປິເກີດ
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
                  setDateOfIssuePicker(true);
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
                  {formatDate(birthDate, languageKey)}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2 mt-5"}
              >
                ໝາຍເລກສຳມະໂນຄົວຂອງທ່ານ
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
                value={numberIdCardF}
                keyboardType={"numeric"}
                // onChangeText={setShopName}
                placeholder={"ປ້ອນໝາຍເລກສຳມະໂນຄົວຂອງທ່ານ"}
                onChangeText={(val) => {
                  setNumberIdCardF(val);
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
                ວັນທີ່ອອກປື້ມສຳມະໂນຄົວ
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
                  setDateOfIssuePicker(true);
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
                  {formatDate(censusDate, languageKey)}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2 mt-5"}
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
                value={issuedAtF}
                keyboardType={"default"}
                // onChangeText={setShopName}
                placeholder={"ປື້ມສຳມະໂນຄົວອອກໂດຍໃຜ"}
                onChangeText={(val) => {
                  setIssuedAtF(val);
                }}
              />
            </View>

            <View className="flex flex-row mt-5 justify-between items-center">
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                ຮູບພາບລູກຄ້າ
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
                {galleryPhotoF || cameraPhotoF ? "1/1" : "0/1"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonAddImage
                onPress={() => setModalVisibleOne(true)}
                onPressClose={() => handlePressCloseOne()}
                cameraPhoto={cameraPhotoF}
                galleryPhoto={galleryPhotoF}
              />
            </View>

            <View className="flex flex-row mt-5 justify-between items-center">
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                ຮູບພາບດ້ານໜ້າຂອງເອກະສານ
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
                {galleryPhotoCFF || cameraPhotoCFF ? "1/1" : "0/1"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonAddImage
                onPress={() => setModalVisibleTwo(true)}
                onPressClose={() => handlePressCloseTwo()}
                cameraPhoto={galleryPhotoCFF}
                galleryPhoto={cameraPhotoCFF}
              />
            </View>
          </View>

          <View className="flex flex-row mt-5 justify-between items-center">
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ຮູບພາບເອກະສານເບື້ອງທີ່ມີທ່ານຢູ່
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
              {cameraPhotoFProfile || galleryPhotoFProfile ? "1/1" : "0/1"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <ButtonAddImage
              onPress={() => setModalVisibleThree(true)}
              onPressClose={() => handlePressCloseThree()}
              cameraPhoto={cameraPhotoFProfile}
              galleryPhoto={galleryPhotoFProfile}
            />
          </View>
        </View>
        <View className="mt-5" style={{ padding: 20 }}>
          <RadiusButton
            onPress={() => {
              handelRegisterFamily();
            }}
            // disabled={true}
            text={"ບັນທຶກ"}
            textColor={"white"}
            backgroundColor={allFieldsFilled ? "#FF7466" : "#A0A0A0"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FamilyBookRegister;
