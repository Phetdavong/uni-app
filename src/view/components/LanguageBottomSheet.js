import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SettingViewModel from "../../viewModel/settingViewModels/SettingViewModel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageList from "../../service/constantData/LanguageList";
import React, { useEffect, useMemo } from "react";
import i18next, {
  languageResources,
} from "../../service/languageService/i18next";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { themeColors, themeStyles } from "../styles";

const LanguageBottomSheet = ({ bottomSheetRef, setIsvisible, isVisible, setCurrentLanguage }) => {
  const snapPoints = useMemo(() => ["1%", "50%", "80%"], []);

  const { handleSheetChanges, handleChangelanguage } = SettingViewModel();

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        if (isVisible) {
          bottomSheetRef?.current?.snapToIndex(1);
        }
      }, 150);
    }
  }, [isVisible]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <GestureHandlerRootView style={themeStyles.modalStyle} >
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={(index) =>
            handleSheetChanges({
              index: index,
              setIsvisible: setIsvisible,
              isVisible: isVisible,
              bottomSheetRef: bottomSheetRef,
            })
          }
          style={{ zIndex: 500 }}
        >
          <FlatList
            data={Object.keys(languageResources)}
            keyExtractor={(item, index) => `${index}_cateId`}
            style={{ margin: 20 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  handleChangelanguage({
                    language: item,
                    bottomSheetRef: bottomSheetRef,
                    setIsvisible: setIsvisible,
                    setCurrentLanguage: setCurrentLanguage
                  });
                }}
                style={{
                  flexDirection: "row",
                  marginBottom: LanguageList.lenth === index - 1 ? 0 : 20,
                  backgroundColor: themeColors.bgColor,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                className="space-x-2 items-center"
              >
                <Image
                  source={LanguageList[item].flag}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {LanguageList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
            vertical
            showsHorizontalScrollIndicator={false}
          />
        </BottomSheet>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default LanguageBottomSheet;
