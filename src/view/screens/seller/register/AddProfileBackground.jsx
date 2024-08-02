import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { themeColors, themeStyles } from "../../../styles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ButtonAddImageMultiple from "../../../components/ButtonAddImageMultiple";
import {
  setCompanyBackground,
  removeCompanyBackground,
} from "../../../../stores/registerCompany/registerCompany.store";

const AddProfileBackground = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isBackground, setIsBackground] = useState(false);
  const [isCounting, setCounting] = useState(0);
  const { images_company } = useSelector((state) => state.register);

  const removeBackground = useCallback(async (index) => {
    console.log("---->", index);
    dispatch(removeCompanyBackground(index));
  });
  const openGallery = async () => {
    try {
      const length = images_company.length;

      const result = await launchImageLibrary({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        includeBase64: true,
        selectionLimit: 5 - length,
      });
      if (result.didCancel) return;

      const uris = result?.assets?.map((asset) => {
        return {
          uri: asset.uri,
          type: "image/png",
          name: asset.fileName,
        };
      });
      const uri = uris;
      const [asset] = result.assets;
      dispatch(setCompanyBackground(uris));
      console.log("testing ", uris);
      setIsBackground(false);
      setCounting(1);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View className="py-5">
      <View className="justify-between flex-row items-center">
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.subtitleTextColor },
          ]}
        >
          {"ເພີ່ມຮູບໜ້າໂປຣໄຟລ໌ "}
        </Text>
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.textStyle },
          ]}
        >
          {images_company.length}/5
        </Text>
      </View>
      <View>
      <View className="mt-5 flex-row flex-wrap">
        <View className="mr-3">
          <ButtonAddImageMultiple
            onPress={() => {
              const length = images_company.length;

              if (length >= 5) return;
              setIsBackground(true);
            }}
          />
        </View>

        {console.log("IIIIIIIIIII ", images_company)}
        {images_company.map((item, index) => {
          console.log("item is", item);
          const uri = item.uri;
          return (
            <View key={index} className="mb-3 mr-3">
              <Image
                source={{ uri: uri }}
                className="w-[100px] h-[100px] rounded-lg"
              />
              <TouchableOpacity
                onPress={() => {
                  removeBackground(index);
                }}
                style={{
                  borderColor: "#CFCFCF",
                  backgroundColor: "#ffffff",
                  borderWidth: 1, 
                  borderRadius: 100,
                  marginTop: 5,
                  position: "absolute",
                  right: -5,
                  top: -13,
                }}
              >
                <OutLineIcon.XMarkIcon size={20} color={"#CFCFCF"} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View></View>

      <Modal animationType="none" transparent={true} visible={isBackground}>
        <View className="flex-1 bg-gray-500/60">
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
              <TouchableOpacity onPress={() => console.log("ຖ່າຍຮູບ")}>
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
              <TouchableOpacity onPress={() => setIsBackground(false)}>
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
export default AddProfileBackground;
