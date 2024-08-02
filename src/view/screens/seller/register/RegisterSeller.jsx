import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { themeColors, themeStyles } from "../../../styles";
import * as OutLineIcon from "react-native-heroicons/outline";
import { CountryPicker } from "react-native-country-codes-picker";
import PhoneTextInput from "../../../components/PhoneTextInput";
import BorderTextInput from "../../../components/BorderTextInput";
import RadiusButton from "../../../components/RadiusButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../../../components/NavBar";
import NavbarPageRegis from "../../../components/NavBarPageRegis";
import AddProfileImages from "./AddProfileImages";
import AddProfileBackground from "./AddProfileBackground";
import {
  setName,
  setEmail,
  setTel,
} from "../../../../stores/registerCompany/registerCompany.store";

const RegisterSeller = ({ navigation, Image }) => {
  const { t } = useTranslation();
  const [callingCode, setCallingCode] = useState("+856");
  const [countryFlag, setCountryFlag] = useState("🇱🇦");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const dispatch = useDispatch();

  const { register, status, error } = useSelector((state) => state.register);

  useEffect(() => {
    if (register.name && register.email && register.tel ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [register.name, register.email, register.tel]);

  return (
    <ScrollView>
      <View>
        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity>
              <OutLineIcon.ArrowLeftIcon
                size={30}
                color={themeColors.bgColor}
              />
            </TouchableOpacity>
          }
          insideLeftIcon={
            <Text
              style={[
                themeStyles.headerTextStyle,
                { color: themeColors.bgColor },
              ]}
            >
              {t("ສະມັກເປັນຜູ້ຂາຍ")}
            </Text>
          }
        />
        <NavbarPageRegis value={0} />

        <View className="p-4">
          <Text
            style={[
              themeStyles.headerTextStyle,
              { color: themeColors.primaryColorS },
            ]}
          >
            {t("ເພີ່ມຂໍ້ມູນຂອງຮ້ານ")}
          </Text>
          <AddProfileImages />

          <AddProfileBackground />

          <View>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
              className={"mb-2"}
            >
              {t("ຊື່ຮ້ານ")}
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.primaryColorS },
                ]}
                className={"ml-1"}
              >
                *
              </Text>
            </Text>
            <View>
              <BorderTextInput
                keyboardType={"default"}
                placeholder={"ຊື່ຮ້ານ"}
                value={register.name}
                onChangeText={(val) => {
                  console.log("name");
                  dispatch(setName(val));
                }}
              />
            </View>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
              className={"mb-2"}
            >
              {t(" ອີເມວ")}
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.primaryColorS },
                ]}
              >
                *
              </Text>
            </Text>
            <View>
              <BorderTextInput
                value={register.email}
                keyboardType={"email"}
                placeholder={"ອິເມວ"}
                onChangeText={(val) => {
                  dispatch(setEmail(val));
                  console.log("email");
                }}
              />
            </View>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
              className={"mb-2"}
            >
              {t("ເບີໂທຮ້ານ")}
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.primaryColorS },
                ]}
              >
                *
              </Text>
            </Text>
            <View>
              <CountryPicker
                pickerButtonOnPress={(item) => {
                  setCallingCode(item.dial_code);
                  setCountryFlag(item.flag);
                  setIsCountryButtonSheet(false);
                }}
                popularCountries={["en", "ua", "pl"]}
              />
              <PhoneTextInput
                value={register.tel}
                onChangeText={(val) => {
                  dispatch(setTel(val));
                  console.log("phone");
                }}
                callingCode={callingCode}
                setCallingCode={setCallingCode}
                placeholder={"please Enter PhoneNumber"}
                flagImage={countryFlag}
              />
            </View>
          </View>

          <View className="mt-5">
            <RadiusButton
              onPress={() => {
                navigation.navigate("DetailStore");
                console.log("-------->hihihihi");
              }}
              text={"ຕໍ່ໄປ"}
              textColor={"white"}
              // backgroundColor={"#FF7466"}
              backgroundColor={allFieldsFilled ? "#FF7466" : "#CFCFCF"}
              disabled={!allFieldsFilled}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterSeller;
