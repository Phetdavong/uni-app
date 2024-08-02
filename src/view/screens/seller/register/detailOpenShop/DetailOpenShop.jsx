import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { themeColors, themeStyles } from "../../../../styles";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";

import NavBar from "../../../../components/NavBar";
import NavbarPageRegis from "../../../../components/NavBarPageRegis";
import RadiusSwitch from "../../../../components/RadiusSwitch";
import RadiusButton from "../../../../components/RadiusButton";

const DetailOpenShop = () => {
  const { t } = useTranslation();
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
      <NavbarPageRegis value={2} />
      <View className="m-4">
        <Text className="text-[#FF7466] text-[18px] font-semibold">
          {t("ລາຍລະອຽດເວລາໃນການເປີດຮ້ານ")}
        </Text>

        {/* Monday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນຈັນ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        {/* Tuesday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນຄານ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        {/* Wednesday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນພຸດ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        {/* Thursday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນພະຫັດ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        {/* Friday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນສຸກ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        {/* Saturday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນເສົາ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        {/* Sunday */}
        <View>
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#000000] text-[16px] font-medium">
              {t("ວັນອາທິດ")}
            </Text>
            <RadiusSwitch />
          </View>

          <View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[#394052] text-[14px] font-medium">
                {t("08:30 - 17:30")}
              </Text>
              <Text className="text-[#394052] text-[14px] font-medium">
                {t(" ພັກ ( 12:00 - 13:00 )")}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 1, backgroundColor: "#CFCFCF", marginTop: 15 }}
          />
        </View>

        <View className="mt-5">
          <RadiusButton
            onPress={() => {
              navigation.navigate("IdentityVerification");
              console.log("-------->hihihihi");
            }}
            text={"ຕໍ່ໄປ"}
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

export default DetailOpenShop;
