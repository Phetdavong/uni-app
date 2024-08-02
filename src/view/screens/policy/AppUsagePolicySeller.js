import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import React, { useEffect } from "react";
import { themeColors, themeStyles } from "../../styles/index";
import NavBar from "../../components/NavBar";
import * as SolidIcon from "react-native-heroicons/solid";
import * as OutLineIcon from "react-native-heroicons/outline";
import NoDataMessage from "../../components/NoDataMessage";
import { useTranslation } from "react-i18next";
import PolicyApiModelSeller from "../../../viewApiModel/policyApiModels/PolicyApiModelSeller";
import AppUsagePolicyViewModel from "../../../viewModel/policyViewModels/AppUsagePolicyViewModel";

const AppUsagePolicy = ({ navigation }) => {
  const {
    AppUsagePolicyData,
    AppUsagePolicyLoadIng,
    AppUsagePolicyError,
    AppUsagePolicyCount,
    setAppUsagePolicyLoadIng,
    handleGetAppUsagePolicy,
  } = PolicyApiModelSeller.getAppUsagePolicyApi();

  const {
    handleSwitchHtmlContent,
    currentContent,
    setCurrentContent,
    currentLanguage,
    setCurrentLanguage,
  } = AppUsagePolicyViewModel();

  const { isChecked, setIsChecked } = AppUsagePolicyViewModel();

  const systemFonts = [
    ...defaultSystemFonts,
    "NotoSansLao-Medium",
    "NotoSansLao-Bold",
  ];

  const { width: contentWidth } = useWindowDimensions();

  const { t } = useTranslation();
  useEffect(() => {
    handleGetAppUsagePolicy();
  }, []);

  useEffect(() => {
    if (AppUsagePolicyData) {
      handleSwitchHtmlContent({
        data: AppUsagePolicyData,
        setContent: setCurrentContent,
      });
    }
  }, [AppUsagePolicyData, currentLanguage]);

  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = function (...args) {
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NavBar
          outSideLeftIcon={
            <TouchableOpacity>
              <OutLineIcon.ArrowLeftIcon
                size={28}
                color={themeColors.blackColor}
              />
            </TouchableOpacity>
          }
          insideLeftIcon={
            <Text
              style={[
                themeStyles.priceTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              ຂໍ້ກຳນົດ ແລະ ເງື່ອນໄຂ
            </Text>
          }
        />
        <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
          <Image
            source={require("../../../../assets/icons/UniMarkethub_icon.png")}
            style={{ width: 100, height: 50, padding: 20 }}
            className={"flex ml-3"}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* {AppUsagePolicyLoadIng ? ( */}
            {/* <View    // ໂຫລດຂໍ້ມູນ
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
            </View> */}
          {/* ) : currentContent ? ( */}
            <View>
              <RenderHtml
                source={{ html: AppUsagePolicyData?.content_la }}
                systemFonts={systemFonts}
                contentWidth={contentWidth}
                tagsStyles={{
                  body: {
                    fontFamily: "NotoSansLao-Medium",
                    fontSize: 16,
                    color: themeColors.subtitleTextColor,
                  },
                  h1: {
                    fontFamily: "NotoSansLao-Bold",
                    fontSize: 19,
                    color: themeColors.subtitleTextColor,
                  },
                  p: {
                    fontFamily: "NotoSansLao-Medium",
                    fontSize: 14,
                    color: themeColors.subtitleTextColor,
                  },
                }}
              />
              <View
                style={{ flex: 1 ,marginTop: 30 }}
                className={"flex-row items-center bottom-6"}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsChecked((prev) => !prev);
                  }}
                >
                  <Image
                    source={
                      isChecked
                        ? require("../../../../assets/icons/checked_icon.png")
                        : require("../../../../assets/icons/noncheck_icon.png")
                    }
                    style={{ width: 19, height: 19, paddingVertical: 1 }}
                  />
                  {}
                </TouchableOpacity>
                <Text
                  className={"ml-1 mr-1"}
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  ຂ້ອຍໄດ້ອ່ານ ແລະ ຍ້ອມຮັບ
                </Text>
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.primaryColor },
                  ]}
                >
                  ຂໍ້ກຳນົດ ແລະ ເງື່ອນໄຂ
                </Text>
              </View>
            </View>
          {/* ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NoDataMessage noDataText={t("no-app-usage-policy")} />
            </View>
          )} */}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterSeller")}
            disabled={!isChecked}
            className={"justify-center items-center h-16"}
            style={{
              backgroundColor: isChecked
                ? themeColors.primaryColorS
                : themeColors.textColor,
            }}
          >
            <Text
              className={"justify-center"}
              style={[
                themeStyles.priceTextStyle,
                { color: themeColors.bgColor },
              ]}
            >
              ໄປຕໍ່
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppUsagePolicy;
