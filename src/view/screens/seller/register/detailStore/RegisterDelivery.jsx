import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../../../styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { setDeliveries } from "../../../../../stores/registerCompany/registerCompany.store";

const deliveriesOption = [
  {
    delid: 1,
    name: "ຂົນສົ່ງຮຸ່ງອາລຸນ",
    icon: require("../../../../../../assets/icons/hal.png")
  },
  {
    delid: 2,
    name: "ຂົນສົ່ງອານຸສິດ",
    icon: require("../../../../../../assets/icons/ans.png")
  },
  {
    delid: 3,
    name: "ຂົນສົ່ງກຽງໄກ",
    icon: require("../../../../../../assets/icons/kk.png")
  },
];

const RegisterDelivery = () => {
  const { t } = useTranslation();
  const { register } = useSelector((state) => state.register);
  const [isCheckDelivery, setCheckDelivery] = useState([]);
  const dispatch = useDispatch();

  const selectDeliveries = (item, check, index) => {
    if (check) {
      let array = isCheckDelivery;
      array[index] = false;
      setCheckDelivery(array);

      const company_deliveries = register.company_deliveries.filter((del) => {
        const delid = del.delid;
        if (delid !== item.delid) return del;
      });
      dispatch(setDeliveries(company_deliveries));
    } else {
      let array = isCheckDelivery;
      array[index] = true;
      setCheckDelivery(array);
      const updateDeliveries = [...register.company_deliveries, item];
      dispatch(setDeliveries(updateDeliveries));
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
        {t("ຂົນສົ່ງທີ່ສະດວກໃນການຈັດສົ່ງໃຫ້ລູກຄ້າ")}
      </Text>

      {deliveriesOption.map((item, index) => (
        <View key={item.delid} className="flex-row items-center mt-4">
          <TouchableOpacity
            onPress={() => {
              selectDeliveries(item, isCheckDelivery[index], index);
            }}
            style={{
              marginTop: 5,
              width: 18,
              height: 16.94,
              paddingBottom: 5,
              alignItems: "center",
              justifyContent: "center",
              borderColor: isCheckDelivery[index]
                ? themeColors.primaryColor
                : themeColors.textColor,
              borderWidth: 1,
              borderColor: "#CFCFCF",
            }}
          >
            {isCheckDelivery[index] && (
              <OutLineIcon.CheckIcon
                size={25}
                color={themeColors.primaryColor}
              />
            )}
          </TouchableOpacity>

          <Image
            source={item.icon}
            className="w-[20px] h-[20px] mx-2 rounded-full"
          />

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

export default RegisterDelivery;
