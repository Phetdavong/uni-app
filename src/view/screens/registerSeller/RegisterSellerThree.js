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
  TouchableWithoutFeedback,
} from "react-native";
import SettingViewModel from "../../../viewModel/settingViewModels/SettingViewModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { themeColors, themeStyles } from "../../styles/index";
import * as OutLineIcon from "react-native-heroicons/outline";
import NavBarPageRegis from "../../components/NavBarPageRegis";
import NavBar from "../../components/NavBar";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useState, useMemo, useRef } from "react";
import RegisterSellerThreeViewModel from "../../../viewModel/registerSellerViewModels/RegisterSellerThreeViewModel";
import RegisterThreeApiModel from "../../../viewApiModel/registerSellerApiModels/RegisterThreeApiModel";
import TimePicker from "../../components/TimePicker";
import RadiusButton from "../../components/RadiusButton";
import DatePicker from "react-native-date-picker";
import { registerTimeAndBreak } from "../../../stores/features/RegisterSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

const formData = [
  {
    day: 1,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
  {
    day: 2,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
  {
    day: 3,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
  {
    day: 4,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
  {
    day: 5,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
  {
    day: 6,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
  {
    day: 7,
    open: "08:00",
    close: "17:00",
    break_start: "12:00",
    break_end: "13:00",
    isOpened: true,
  },
];

const RegisterSeller = ({ navigation }) => {
  //state keep data formData
  const [dayInfo, setDayInfo] = useState(formData);
  //keep item.id
  const [indexValue, setIndexValue] = useState(null);

  let [saveTime, setSaveTime] = useState(null);
  const [breakSaveTime, setBreakSaveTime] = useState("");

  // console.log("====>", saveTime)

  //redux
  const dispatch = useDispatch();

  //function redux dispatch keep dayInfo save in store
  const handleRegisterTimeAndBreak = () => {
    dispatch(registerTimeAndBreak({ data: dayInfo }));
  };

  //update time folle index
  const updateDayOpen = (date) => {
    console.log(`open date object`, date);
    /*
    setDayInfo((prevState) =>
      prevState.map((item) =>
        item.day === indexValue ? { ...item, open: date } : item
      )
    );
    */
  };

  const updateDayClose = (date) => {
    console.log(`close date object`, date);

    /*
    setDayInfo((prevState) =>
      prevState.map((item) =>
        item.day === indexValue ? { ...item, close: date } : item
      )
    );
    */
  };

  const updateDayBreakStart = (date) => {
    setDayInfo((prevState) =>
      prevState.map((item) =>
        item.day === indexValue ? { ...item, break_start: date } : item
      )
    );
  };

  const updateDayBreakEnd = (date) => {
    setDayInfo((prevState) =>
      prevState.map((item) =>
        item.day === indexValue ? { ...item, break_end: date } : item
      )
    );
  };

  const {
    modalVisible,
    setModalVisible,

    selectedTime,
    setSelectedTime,

    selectedTimeOut,
    setSelectedTimeOut,

    date,
    setDate,

    openShop,
    setOpenShop,

    breakTime,
    setBreakTime,

    start,
    setStart,
    end,
    setEnd,

    formatDate,
  } = RegisterSellerThreeViewModel();

  const snapPoints = useMemo(() => ["60%"], []);

  const handlePressCloseModel = () => {
    setModalVisible(false);
    setSelectedTime(true);
    setSelectedTimeOut(false);
  };

  const {
    dayOpenData,
    setDayOpenData,
    dayOpenLoadIng,
    setDayOpenLoadIng,
    dayOpenError,
    setDayOpenError,
    dayOpenCount,
    setDayOpenCount,
    handleGetDayOpen,
  } = RegisterThreeApiModel.getDayOpenApi();

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        if (modalVisible) {
          bottomSheetRef?.current?.snapToIndex(0);
        }
      }, 130);
    }
  }, [modalVisible]);

  const { requestLocationPermission } = HomeViewModel();

  const { handleSheetChanges } = SettingViewModel();

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    handleGetDayOpen();
  }, []);

  useEffect(() => {
    // console.log("======>",dayOpenData)
  }, [dayOpenData]);

  const handlePressSaveModel = () => {
    console.log("======> hello ", openTime);
  };

  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());

  const [breakStartTime, setBreakStartTime] = useState(new Date());
  const [breakEndTime, setBreakEndTime] = useState(new Date());

  const handleRegisterNextPage = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterSellerTwo")}
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
        <NavBarPageRegis value={2} />

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
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
                <View style={{ flex: 1 }}>
                  <View className="flex flex-row justify-between p-5">
                    <TouchableOpacity onPress={() => handlePressCloseModel()}>
                      <OutLineIcon.XMarkIcon
                        size={30}
                        color={themeColors.blackColor}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        themeStyles.headerTextStyle,
                        { color: themeColors.blackColor },
                      ]}
                    >
                      ຕັ້ງຄ່າເວລາຮ້ານ
                    </Text>
                    <TouchableOpacity onPress={() => handlePressCloseModel()}>
                      <OutLineIcon.CheckIcon
                        size={30}
                        color={themeColors.blackColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-row justify-around mt-5">
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedTime(true);
                        setSelectedTimeOut(false);
                      }}
                      style={{
                        backgroundColor:
                          selectedTime === true ? "#FFDDDA" : "#ffff",
                      }}
                      className="w-[150px] h-[40px] justify-center items-center rounded-lg"
                    >
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              selectedTime !== true
                                ? themeColors.blackColor
                                : themeColors.primaryColorS,
                          },
                        ]}
                      >
                        ເວລາເປີດ-ປິດ ຮ້ານ
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedTimeOut(true);
                        setSelectedTime(false);
                      }}
                      style={{
                        backgroundColor:
                          selectedTimeOut === true ? "#FFDDDA" : "#ffff",
                      }}
                      className="w-[150px] h-[40px] justify-center items-center rounded-lg"
                    >
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              selectedTimeOut !== true
                                ? themeColors.blackColor
                                : themeColors.primaryColorS,
                          },
                        ]}
                      >
                        ຊ່ວງເວລາພັກ
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {selectedTime === true ? (
                    <View style={{ flex: 1 }}>
                      <View className="flex flex-row justify-evenly mt-10">
                        <TouchableOpacity
                          onPress={() => {
                            setOpenShop(true);
                            setBreakTime(false);
                          }}
                          style={{
                            borderColor: themeColors.blackColor,
                            borderWidth: openShop === true ? 1 : 0,
                          }}
                          className="w-[90px] h-[30px] justify-center items-center rounded-md"
                        >
                          <Text
                            style={[
                              themeStyles.subTitleTextStyle,
                              {
                                color: themeColors.blackColor,
                              },
                            ]}
                          >
                            ຕັ້ງເວລາເລີ່ມ
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setBreakTime(true);
                            setOpenShop(false);
                          }}
                          style={{
                            borderColor: themeColors.blackColor,
                            borderWidth: breakTime === true ? 1 : 0,
                          }}
                          className="w-[90px] h-[30px] justify-center items-center rounded-md"
                        >
                          <Text
                            style={[
                              themeStyles.subTitleTextStyle,
                              {
                                color: themeColors.blackColor,
                              },
                            ]}
                          >
                            ເວລາສິ້ນສຸດ
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{ flex: 1, alignItems: "center" }}
                        className={"mt-10"}
                      >
                        <DatePicker
                          mode="time"
                          dividerColor="#fff"
                          date={openShop ? openTime : closeTime}
                          onDateChange={(date) => {
                            const time = moment(date).format("HH:mm");

                            // console.log('saveTime is ', saveTime);
                            if (openShop) saveTime.open = time;
                            else saveTime.close = time;
                            // console.log(`schedule change`, dayInfo);
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      <View className="flex flex-row justify-evenly mt-10">
                        <TouchableOpacity
                          onPress={() => {
                            setStart(true);
                            setEnd(false);
                          }}
                          style={{
                            borderColor: themeColors.blackColor,
                            borderWidth: start === true ? 1 : 0,
                          }}
                          className="w-[90px] h-[30px] justify-center items-center rounded-md"
                        >
                          <Text
                            style={[
                              themeStyles.subTitleTextStyle,
                              {
                                color: themeColors.blackColor,
                              },
                            ]}
                          >
                            ຕັ້ງເວລາເລີ່ມ
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setEnd(true);
                            setStart(false);
                          }}
                          style={{
                            borderColor: themeColors.blackColor,
                            borderWidth: end === true ? 1 : 0,
                          }}
                          className="w-[90px] h-[30px] justify-center items-center rounded-md"
                        >
                          <Text
                            style={[
                              themeStyles.subTitleTextStyle,
                              {
                                color: themeColors.blackColor,
                              },
                            ]}
                          >
                            ເວລາສິ້ນສຸດ
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{ flex: 1, alignItems: "center" }}
                        className={"mt-10"}
                      >
                        <DatePicker
                          mode="time"
                          dividerColor="#fff"
                          date={start ? breakStartTime : breakEndTime}
                          onDateChange={(date) => {
                            const time = moment(date).format("HH:mm");
                            if (start) saveTime.break_start = time;
                            else saveTime.break_end = time;

                            // if (start === true) {
                            //   updateDayBreakStart(dateBreak);
                            // } else {
                            //   updateDayBreakEnd(dateBreak);
                            // }

                            // console.log(`schedule change`, dayInfo);
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </BottomSheet>
            </GestureHandlerRootView>
          </Modal>
        </TouchableWithoutFeedback>

        <View style={{ padding: 20, flex: 1 }}>
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.primaryColorS },
            ]}
          >
            ເວລາໃນການເປີດປີດຮ້ານ
          </Text>

          <View className="mt-5">
            <FlatList
              scrollEnabled={false}
              data={dayOpenData}
              renderItem={({ item, index }) => {
                const itemId = item.did;
                // console.log("===>", item.did, dayInfo.find(item => item.day === itemId))
                // setSaveTime(dayInfo.find((item) => item.day === itemId))
                return (
                  <TimePicker
                    DateInfo={dayInfo.find((item) => item.day === itemId)}
                    id={item.did}
                    index={index}
                    textTitle={item.name_la}
                    length={item?.length}
                    onPress={() => {
                      const selectedDayInfo = dayInfo.find(
                        (item) => item.day === itemId
                      );
                      saveTime = selectedDayInfo;
                      setSaveTime(selectedDayInfo);

                      // set open time
                      const selectedTime = new Date();
                      if (!saveTime.open) return;
                      const selectHours = saveTime.open.split(":");
                      const hour = parseInt(selectHours[0]);
                      const minute = parseInt(selectHours[1]);
                      selectedTime.setHours(hour, minute, 0, 0);
                      setOpenTime(selectedTime);

                      // set close time
                      if (!saveTime.close) return;
                      const myCloseTime = new Date();
                      const closeTimes = saveTime.close.split(":");
                      const closeHour = parseInt(closeTimes[0]);
                      const closeMinute = parseInt(closeTimes[1]);
                      myCloseTime.setHours(closeHour, closeMinute, 0, 0);
                      setCloseTime(myCloseTime);
                      console.log(`close time `, closeTime);

                      // set break time start
                      if (!saveTime.break_start) return;
                      const myTime = new Date();
                      const selectBreakHours = saveTime.break_start.split(":");
                      const breakHour = parseInt(selectBreakHours[0]);
                      const breakMinute = parseInt(selectBreakHours[1]);
                      myTime.setHours(breakHour, breakMinute, 0, 0);
                      setBreakStartTime(myTime);

                      // set break time end
                      if (!saveTime.break_end) return;
                      const breakEnd = new Date();
                      const selectBreakEndHours = saveTime.break_end.split(":");
                      const breakEndHour = parseInt(selectBreakEndHours[0]);
                      const breakEndMinute = parseInt(selectBreakEndHours[1]);
                      breakEnd.setHours(breakEndHour, breakEndMinute, 0, 0);
                      setBreakEndTime(breakEnd);

                      // setBreakSaveTime(dayInfo.find((item) => item.day === itemId));

                      // console.log(`----> save break time ------>`, breakSaveTime);

                      setIndexValue(itemId);

                      setModalVisible(true);
                    }}
                  />
                );
              }}
            />
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <RadiusButton
            text={"ໄປຕໍ່"}
            onPress={() => {
              handleRegisterTimeAndBreak(),
                navigation.navigate("RegisterSellerFour");
            }}
            textColor={themeColors.bgColor}
            textStyle={themeColors.subTitleTextStyle}
            backgroundColor={themeColors.primaryColorS}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterSeller;
