import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { themeColors, themeStyles } from "../../../styles";
import ButtonAddImageMultiple from "../../../components/ButtonAddImageMultiple";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyProfileImg } from "../../../../stores/registerCompany/registerCompany.store";

const AddProfileImages = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState(true);

  const { company_profile_img, register, status, error } = useSelector(
    (state) => state.register
  );

  const openGallery = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        includeBase64: true,
      });

      if (result.didCancel) return;

      const uris = result.assets.map((asset) => asset.uri);
      const [uri] = uris;
      const [asset] = result.assets;

      const profileImage = {
        uri: uri,
        type: "image/png",
        name: asset.fileName,
      };
      dispatch(setCompanyProfileImg(profileImage));
      setIsVisible(false);
      setCount(1);
      setIsShow(false);
    } catch (error) {
      console.error(`Error occurred while try to open gallery`, error);
    }
  }, []);

  const openCamera = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

      const result = await launchCamera({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        includeBase64: true,
      });

      if (result.didCancel) return;

      const uris = result.assets.map((asset) => asset.uri);
      const [uri] = uris;
      const [asset] = result.assets;

      const profileImage = {
        uri: uri,
        type: "image/png",
        name: asset.fileName,
      };

      console.log("result ------> ", result);

      dispatch(setCompanyProfileImg(profileImage));

      setIsVisible(false);
      setCount(1);
      setIsShow(false);
    } catch (error) {
      console.error("Error occurred while try to open camera", error);
    }
  }, []);

  const removeImg = useCallback(async () => {
    dispatch(setCompanyProfileImg({ uri: "" }));
    setIsShow(true);
    setCount(0);
  }, []);

  return (
    <View className="py-5">
      <View className="justify-between flex-row items-center">
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.subtitleTextColor },
          ]}
        >
          {t("ເພີ່ມຮູບໜ້າໂປຣໄຟລ໌ ")}
        </Text>
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.textStyle },
          ]}
        >
          {" "}
          {count} /1
        </Text>
      </View>
      <View className="mt-3 flex-row">
        {isShow && (
          <ButtonAddImageMultiple
            onPress={() => {
              setIsVisible(true);
            }}
          />
        )}

        {company_profile_img?.image?.imagesUrl && (
          <View>
            <Image
              source={{ uri: company_profile_img?.image?.imagesUrl }}
              className="w-[100px] h-[100px] rounded-lg"
            />
            <TouchableOpacity
              onPress={() => {
                removeImg();
              }}
              style={{
                borderColor: "#CFCFCF",
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderRadius: 100,
                marginTop: 5,
                position: "absolute",
                right: -10,
                top: -13,
              }}
            >
              <OutLineIcon.XMarkIcon size={20} color={"#CFCFCF"} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View className="flex-1 bg-[#11111140]">
          <View
            style={styles.contentContainer}
            className="absolute bottom-0 w-full rounded-t-3xl px-5"
          >
            <Text
              style={[
                { color: themeColors.titleTextColor },
                { borderBottomWidth: 1 },
                { paddingBottom: 10 },
                { borderColor: "#CFCFCF" },
              ]}
              className="py-8 text-[#394052] text-[18px] font-semibold"
            >
              {t("ອັບໂຫຼດຮູບຈາກ")}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  openCamera();
                }}
              >
                <Text className="py-2 mt-2 text-[#394052] text-[16px] font-medium">
                  {t("ຖ່າຍຮູບ")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  openGallery();
                }}
              >
                <Text className="py-1 text-[#394052] text-[16px] font-medium">
                  {t("ເລືອກຮຸບຈາກຄັງຮູບພາບ")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text className="py-2 text-[#394052] text-[16px] font-medium">
                  {t("ຍົກເລິກ")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    height: "28%",
    backgroundColor: "white",
  },
});

export default AddProfileImages;
