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

const ButtonAddImage = ({
  bottomSheetRef,
  onPressClose,
  onPress,
  galleryPhoto,
  setGalleryPhoto,
  cameraPhoto,
  setCameraPhoto,
}) => {

  const imageSource = cameraPhoto || galleryPhoto;

  // const maxImages = 5;
  // const remainingImages = maxImages - (galleryPhoto.length + cameraPhoto.length);
  // const canAddMoreImages = remainingImages > 0;

  return (
    <View className='mt-5'>
      {imageSource !== null ? (
        <View className="w-[100px] h-[100px]">
          <View>
            <TouchableOpacity
              onPress={onPressClose}
              style={{
                position: "absolute",
                zIndex: 10,
                top: -5,
                right: -30,
                backgroundColor: "#EEEFF0",
              }}
              className={"rounded-xl"}
            >
              <OutLineIcon.XCircleIcon
                size={25}
                color={themeColors.blackColor}
              />
            </TouchableOpacity>
          </View>
          <Image
            className="w-[120px] h-[120px] p-5 rounded-xl mb-"
            source={{ uri: imageSource }}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          className={
            "mt-5 flex flex-row rounded-md  items-center w-[120px] h-[120] justify-center"
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
            ເພິ່ມຮູບ
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ButtonAddImage;
