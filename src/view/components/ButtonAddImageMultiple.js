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
  backgroundPhoto,
  setBackgroundPhoto,
  backgroundCamera,
  setBackgroundCamera,
}) => {
  const imageSource = backgroundPhoto;

  // const maxImages = 5;
  // const remainingImages = maxImages - (galleryPhoto.length + cameraPhoto.length);
  // const canAddMoreImages = remainingImages > 0;

  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            style={{
              flexDirection: "row",
              borderRadius: 2,
              alignItems: "center",
              width: 100,
              height: 100,
              justifyContent: "center",
              borderColor: themeColors.primaryColorS,
              borderWidth: 2,
              borderStyle: "dashed",
            }}
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

          {imageSource?.map((item, index) => (
            <View>
              <TouchableOpacity
                onPress={() => onPressClose(index)}
                style={{
                  position: "absolute",
                  zIndex: 10,
                  top: -5,
                  right: -10,
                  backgroundColor: "#EEEFF0",
                }}
                className={"rounded-xl"}
              >
                <OutLineIcon.XCircleIcon
                  size={25}
                  color={themeColors.blackColor}
                />
              </TouchableOpacity>
              <Image
                key={index}
                style={{ width: 120, height: 120, padding: 5}}
                className={"rounded-xl"}
                source={item}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ButtonAddImage;
