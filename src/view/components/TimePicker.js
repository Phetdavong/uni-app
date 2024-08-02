import { View, Text, TouchableOpacity, Modal } from "react-native";
import { themeColors, themeStyles } from "../styles";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import SettingViewModel from "../../viewModel/settingViewModels/SettingViewModel";
import RadiusSwitch from "./RadiusSwitch";
import RegisterSellerThreeViewModel from "../../viewModel/registerSellerViewModels/RegisterSellerThreeViewModel";

const TimePicker = ({
  onPress,
  textTitle,
  index,
  length,
  id,
  timeClo,
  timeOp,
  breakStart,
  breakEnd,
  DateInfo,

}) => {
  const {

    formatDate,

  } = RegisterSellerThreeViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  const [isChecked, setIsChecked] = useState(true);

  const bottomSheetRef = useRef(null);

  const { handleSheetChanges } = SettingViewModel();

  // const [isNightPushEnabled, setIsNightPushEnabled] = useState("Y");

  // const handleControlNightNotification = async () => {
  //   if (isNightPushEnabled === "Y") {
  //     await handleUpdateNotificationNightPush("N", mId);
  //   } else {
  //     await handleUpdateNotificationNightPush("Y", mId);
  //   }
  // };

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        if (modalVisible) {
          bottomSheetRef?.current?.snapToIndex(0);
        }
      }, 130);
    }
  }, [modalVisible]);

  return (
    <View
      className="justify-between flex-row"
      style={{
        borderBottomWidth: index === 6 ? 0 : 1,
        borderColor: "#CFCFCF",
        paddingBottom: index + 1 === length ? 0 : 1,
        flex: 1,
      }}
    >
      <View className="flex p-3">
        <Text className="mb-5" style={[themeStyles.titleTextStyle]}>
          ວັນ{textTitle}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text>
            {DateInfo.open} - {DateInfo.close}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex p-5">
        <View className="mb-5 items-end" style={[themeStyles.titleTextStyle]}>
          <RadiusSwitch
            switchValue={isChecked}
            setSwitchValue={setIsChecked}
            onChange={(newValue) => {
              setIsChecked(newValue);
            }}
          />
        </View>
        <TouchableOpacity>
          <Text>
            ພັກ ({DateInfo.break_start} - {DateInfo.break_end})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimePicker;
