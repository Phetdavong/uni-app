import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { themeStyles, themeColors } from "../../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../../../../stores/sellerProfile/sellerProfile.store";
import ModalLoading from "./ModalLoading";
import { useNavigation } from "@react-navigation/native";

const QuestionModal = ({
  activeVisible,
  setActiveVisible,
  comId,
}) => {
  const { t } = useTranslation();
  const { company, status, error } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const updateCompanyProfile = () => {
    console.log(`----------> update company profile`);
    dispatch(updateCompany(company));
    setActiveVisible(false);
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  return (
    <View className="flex absolute z-10">
      {isLoading ? <ModalLoading /> : null}

      <Modal animationType="fade" transparent={true} visible={activeVisible}>
        <View style={themeStyles.modalStyle}>
          <View
            className="w-[320px] bg-white px-5 pb-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              // padding: 20,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderColor: themeColors.bgColor,
                borderBottomWidth: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  {
                    color: themeColors.titleTextColor,
                    textAlign: "center",
                  },
                ]}
              >
                {t("ແຈ້ງເຕືອນ")}
              </Text>
            </View>

            <View className="space-y-4">
              <View
                style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                className="space-y-2"
              >
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    {
                      color: themeColors.subtitleTextColor,
                      textAlign: "center",
                    },
                  ]}
                >
                  {t("ທ່ານຕ້ອງການ")}
                </Text>
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    {
                      color: themeColors.subtitleTextColor,
                      textAlign: "center",
                    },
                  ]}
                >
                  {t("ບັນທຶກການແກ້ໄຂຂອງຮ້ານແທ້ບໍ່?")}
                </Text>
              </View>

              <View
                className="flex-row items-center w-full space-x-5"
                style={{ justifyContent: "flex-end" }}
              >
                <TouchableOpacity onPress={() => setActiveVisible(false)}>
                  <Text
                    style={[
                      themeStyles.subTitleTextStyle,
                      { color: themeColors.subTitleTextStyle },
                    ]}
                  >
                    {t("ຍົກລິກ")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateCompanyProfile();
                    setIsLoading(true);
                    navigation.navigate("Home");
                  }}
                >
                  <Text
                    style={[themeStyles.subTitleTextStyle, { color: themeColors.primaryColorS }]}
                  >
                    {t("ບັນທຶກ")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuestionModal;
