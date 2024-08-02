import AppUsagePolicyViewModel from "../../../viewModel/policyViewModels/AppUsagePolicyViewModel";
import SettingViewModel from "../../../viewModel/settingViewModels/SettingViewModel";
import PolicyApiModel from "../../../viewApiModel/policyApiModels/PolicyApiModel";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import LanguageBottomSheet from "../../components/LanguageBottomSheet";
import LanguageList from "../../../service/constantData/LanguageList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as OutLineIcon from "react-native-heroicons/outline";
import NoDataMessage from "../../components/NoDataMessage";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";



const AppUsagePolicy = () => {
  const {
    isChecked,
    setIsChecked,
    handleSwitchHtmlContent,
    currentLanguage,
    setCurrentLanguage,
    bottomSheetRef,
    isVisible,
    setIsvisible,
    languageIcon,
    setLanguageIcon,
    currentContent,
    setCurrentContent,
  } = AppUsagePolicyViewModel();

  const {
    appUsagePolicyData,
    isAppUsagePolicyLoading,
    setIsAppUsagePolicyLoading,
    appUsagePolicyError,
    handleGetAppUsagePolicy,
  } = PolicyApiModel.getAppUsagePolicy();

  const { handleLoadLanguage, handleGetLanguageIcon } = SettingViewModel();

  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation()

  const systemFonts = [
    ...defaultSystemFonts,
    "NotoSansLao-Medium",
    "NotoSansLao-Bold",
  ];

  useEffect(() => {
    handleGetAppUsagePolicy({ pcid: 1 });
  }, []);

  useEffect(() => {
    handleLoadLanguage(appUsagePolicyData);
  }, []);

  useEffect(() => {
    handleGetLanguageIcon(setLanguageIcon);
  }, [currentLanguage]);

  useEffect(() => {
    if (appUsagePolicyData) {
      handleSwitchHtmlContent({
        data: appUsagePolicyData,
        setContent: setCurrentContent,
      });
    }
  }, [appUsagePolicyData, currentLanguage]);

  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = function(...args) {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }
  
      originalConsoleError(...args);
    };
  
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

        <LanguageBottomSheet
          setCurrentLanguage={setCurrentLanguage}
          bottomSheetRef={bottomSheetRef}
          setIsvisible={setIsvisible}
          isVisible={isVisible}
        />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NavBar
          backgroundColor={"white"}
          middleIcon={
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              {t("app-usage-policy")}
            </Text>
          }
          outSideRightIcon={
            <TouchableOpacity
              onPress={() => {
                setIsvisible(true);
              }}
            >
              <Image source={languageIcon ? languageIcon : require('../../../../assets/icons/english_icon.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          }
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
          <Image
            source={require("../../../../assets/icons/UniMarkethub_icon.png")}
            style={{ height: 40, width: 80 }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
          }}
        >
          {isAppUsagePolicyLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ActivityIndicator
                size="large"
                color={themeColors.primaryColor}
              />
            </View>
          ) : currentContent ? (
            <View>
              <RenderHtml
                source={{ html: currentContent }}
                systemFonts={systemFonts}
                contentWidth={width}
                tagsStyles={{
                  body: {
                    fontFamily: "NotoSansLao-Medium",
                    fontSize: 14,
                    color: themeColors.titleTextStyle,
                  },
                  h1: {
                    fontFamily: "NotoSansLao-Bold",
                    fontSize: 16,
                    color: themeColors.titleTextStyle,
                  },
                  p: {
                    fontFamily: "NotoSansLao-Medium",
                    fontSize: 14,
                    color: themeColors.titleTextStyle,
                  },
                }}
              />
              <View
                className="flex-row items-center space-x-2"
                style={{ marginBottom: 20 }}
              >
                <TouchableOpacity
                  onPress={() => setIsChecked(prev => !prev)}
                  style={{
                    width: 20,
                    height: 20,
                    paddingBottom: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: isChecked
                      ? themeColors.primaryColor
                      : themeColors.textColor,
                    borderWidth: 2,
                  }}
                >
                  {isChecked ? (
                    <OutLineIcon.CheckIcon
                      size={25}
                      color={themeColors.primaryColor}
                    />
                  ) : null}
                </TouchableOpacity>

                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    { color: themeColors.subtitleTextColor },
                  ]}
                >
                  {t("I-agree-with")}
                </Text>
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    { color: themeColors.primaryColor },
                  ]}
                >
                  {t("terms-and-privacy-policy")}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height: height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NoDataMessage noDataText={t("no-app-usage-policy")} />
            </View>
          )}
        </View>
        <TouchableOpacity
          disabled={!isChecked}
          className="w-full h-[60px] items-center justify-center"
          style={{
            backgroundColor: isChecked
              ? themeColors.primaryColor
              : themeColors.textColor,
          }}
          onPress={() => {navigation.replace('Login')}}
        >
          <Text style={[themeStyles.titleTextStyle, { color: "white" }]}>
            {t("next")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppUsagePolicy;
