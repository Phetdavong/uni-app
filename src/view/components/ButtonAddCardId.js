import { themeColors, themeStyles } from "../styles";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  Image,
  PermissionsAndroid,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as OutLineIcon from "react-native-heroicons/outline";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RegisterSellerViewModel from "../../viewModel/registerSellerViewModels/RegisterSellerViewModel";

const ButtonAddCardId = ({
  bottomSheetRef,
  onPress,
  galleryPhoto,
  setGalleryPhoto,
  cameraPhoto,
  setCameraPhoto,
}) => {
  const imageSource = cameraPhoto || galleryPhoto;
  return (
    <View className="mt-5 items-center">
      <View
        className="rounded-md p-5 px-8"
        style={[
          {
            borderColor: "#A0A0A0",
            borderWidth: 1,
            borderStyle: "dashed",
          },
        ]}
      >
        {imageSource !== null ? (
          <Image
            className=" p-5 rounded-xl "
            style={{ width: 150, height: 100 }}
            source={{ uri: imageSource }}
            // resizeMode="cover"
          />
        ) : (
          <Image
            className=" p-5 rounded-xl "
            style={{ width: 150, height: 100 }}
            source={require("../../../assets/icons/idCard_icon.png")}
            resizeMode="cover"
          />
        )}
      </View>
      <TouchableOpacity
        onPress={onPress}
        className={
          "mt-5 flex flex-row rounded-md  items-center w-[150px] h-[50px] justify-center"
        }
        style={[
          {
            borderColor: themeColors.primaryColorS,
            borderWidth: 1,
            borderStyle: "dashed",
          },
        ]}
        // disabled={!canAddMoreImages}
      >
        <OutLineIcon.PlusIcon size={20} color={themeColors.primaryColorS} />
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.primaryColorS },
          ]}
        >
          ອັບໂຫຼດຮູບພາບ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAddCardId;
