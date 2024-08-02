import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { themeColors, themeStyles } from "../../../../styles";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";

import NavBar from "../../../../components/NavBar";
import NavbarPageRegis from "../../../../components/NavBarPageRegis";
import CardTextChoice from "../../../../components/CardTextChoice";
import RadiusButton from "../../../../components/RadiusButton";
import { registerCompanny } from "../../../../../stores/registerCompany/registerCompany.store";

const IdentityVerification = () => {
  const { t } = useTranslation();

  const registerCompanny = () => {
    console.log('register company')
  }
  return (
    <ScrollView>
      <NavBar
        backgroundColor={themeColors.primaryColorS}
        outSideLeftIcon={
          <TouchableOpacity>
            <OutLineIcon.ArrowLeftIcon size={30} color={themeColors.bgColor} />
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
      <NavbarPageRegis value={3} />

      <View className="p-4">
        <Text className="text-[#FF7466] text-[18px] font-semibold">
          {t("ການຢືນຢັນຕົວຕົນ")}
        </Text>

        <View className="mt-7">
          <Text className="text-[#000000] text-[16px] font-medium">
            {t("ເລືອກປະເພດເອກະສານທີ່ໃຊ້ໃນການຢືນຢັນຕົວຕົນ")}
          </Text>
          <View className="mt-5">
            <CardTextChoice 
            />
          </View>
        </View>
        <View className="mt-5">
          <RadiusButton
            onPress={() => {
              registerCompanny();
              navigation.navigate("SellerSubmitSuccess");
              console.log("-------->hihihihi");
            }}
            text={"ບັນທຶກ"}
            textColor={"white"}
            backgroundColor={"#FF7466"}
            // backgroundColor={allFieldsFilled ? "#FF7466" : "#CFCFCF"}
            // disabled={!allFieldsFilled} 
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default IdentityVerification;
