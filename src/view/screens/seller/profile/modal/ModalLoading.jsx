import { View, Text, Modal, ActivityIndicator } from "react-native";
import { themeStyles, themeColors } from "../../../../styles";
import { useTranslation } from "react-i18next";
import React from "react";

const ModalLoading = ({ activeVisible }) => {
  const { t } = useTranslation();

  return (
    <Modal animationType="fade" transparent={true} activeVisible={activeVisible}>
      <View style={themeStyles.modalStyle}>
        <View
          className="flex-row w-[320px] bg-white space-x-6 py-4"
          style={{ 
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <ActivityIndicator size="27" color={themeColors.primaryColor} />
          <Text
            style={[
              themeStyles.titleTextStyle,
              {
                color: themeColors.titleTextColor,
                textAlign: "center",
              },
            ]}
          >

            {t("ກຳລັງບັນທຶກຂໍ້ມູນ")}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoading;
