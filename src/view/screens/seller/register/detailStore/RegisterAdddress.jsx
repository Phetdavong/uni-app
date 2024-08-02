import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { themeStyles, themeColors } from "../../../../styles";
import BorderTextInput from "../../../../components/BorderTextInput";
import { RadioGroup } from "react-native-radio-buttons-group";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import HomeViewModel from "../../../../../viewModel/homeViewModels/HomeViewModel";


const RegisterAdddress = () => {
  const { t } = useTranslation();
  const { requestLocationPermission } = HomeViewModel();
  const [ location, setLocation ] = useState();



  useFocusEffect(
    useCallback(() => {
      if (location === null) {
        requestLocationPermission(setLocation);
      }
    }, [])
  );

  return (
    <ScrollView className="mt-7">
      <View>
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.titleTextColor },
          ]}
        >
          {t("ທີ່ຕັ້ງຮ້ານ")}
        </Text>
        <View className="mt-5">
          <BorderTextInput
            onChangeText={(val) => {
              console.log("ທີ່ຢູ່ຈະຂຶ້ນຕາມມຸດ");
            }}
            placeholder={t("ທີ່ຢູ່ຈະຂຶ້ນຕາມມຸດ")}
            
          />
        </View>
      </View>

      {/* <View style={{ marginBottom: 5, flexDirection: "row" }}>
          <RadioGroup
            layout="row"
            style={{
              marginLeft: 8,
              color: "#394052",
              fontSize: 14,
              fontWeight: 500,
            }}
            radioButtons={radioButtonsData}
            onPress={(item) => {
              console.log('item')
            }}
          /> 
        </View> */}

      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        {location && (
          <MapView
            style={{ width: "100%", height: 200 }}
            provider={
              Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location}>
              <Image
                source={require("../../../../../../assets/icons/logation_icon.png")}
                className={"w-[45px] h-[54]"}
              />
            </Marker>
          </MapView>
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterAdddress;
