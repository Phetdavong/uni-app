import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import React, { useState, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { themeColors, themeStyles } from "../../../../styles/index";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import sellerProfileService from "../../../../../service/sellerProfile/sellerProfile.service";
import { setCompanyProfileImage } from "../../../../../stores/sellerProfile/sellerProfile.store";

export default function modalUpdateImage({ isVisible, setVisible, comId }) {
  const { t } = useTranslation();

  const { company, status, error } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [com, setCom] = useState(null);

  const pickImage = useCallback(async () => {
    try {
      console.log("company on image picker", company);
      let result = await launchImageLibrary({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        includeBase64: true,
      });
      if (!result.didCancel) {
        console.log(`=========>`, company);
        const uris = result.assets.map((asset) => asset.uri);
        const formData = new FormData();
        const data = {
          comid: comId,
          company_profile_img: company.company_profile_img,
        };
        formData.append("files", {
          uri: uris[0],
          type: "image/png",
          name: result.assets[0].fileName,
        });
        formData.append("data", JSON.stringify(data));
        try {
          const resp = await sellerProfileService.updateProfileImg(formData);
          console.log("----------> successfully");
          setVisible(false);
          const data = resp.data;
          console.log("data ------>", data.data.imageurl);
          dispatch(setCompanyProfileImage(data.data.imageurl));
        } catch (error) {
          console.error(
            `Error occured while try to update company profile`,
            error
          );
        }
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera({
          mediaType: "photo",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          includeBase64: true,
        });
        if (!result.didCancel) {
          console.log(`=========>`, company);
          const uris = result.assets.map((asset) => asset.uri);
          const formData = new FormData();
          const data = {
            comid: comId,
            company_profile_img: company.company_profile_img,
          };
          formData.append("files", {
            uri: uris[0],
            type: "image/png",
            name: result.assets[0].fileName,
          });
          formData.append("data", JSON.stringify(data));
          try {
            const resp = await sellerProfileService.updateProfileImg(formData);
            setVisible(false);
            const data = resp.data;
            console.log("data ------>", data.data.imageurl);
            dispatch(setCompanyProfileImage(data.data.imageurl));
          } catch (error) {
            console.error(
              `Error occured while try to update company profile`,
              error
            );
          }
        }
      } catch (error) {
        console.log("Error taking photo:", error);
      }
    }
  }, []);

  const updateProfile = async ({ comId, image }) => {
    console.log("update profile");
    setModalVisible(true);
    if (comId && image) {
      const formData = new FormData();
      formData.append("files", {
        uri: image,
        type: "image/png",
        name: profile_image.png,
      });
      formData.append("width", 600);
      formData.append("height", 600);
      formData.append("comId", comId);
      await handleUploadProfileImage(formData);
    }
  };

  return (
    <View>
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
              <TouchableOpacity onPress={openCamera}>
                <Text
                  className="py-2 mt-2 text-[#394052] text-[16px] font-medium"
                >
                  {t("ຖ່າຍຮູບ")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={pickImage}>
                <Text
                  className="py-1 text-[#394052] text-[16px] font-medium"
                >
                  {t("ເລືອກຮຸບຈາກຄັງຮູບພາບ")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text
                  className="py-2 text-[#394052] text-[16px] font-medium"
                >
                  {t("ຍົກເລິກ")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    height: "28%",
    backgroundColor: "white",
  },
});
