import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../../../styles";

import NavBar from "../../../../components/NavBar";
import NavbarPageRegis from "../../../../components/NavBarPageRegis";

const SellerSubmitSuccess = () => {
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
      <NavbarPageRegis value={4} />
      <View className="p-4">
        <Text className="text-[#34A853] text-[18px] font-semibold">
          {t("ສົ່ງຄຳຮ້ອງສະມັກເປັນຜູ້ຂາຍສຳເລັດແລ້ວ")}
        </Text>

        <View className="justify-center items-center mt-5 p-10">
          <TouchableOpacity className="bg-[#34A853] w-[44px] h-[44px] rounded-full justify-center items-center mb-5">
            <OutLineIcon.CheckIcon size={30} color={themeColors.bgColor} />
          </TouchableOpacity>
          <Text className="text-[#394052] text-[16px] font-medium text-center">
            {t('ຄຳຮ້ອງຂອງທ່ານໄດ້ຖຶກສົ່ງໄປແລ້ວ')}
          </Text>
          <Text className="text-[#394052] text-[16px] font-medium text-center">
            {t('ກະລຸນາລໍຖ້າ Admin ກວດສອບຂໍ້ມູນຂອງທ່ານ')}
          </Text>
          
          <Image className="mt-5" resizeMode="cover" source={require('../../../../../../assets/icons/preview.png')}/>

          <TouchableOpacity className="bg-[#FF7466] p-4 w-[182px] justify-center items-center rounded-xl">
            <Text className="text-[#ffffff] text-[20px] font-semibold">{t('ກັບໄປທີ່ໜ້າຫຼັກ')}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default SellerSubmitSuccess;
