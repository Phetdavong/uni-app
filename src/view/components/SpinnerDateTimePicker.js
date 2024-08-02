import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Modal,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { themeStyles, themeColors } from "../styles";
import { useTranslation } from "react-i18next";
import React from "react";
 
const SpinnerDateTimePicker = ({
  date,
  locale,
  onChange,
  activeVisible,
  onAgreePress,
  onDisagreePress,
}) => {
//   const { t } = useTranslation();
 
  return (
    <Modal animationType="fade" transparent={true} visible={activeVisible}>
      <View style={themeStyles.modalStyle}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: 300,
            width: 300,
          }}
        >
          <RNDateTimePicker
            value={date}
            mode="date"
            display="spinner"
            locale={locale}
            onChange={onChange}
            dateFormat="dayofweek day month"
            style={{
              zIndex: 999,
              alignSelf: "center",
            }}
            textColor={Platform.OS === "ios" ? "black" : undefined}
          />
          <View
            className="flex-row items-center w-full space-x-12"
            style={{ paddingHorizontal: 40, justifyContent: "flex-end" }}
          >
            <TouchableOpacity onPress={onDisagreePress}>
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                {/* {t("cancel")} */}
                cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAgreePress}>
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                {/* {t("ok")} */}
                ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
 
export default SpinnerDateTimePicker;