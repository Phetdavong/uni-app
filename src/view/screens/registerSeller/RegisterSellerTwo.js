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
  StyleSheet,
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
import { registerPayDelLocation } from "../../../stores/features/RegisterSlice";
import { useDispatch } from "react-redux";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";

const RegisterSeller = ({ navigation }) => {
  const {
    modalVisible,
    setModalVisible,
    description,
    setDescription,
    modalVisibleTwo,
    setModalVisibleTwo,
    addressShope,
    setAddressShope,
  } = RegisterSellerTwoViewModel();

  const dispatch = useDispatch();

  const handleRegisterPayDelLocation = () => {
    dispatch(
      registerPayDelLocation({
        ptid: company_payments?.ptid,
        name_la: company_payments?.name_la,
        delid: company_deliveries?.delid,
        name_la: company_deliveries?.name_la,
        name_en: company_deliveries?.name_en,
        descrp: description,
        idfid: company_infras?.idfid,
        name_la : company_infras?.name_la,
      })
    );
  };

  // ຝັງຊັ້ນການກົດ ແບບຫຼາຍອັນ
  const handleCheckboxChange = (id, company_payments, setCompany_payments) => {
    const newIsChecked = [...company_payments];
    const existingIndex = newIsChecked.findIndex((prev) => prev.id === id);

    if (existingIndex !== -1) {
      newIsChecked.splice(existingIndex, 1);
    } else {
      newIsChecked.push({
        id: id,
      });
    }
    setCompany_payments(newIsChecked);
  };
  // -----------------------*------------------ End ຝັ່ງຊັ້ນການກົດແບບຫຼາຍອັນ

  const snapPoints = useMemo(() => ["80%"], []);

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
    company_deliveries,
    setCompany_deliveries
  ) => {
    const newIsChecked = [...company_deliveries];
    const existingIndex = newIsChecked.findIndex((pred) => pred.id === id);

    if (existingIndex !== -1) {
      newIsChecked.splice(existingIndex, 1);
    } else {
      newIsChecked.push({
        id: id,
      });
    }

    setCompany_deliveries(newIsChecked);
  };
  // -----------------------*------------------ End ຝັ່ງຊັ້ນການກົດແບບຫຼາຍອັນ

  // ຝັງຊັ້ນການກົດ ແບບຫຼາຍອັນ Infrastructure
  const handleCheckboxChangeInfrastructure = (
    id,
    company_infras,
    setCompany_infras
  ) => {
    const newIsChecked = [...company_infras];
    const existingIndex = newIsChecked.findIndex((prevI) => prevI.id === id);

    if (existingIndex !== -1) {
      newIsChecked.splice(existingIndex, 1);
    } else {
      newIsChecked.push({
        id: id,
      });
    }

    setCompany_infras(newIsChecked);
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
  ///--------------------------------------------------

  const handleRadioButtonPress = (id) => {
    setSelected(id);
    if (id === "1") {
      setModalVisible(true);
      setModalVisibleTwo(false);
    } else if (id === "2") {
      setModalVisibleTwo(true);
      setModalVisible(false);
    }
  };

  const [company_infras, setCompany_infras] = useState([]);

  const [selectedId, setSelected] = useState();

  const [company_payments, setCompany_payments] = useState([]);

  const [company_deliveries, setCompany_deliveries] = useState([]);

  const { currentLocation, setCurrentLocation } = useContext(StorageContext);

  const { requestLocationPermission } = HomeViewModel();

  const { handleSheetChanges } = SettingViewModel();

  const { handleGetLanguageKey, handleSwitchGlobleLanguageKey } =
    SettingViewModel();

  const [languageKey, setLanguageKey] = useState();

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {}, [selectedId]);

  // GPSInfo
  const {
    googleAddressInfoData,
    isGoogleAddressInfoLoading,
    setIsGoogleAddressInfoLoading,
    googleAddressInfoError,
    handleGetGoogleAddressInfo,
  } = GoogleApiModel.getGoogleAddressInfo();

  useEffect(() => {
    if (googleAddressInfoData) {
      let addr =
        googleAddressInfoData.country +
        ", " +
        googleAddressInfoData.district +
        ", " +
        googleAddressInfoData.provice +
        ", " +
        googleAddressInfoData.village;
      setAddressShope(addr);
    }
  }, [googleAddressInfoData]);

  useEffect(() => {
    handleGetGoogleAddressInfo({
      lat: currentLocation?.latitude,
      log: currentLocation?.longitude,
      lg: handleSwitchGlobleLanguageKey(languageKey),
    });
  }, [languageKey, currentLocation]);
  // End GPS

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

  const { bottomSheetRef } = RegisterSellerViewModel();

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

  const [markerCoordinates, setMarkerCoordinates] = useState("");

  // ຮັບຄ່າຕາມມູດ
  const [destination, setDestination] = useState(0); // ຮັບຄ່າ location ທີ່ີເຮົາປັກມູດ

  //ChangLocation whe hold ConfirmLocation
  const handleConfirmLocation = () => {
    setCurrentLocation(markerCoordinates);
    console.log("maker======>",markerCoordinates);
    setModalVisibleTwo(false);
    
  };

  const handleConfirmCurrentLocation = () => {
    setModalVisible(false);
  };

  useEffect(() => {}, [company_payments]);

  useEffect(() => {}, [company_deliveries]);

  useEffect(() => {}, [company_infras]);

  /////====MarkerGPS ==================================>
  const handleMarkerDrag = (coordinate) => {
    console.log("Marker dragged to:", coordinate);
    setMarkerCoordinates(coordinate);
    setDestination(coordinate);
  };

  const handleMapPress = (event) => {
    const { coordinate } = event?.nativeEvent;
    setMarkerCoordinates(coordinate);
    setDestination(coordinate);
    console.log("Marker Press to:", coordinate);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
              <View className="flex">
                <View className="flex flex-row mb-5 justify-between p-1">
                  <View></View>
                  <Text
                    className="ml-5"
                    style={[
                      themeStyles.headerTextStyle,
                      { color: themeColors.blackColor },
                    ]}
                  >
                    ເລືອກທີ່ຕັ້ງ
                  </Text>
                  <View className="mr-1">
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <OutLineIcon.XMarkIcon
                        size={30}
                        color={themeColors.primaryColorS}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {currentLocation && (
                  <MapView
                    showsUserLocation
                    // ref={mapViewRef}
                    style={{ width: 420, height: 420 }}
                    provider={
                      Platform.OS === "android"
                        ? PROVIDER_GOOGLE
                        : PROVIDER_DEFAULT
                    }
                    initialRegion={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    onPress={(event) => {
                      console.log(event);
                    }}
                  >
                    <Marker coordinate={currentLocation}>
                      <Image
                        source={require("../../../../assets/icons/logation_icon.png")}
                        className={"w-[60px] h-[70px]"}
                      />
                    </Marker>
                  </MapView>
                )}
              </View>
              <View className="mt-[5px] p-10">
                <RadiusButton
                  text={"ຢືນຢັນສະຖານທີ່"}
                  onPress={() => {
                    handleConfirmCurrentLocation();
                  }}
                  textColor={themeColors.bgColor}
                  textStyle={themeColors.subTitleTextStyle}
                  backgroundColor={themeColors.primaryColorS}
                />
              </View>
            </BottomSheet>
          </GestureHandlerRootView>
        </Modal>

        {/* //Two */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleTwo}
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
              <View className="flex">
                <View className="flex flex-row mb-5 justify-between p-1">
                  <View></View>
                  <Text
                    className="ml-5"
                    style={[
                      themeStyles.headerTextStyle,
                      { color: themeColors.blackColor },
                    ]}
                  >
                    ເລືອກທີ່ຕັ້ງ
                  </Text>
                  <View className="mr-1">
                    <TouchableOpacity onPress={() => setModalVisibleTwo(false)}>
                      <OutLineIcon.XMarkIcon
                        size={30}
                        color={themeColors.primaryColorS}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {currentLocation && (
                  <MapView
                    showsUserLocation
                    // ref={mapViewRef}
                    style={{ width: 420, height: 420 }}
                    provider={
                      Platform.OS === "android"
                        ? PROVIDER_GOOGLE
                        : PROVIDER_DEFAULT
                    }
                    initialRegion={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    onPress={(event) => {
                      handleMapPress(event);
                    }}
                  >
                    {markerCoordinates && (
                      <>
                        <Marker
                          coordinate={markerCoordinates} // coordinate ກຳນົດຄຳແໜ່ງຂອງ ມາກເກີເທິ່ງແຜ່ນທີ່ໂດຍໃຫ້ຄ່າຢູ່ໃນ markerCoordinates
                          draggable={true} //draggable ລາກມາກຕຳຈຸດທີ່ເຮົາກຳນົດ
                          onDragEnd={(event) =>
                            handleMarkerDrag(event.nativeEvent.coordinate)
                          }
                          // onPress={() => handleMapPinPress(markerCoordinates)}
                        >
                          <Image
                            source={require("../../../../assets/icons/logation_icon.png")}
                            className={"w-[60px] h-[70px]"}
                          />
                        </Marker>
                      </>
                    )}
                  </MapView>
                )}
              </View>
              <View className="mt-[5px] p-10">
                <RadiusButton
                  text={"ຢືນຢັນສະຖານທີ່"}
                  onPress={() => {
                    handleConfirmLocation();
                  }}
                  textColor={themeColors.bgColor}
                  textStyle={themeColors.subTitleTextStyle}
                  backgroundColor={themeColors.primaryColorS}
                />
              </View>
            </BottomSheet>
          </GestureHandlerRootView>
        </Modal>

        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterSeller")}
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
        <NavBarPageRegis value={1} />

        <View style={{ padding: 20 }}>
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.primaryColorS },
            ]}
          >
            ລາຍລະອຽດເພິ່ມເຕີມກ່ຽວກັບຮ້ານ
          </Text>

          <View className={"mt-5"}>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ທະນາຄານທີ່ສາມາດຈ່າຍໄດ້
            </Text>

            <View
              style={{ flex: 1 }}
              className={"flex flex-row mt-1 items-center"}
            >
              <FlatList
                scrollEnabled={false}
                data={RegisterSellerTwoData}
                renderItem={({ item, index }) => (
                  <View
                    style={{ flex: 1 }}
                    className={"flex flex-row space-x-4 p-1"}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleCheckboxChange(
                          item?.ptid,
                          company_payments,
                          setCompany_payments
                        );
                      }}
                    >
                      <Image
                        source={
                          company_payments.some(
                            (prev) => prev?.id === item?.ptid
                          )
                            ? require("../../../../assets/icons/checked_icon.png")
                            : require("../../../../assets/icons/noncheck_icon.png")
                        }
                        style={{ width: 19, height: 19, paddingVertical: 1 }}
                      />
                      {}
                    </TouchableOpacity>
                    <Image
                      source={{
                        uri: item?.payment_type_img?.image?.imagesUrl
                          ? item?.payment_type_img?.image?.imagesUrl
                          : "https://demofree.sirv.com/nope-not-here.jpg",
                      }}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text
                      style={[
                        themeStyles.textStyle,
                        { color: themeColors.titleTextColor },
                      ]}
                    >
                      {item.name_la}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>

          <View className={"mt-5"}>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ຂົນສົ່ງທີ່ສະດວກໃນການຈັດສົ່ງໃຫ້ລູກຄ້າ
            </Text>

            <View
              style={{ flex: 1 }}
              className={"flex flex-row mt-1 items-center"}
            >
              <FlatList
                scrollEnabled={false}
                data={DeliveryData}
                renderItem={({ item, index }) => (
                  <View
                    style={{ flex: 1 }}
                    className={"flex flex-row space-x-5"}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleCheckboxChangeDelivery(
                          item?.delid,
                          company_deliveries,
                          setCompany_deliveries
                        );
                      }}
                    >
                      <Image
                        source={
                          company_deliveries.some(
                            (pred) => pred?.id === item?.delid
                          )
                            ? require("../../../../assets/icons/checked_icon.png")
                            : require("../../../../assets/icons/noncheck_icon.png")
                        }
                        style={{ width: 19, height: 19, paddingVertical: 1 }}
                      />
                      {}
                    </TouchableOpacity>
                    <Image
                      source={{
                        uri: item?.delivery_image?.image?.imagesUrl
                          ? item?.delivery_image?.image?.imagesUrl
                          : "https://demofree.sirv.com/nope-not-here.jpg",
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                    <Text
                      style={[
                        themeStyles.textStyle,
                        { color: themeColors.titleTextColor },
                      ]}
                    >
                      {item.name_la}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>

          <View className={"mt-5"}>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ສິ່ງອຳນວຍຄວາມສະດວກ
            </Text>

            <View
              style={{ flex: 1 }}
              className={"flex flex-row mt-3 space-x-1"}
            >
              <View className={"flex flex-row "}>
                <FlatList
                  horizontal
                  scrollEnabled={false}
                  data={infrastructureData}
                  renderItem={({ item, index }) => (
                    <View className={"flex flex-row space-x-2"}>
                      <TouchableOpacity
                        onPress={() => {
                          handleCheckboxChangeInfrastructure(
                            item?.ifid,
                            company_infras,
                            setCompany_infras
                          );
                        }}
                      >
                        <Image
                          source={
                            company_infras.some(
                              (prevI) => prevI?.id === item?.ifid
                            )
                              ? require("../../../../assets/icons/checked_icon.png")
                              : require("../../../../assets/icons/noncheck_icon.png")
                          }
                          style={{ width: 19, height: 19, paddingVertical: 1 }}
                        />
                        {}
                      </TouchableOpacity>
                      <Text
                        style={[
                          themeStyles.textStyle,
                          { color: themeColors.titleTextColor },
                        ]}
                        className={"mr-5"}
                      >
                        {item.name_la}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View className={"rounded-md mt-3"}>
              <TextInput
                multiline={true}
                style={{
                  borderWidth: 2,
                  borderColor: "#A0A0A0",
                  textAlign: "left",
                  padding: 20,
                  borderRadius: 10,
                }}
                keyboardType={"default"}
                value={description}
                onChangeText={(text) => setDescription(text)}
                maxLength={1000}
                className={"h-[150px]"}
                placeholder="ຖ້າທ່ານມີສິ່ງອຳນວຍຄວາມສະດ້ວຍໃຫ້ລູກຄ້ານອກເໜືອຈາກ
                ນັ້ນ ກະລຸນາລະບຸ ແລະ ຂັ້ນດ້ວຍຈຸດ( , ) ເມື່ອມີຫຼາຍກວ່າ1ຢ່າງ"
              ></TextInput>
              <View className={"flex items-end justify-end"}>
                <Text>{description.length}/1000</Text>
              </View>
            </View>
          </View>

          <View className={"mt-5"}>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ທີ່ຕັ້ງຮ້ານ
            </Text>
            <View style={{ marginTop: 5 }}>
              <BorderTextInput
                placeholder={"ທີ່ຢູ່ຈະຂຶ້ນຕາມມຸດ"}
                value={addressShope}
                onChangeText={(val) => setAddressShope(val)}
              />
            </View>
          </View>

          <View className={"mb-5"}>
            <RadioGroup
              borderSize={1}
              layout="row"
              radioButtons={radioButtons}
              onPress={(id) => handleRadioButtonPress(id)}
              selectedId={selectedId}
            />
          </View>
          <View>
            {currentLocation && (
              <MapView
                // showsUserLocation
                // ref={mapViewRef}
                style={{ width: "100%", height: 200 }}
                provider={
                  Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
                }
                initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                // onPress={(event) => {
                //   console.log(event);
                // }}
              >
                <Marker coordinate={currentLocation}>
                  <Image
                    source={require("../../../../assets/icons/logation_icon.png")}
                    className={"w-[60px] h-[70px]"}
                  />
                </Marker>
              </MapView>
            )}
          </View>
          <View className={"mt-5"}>
            <RadiusButton
              text={"ໄປຕໍ່"}
              onPress={() => {
                handleRegisterPayDelLocation();
                navigation.navigate("RegisterSellerThree");
              }}
              textColor={themeColors.bgColor}
              textStyle={themeColors.subTitleTextStyle}
              backgroundColor={themeColors.primaryColorS}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});

export default RegisterSeller;
