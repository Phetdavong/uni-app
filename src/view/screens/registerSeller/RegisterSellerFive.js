import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import RegisterSellerViewModel from "../../../viewModel/registerSellerViewModels/RegisterSellerViewModel";
import RegisterSellerApiModel from "../../../viewApiModel/registerSellerApiModels/RegisterSellerApiModel";
import InfrastructureApiModel from "../../../viewApiModel/infrastructureApiModels/InfrastructureApiModel";
import RegisterSellerTwoViewModel from "../../../viewModel/registerSellerViewModels/RegisterSellerTwoViewModel";
import DeliveryApiModel from "../../../viewApiModel/deliveryApiModel.js/DeliveryApiModel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingViewModel from "../../../viewModel/settingViewModels/SettingViewModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import { themeColors, themeStyles } from "../../styles/index";
import * as OutLineIcon from "react-native-heroicons/outline";
import NavBarPageRegis from "../../components/NavBarPageRegis";
import BorderTextInput from "../../components/BorderTextInput";
import NavBar from "../../components/NavBar";
import RadioGroup from "react-native-radio-buttons-group";
import { useFocusEffect } from "@react-navigation/native";
import RadiusButton from "../../components/RadiusButton";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import StorageContext from "../../contexts/StorageContext";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";

const RegisterSeller = ({ navigation }) => {
  const { modalVisible, setModalVisible, description, setDescription } =
    RegisterSellerTwoViewModel();

  // ຝັງຊັ້ນການກົດ ແບບຫຼາຍອັນ
  const handleCheckboxChange = (id, isChecked, setIsChecked) => {
    const newIsChecked = [...isChecked];
    const existingIndex = newIsChecked.findIndex((prev) => prev.id === id);

    if (existingIndex !== -1) {
      newIsChecked.splice(existingIndex, 1);
    } else {
      newIsChecked.push({
        id: id,
      });
    }

    setIsChecked(newIsChecked);
  };
  // -----------------------*------------------ End ຝັ່ງຊັ້ນການກົດແບບຫຼາຍອັນ

  const snapPoints = useMemo(() => ["70%"], []);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        if (modalVisible) {
          bottomSheetRef?.current?.snapToIndex(0);
        }
      }, 130);
    }
  }, [modalVisible]);

  // ຝັງຊັ້ນການກົດ ແບບຫຼາຍອັນ Delivery
  const handleCheckboxChangeDelivery = (
    id,
    isCheckedDelivery,
    setIsCheckedDelivery
  ) => {
    const newIsChecked = [...isCheckedDelivery];
    const existingIndex = newIsChecked.findIndex((pred) => pred.id === id);

    if (existingIndex !== -1) {
      newIsChecked.splice(existingIndex, 1);
    } else {
      newIsChecked.push({
        id: id,
      });
    }

    setIsCheckedDelivery(newIsChecked);
  };
  // -----------------------*------------------ End ຝັ່ງຊັ້ນການກົດແບບຫຼາຍອັນ

  // ຝັງຊັ້ນການກົດ ແບບຫຼາຍອັນ Infrastructure
  const handleCheckboxChangeInfrastructure = (
    id,
    isCheckedInfrastructure,
    setIsCheckedInfrastructure
  ) => {
    const newIsChecked = [...isCheckedInfrastructure];
    const existingIndex = newIsChecked.findIndex((prevI) => prevI.id === id);

    if (existingIndex !== -1) {
      newIsChecked.splice(existingIndex, 1);
    } else {
      newIsChecked.push({
        id: id,
      });
    }

    setIsCheckedInfrastructure(newIsChecked);
  };
  // -----------------------*------------------ End ຝັ່ງຊັ້ນການກົດແບບຫຼາຍອັນ

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "ປັກມຸດຕາມ GPS",
        value: "option1",
        borderSize: 1,
        color: themeColors.blackColor,
        borderColor: themeColors.grayColor,
        labelStyle: { color: themeColors.titleTextColor },
      },
      {
        id: "2",
        label: "ປັກມຸດຕາມ Map",
        value: "option2",
        borderSize: 1,
        color: themeColors.blackColor,
        borderColor: themeColors.grayColor,
        labelStyle: { color: themeColors.titleTextColor },
      },
    ],
    []
  );

  const [isCheckedInfrastructure, setIsCheckedInfrastructure] = useState([]);

  const [selectedId, setSelected] = useState("1");

  const [isChecked, setIsChecked] = useState([]);

  const [isCheckedDelivery, setIsCheckedDelivery] = useState([]);

  const { setCurrentLocation, currentLocation } = useContext(StorageContext);

  const { requestLocationPermission } = HomeViewModel();

  const { handleSheetChanges } = SettingViewModel();

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    // console.log("=>>", selectedId);
  }, [selectedId]);

  const {
    infrastructureData,
    setInfrastructureData,
    infrastructureLoadIng,
    setInfrastructureLoadIng,
    infrastructureError,
    setInfrastructureError,
    infrastructureCount,
    setInfrastructureCount,
    handleGetInfrastructure,
  } = InfrastructureApiModel.getInfrastructureApi();

  const {
    phone,
    setPhone,
    bottomSheetRef,
    mail,
    setMail,
    shopName,
    setShopName,
  } = RegisterSellerViewModel();

  const {
    RegisterSellerTwoData,
    setRegisterSellerTwoData,

    RegisterSellerTwoLoadIng,
    setRegisterSellerTwoLoadIng,

    RegisterSellerTwoError,
    setRegisterSellerTwoError,

    RegisterSellerTwoCount,
    setRegisterSellerTwoCount,

    handleGetRegisterSellerTwo,
  } = RegisterSellerApiModel.getRegisterSellerTwoApi();

  const {
    DeliveryData,
    setDeliveryData,

    DeliveryLoadIng,
    setDeliveryLoadIng,

    DeliveryError,
    setDeliveryError,

    DeliveryCount,
    setDeliveryCount,

    handleGetDelivery,
  } = DeliveryApiModel.getDeliveryApi();

  useEffect(() => {
    handleGetRegisterSellerTwo();
  }, []);

  useEffect(() => {
    handleGetInfrastructure();
  }, []);

  useEffect(() => {
    handleGetDelivery();
  }, []);

  useEffect(() => {
    // console.log('=====>', JSON.stringify(RegisterSellerTwoData,null,2));
    // console.log(
    //   "=====>",
    //   RegisterSellerTwoData[0]?.payment_type_img?.image?.imagesUrl
    // );
    // console.log("====>",isChecked)
  }, [isChecked]);

  useEffect(() => {}, [isCheckedDelivery]);

  useEffect(() => {}, [isCheckedInfrastructure]);

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
            ></BottomSheet>
          </GestureHandlerRootView>
        </Modal>

        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity
            // onPress={() => navigation.navigate("RegisterSellerThree")}
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
        <NavBarPageRegis value={4} />

        <View style={{ padding: 20 }}>
          <Text style={[themeStyles.titleTextStyle, { color: "#34A853" }]}>
            ສົ່ງຄຳຮ້ອງສະມັກເປັນຜູ້ຂາຍສຳເລັດແລ້ວ
          </Text>

          <View className="items-center mt-20">
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../../../assets/icons/confirm_icon.png")}
            />
            <Text
              className='mt-5'
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              ຄຳຮ້ອງຂອງທ່ານໄດ້ຖຶກສົ່ງໄປແລ້ວ
            </Text>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              ກະລຸນາລໍຖ້າທ່າງ Admin ກວດສອບຂໍ້ມູນຂອງທ່ານ
            </Text>

            <Image
              style={{ width: 250, height: 250 }}
              source={require("../../../../assets/logos/confirmSeller.png")}
            />
            
          </View>
          <RadiusButton
              onPress={() => navigation.navigate("Home")}
              // disabled={true}
              text={"ກັບໄປທີ່ໜ້າຫຼັກ"}
              textColor={"white"}
              backgroundColor="#FF7466"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterSeller;
