import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { themeColors, themeStyles } from "../../../../styles";
import * as OutLineIcon from "react-native-heroicons/outline";

import NavBar from "../../../../components/NavBar";
import NavbarPageRegis from "../../../../components/NavBarPageRegis";
import RegisterPayment from "./RegisterPayment";
import RegisterDelivery from "./RegisterDelivery";
import RegisterInfa from "./RegisterInfa";
import RegisterAdddress from "./RegisterAdddress";
import RadiusButton from "../../../../components/RadiusButton";

const DetailStore = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <View>
        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity
            onPress={() => {
                navigation.navigate("RegisterSeller");
              }}
            >
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

        <NavbarPageRegis value={1} />
        <View className="p-4">
          <Text className="text-[#FF7466] text-[18px] font-semibold">
            {t("ລາຍລະອຽດເພີ່ມເຕີ່ມກ່ຽວກັບຮ້ານ")}
          </Text>

          <RegisterPayment />

          <RegisterDelivery />

          <RegisterInfa />

          <RegisterAdddress />
          <View className="mt-5">
            <RadiusButton
              onPress={() => {
                navigation.navigate("DetailOpenShop");
              }}
              text={"ຕໍ່ໄປ"}
              textColor={"white"}
              backgroundColor={"#FF7466"}
              // backgroundColor={allFieldsFilled ? "#FF7466" : "#CFCFCF"}
              // disabled={!allFieldsFilled}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailStore;
