import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../../../styles";
import { useTranslation } from "react-i18next";
import { setPayments } from "../../../../../stores/registerCompany/registerCompany.store";
import { useDispatch, useSelector } from "react-redux";

const paymentOptions = [
  {
    ptid: 1,
    name: "ທະນາຄານການຄ້າ ຕ່າງປະເທດລາວ",
    icon: require("../../../../../../assets/icons/bcel.png"),
  },
  {
    ptid: 2,
    name: "ທະນາຄານຮ່ວມພັດທະນາ",
    icon: require("../../../../../../assets/icons/jdb.png"),
  },
];

const RegisterPayment = () => {
  const { t } = useTranslation();
  const { register } = useSelector((state) => state.register);
  const [isCheckPayment, setCheckPayment] = useState([]);
  const dispatch = useDispatch();

  const selectPayments = (item, check, index) => {
    if (check) {
      let arr = isCheckPayment;
      arr[index] = false;

      setCheckPayment(arr);
      const company_payments = register.company_payments.filter((pay) => {
        const ptid = pay.ptid;
        if (ptid === item.ptid) return pay;
      });

      dispatch(setPayments(company_payments));
    } else {
      let arr = isCheckPayment;
      arr[index] = true;
      setCheckPayment(arr);
      const updatePayments = [...register.company_payments, item];
      dispatch(setPayments(updatePayments));
    }
  };

  return (
    <View>
      <Text
        className="mt-4"
        style={[
          themeStyles.subTitleTextStyle,
          { color: themeColors.subtitleTextColor },
        ]}
      >
        {t("ທະນາຄານທີ່ສາມາດຈ່າຍໄດ້")}
      </Text>

      {paymentOptions.map((item, index) => (
        <View key={item.ptid} className="flex-row items-center mt-4">
          <TouchableOpacity
            onPress={() => {
              selectPayments(item, isCheckPayment[index], index);
            }}
            style={{
              marginTop: 5,
              width: 18,
              height: 16.94,
              paddingBottom: 5,
              alignItems: "center",
              justifyContent: "center",
              borderColor: isCheckPayment[index]
                ? themeColors.primaryColor
                : themeColors.textColor,
              borderWidth: 1,
              borderColor: "#CFCFCF",
            }}
          >
            {isCheckPayment[index] && (
              <OutLineIcon.CheckIcon
                size={25}
                color={themeColors.primaryColor}
              />
            )}
          </TouchableOpacity>

          <Image source={item.icon} className="w-[20px] h-[20px] mx-2" />
          <Text
            style={[
              themeStyles.textStyle,
              { color: themeColors.subtitleTextColor },
            ]}
          >
            {t(item.name)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RegisterPayment;
