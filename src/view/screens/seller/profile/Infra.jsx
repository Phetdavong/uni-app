import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { themeColors, themeStyles } from "../../../styles";

import {
  setCompanyInfra,
  setDescription,
  addCompanyInfra,
  removeCompanyInfra,
} from "../../../../stores/sellerProfile/sellerProfile.store";

const Infra = ({ infras, setInfras, infraOpts }) => {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(
    Array.from({ length: infras.length }).fill(false)
  );

  const { company, status, error } = useSelector((state) => state.company);
  const maxLength = 1000;
  const characterCount = company?.other_info?.length || 0;
  const dispatch = useDispatch();

  const selectInfra = (item, check, index) => {
    
    if (!check) {
      
      setIsChecked((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
      dispatch(addCompanyInfra(item));
    } else {
     
      setIsChecked((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
      dispatch(removeCompanyInfra(item));
    }
  };

  useEffect(() => {
    
    setIsChecked((prevState) => {
      const newState = [...prevState];
      infras.forEach((item, index) => {
        const foundIndex = infraOpts.findIndex(
          (option) => option.ifid === item.ifid
        );
        if (foundIndex !== -1) {
          newState[index] = true;
        }
      });
      return newState;
    });
  }, [infraOpts]);

  return (
    <View style={{ marginTop: 16 }}>
      <View>
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.subtitleTextColor },
            { marginTop: 16 },
          ]}
        >
          {t("ສິ່ງອຳນວຍຄວາມສະດວກ")}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {infras.map((item, index) => {
          return (
            <View
              key={item.ifid}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  selectInfra(item, isChecked[index], index);
                }}
                style={{
                  marginTop: 5,
                  width: 18,
                  height: 16.94,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: isChecked[index]
                    ? themeColors.primaryColorS
                    : themeColors.textColor,
                  borderWidth: 2,
                  borderColor: isChecked[index]
                    ? themeColors.primaryColorS
                    : "#CFCFCF",
                }}
              >
                {isChecked[index] && (
                  <OutLineIcon.CheckIcon
                    size={15}
                    strokeWidth={3}
                    color={themeColors.primaryColorS}
                  />
                )}
              </TouchableOpacity>

              <Text
                style={[
                  themeStyles.textStyle,
                  { color: themeColors.subtitleTextColor },
                  { marginLeft: 8, marginTop: 5 },
                ]}
              >
                {item.name_la}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderRadius: 4,
            height: 152,
            borderColor: "#CFCFCF",
            padding: 10,
            textAlignVertical: "top",
            boxSizing: "border-box",
          }}
          value={company.other_info}
          multiline={true}
          numberOfLines={4}
          maxLength={maxLength}
          onChangeText={(val) => {
            dispatch(setDescription(val));
          }}
        ></TextInput>
      </View>
      <View className="flex-row justify-end">
        <Text
          style={[themeStyles.textStyle, { color: themeColors.disableColor }]}
        >
          {characterCount}
        </Text>
        <Text
          style={[themeStyles.textStyle, { color: themeColors.disableColor }]}
        >
          {" "}
          / {maxLength}
        </Text>
      </View>
    </View>
  );
};

export default Infra;
