import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import LoginViewModel from "../../../viewModel/loginViewModels/LoginViewModel";
import LanguageBottomSheet from "../../components/LanguageBottomSheet";
import BorderTextInput from "../../components/BorderTextInput";
import * as OutLineIcon from "react-native-heroicons/outline";
import RadiusButton from "../../components/RadiusButton";
import { themeStyles, themeColors } from "../../styles";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import React from "react";

const Login = () => {
  const {
    isVisible,
    setIsvisible,
    bottomSheetRef,
    currentLanguage,
    setCurrentLanguage,
    phone,
    setPhone,
    password,
    setPassword,
  } = LoginViewModel();

  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <LanguageBottomSheet
            setCurrentLanguage={setCurrentLanguage}
            bottomSheetRef={bottomSheetRef}
            setIsvisible={setIsvisible}
            isVisible={isVisible}
          />

          <NavBar
            outSideLeftIcon={
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                {t("login")}
              </Text>
            }
            insideLeftIcon={
              <OutLineIcon.UserIcon
                size={25}
                color={themeColors.titleTextColor}
              />
            }
            outSideRightIcon={
              <TouchableOpacity
                onPress={() => {
                  setIsvisible(true);
                }}
              >
                <Image
                  source={require("../../../../assets/icons/laos_icon.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            }
          />
          <View style={{ flex: 1, padding: 20 }}>
            <Image
              source={require("../../../../assets/logos/UniMarkethub_logo.png")}
              style={{ width: 300, height: 200, alignSelf: "center" }}
            />
            <View className="space-y-4">
              <View className="space-y-2">
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {t("phone-number")}
                </Text>
                <View>
                  <BorderTextInput
                    value={phone}
                    keyboardType={"default"}
                    placeholder={t("please-enter-phone-number")}
                    onChangeText={(text) => {
                     
                    }}
                  />
                </View>
              </View>
              <View className="space-y-2">
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {t("password")}
                </Text>
                <View>
                  <BorderTextInput
                    value={phone}
                    keyboardType={"default"}
                    placeholder={t("please-enter-password")}
                    onChangeText={(text) => {
                 
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <Text
                  style={[themeStyles.textStyle, { color: themeColors.followColor }]}
                >
                  {t('forgot-password')} {'?'}
                </Text>
              </TouchableOpacity>
              <View>
                <RadiusButton
                  onPress={() => {}}
                  disabled={false}
                  text={t("login")}
                  textColor={"white"}
                  backgroundColor={themeColors.primaryColor}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
