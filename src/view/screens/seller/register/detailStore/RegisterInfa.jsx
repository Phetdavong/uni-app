import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../../../styles";
import { useTranslation } from "react-i18next";
import { setInfras, setDescription } from "../../../../../stores/registerCompany/registerCompany.store";
import { useDispatch, useSelector } from "react-redux";

const infraOptions = [
  {
    ifid: 1,
    name: "ອິນເຕີເນັດ",
  },
  {
    ifid: 2,
    name: "ບ່ອນຈອດລົດ",
  },
  {
    ifid: 3,
    name: "ທີ່ນັ່ງຫຼິ້ນ (ຄາເຟ່)",
  },
];

const RegisterInfa = () => {
  const { t } = useTranslation();
  const { register } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const [isCheckInfra, setCheckInfra] = useState([]);

  const selectInfras = (item, check, index) => {
    if (check) {
      let arr = isCheckInfra;
      arr[index] = false;
      setCheckInfra(arr);

      const company_infras = register.company_infras.filter((inf) => {
        const ifid = inf.ifid;
        if (ifid === item.ifid) return inf;
      });
      dispatch(setInfras(company_infras));
    } else {
      let arr = isCheckInfra;
      arr[index] = true;
      setCheckInfra(arr);
      const updateInfras = [...register.company_infras, item];
      dispatch(setInfras(updateInfras));
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
        {t("ສິ່ງອຳນວຍຄວາມສະດວກ")}
      </Text>

      <View className="flex-row">
        {infraOptions.map((item, index) => (
          <View key={item.ifid} className="flex-row mt-4 mr-7">
            <TouchableOpacity
              onPress={() => {
                selectInfras(item, isCheckInfra[index], index);
              }}
              style={{
                marginTop: 5,
                width: 18,
                height: 16.94,
                paddingBottom: 5,
                alignItems: "center",
                justifyContent: "center",
                  borderColor: isCheckInfra[index]
                    ? themeColors.primaryColor
                    : themeColors.textColor,
                borderWidth: 1,
                borderColor: "#CFCFCF",
              }}
            >
              {isCheckInfra[index] && (
                  <OutLineIcon.CheckIcon
                    size={25}
                    color={themeColors.primaryColor}
                  />
                )}
            </TouchableOpacity>
            <Text
              style={[
                themeStyles.textStyle,
                { color: themeColors.subtitleTextColor },
                { marginLeft: 10 },
              ]}
            >
              {t(item.name)}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 4,
            height: 152,
            borderColor: "#CFCFCF",
            padding: 10,
            textAlignVertical: "top",
            boxSizing: "border-box",
          }}
          placeholder="ຖ້າທ່ານມີສິ່ງອຳນວຍຄວາມສະດ້ວຍໃຫ້ລູກຄ້ານອກເໜືອຈາກນັ້ນ ກະລຸນາລະບຸ ແລະ ຂັ້ນດ້ວຍຈຸດ( , ) ເມື່ອມີຫຼາຍກວ່າ1ຢ່າງ"
          placeholderTextColor={themeColors.disableColor}
          multiline={true}
          numberOfLines={4}
          onChangeText={(val) => {
            dispatch(setDescription(val))
           
          }}
        />
      </View>
    </View>
  );
};

export default RegisterInfa;
