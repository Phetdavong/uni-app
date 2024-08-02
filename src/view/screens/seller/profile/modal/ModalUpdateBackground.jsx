import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {  themeColors } from "../../../../styles";
import * as OutLineIcon from "react-native-heroicons/outline";
import { launchImageLibrary } from "react-native-image-picker";
import ButtonAddImageMultiple from "../../../../components/ButtonAddImageMultiple";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateBackground, removeImage, removeCompanyImage } from "../../../../../stores/sellerProfile/sellerProfile.store";

const ModalUpdateBackground = ({ openVisible, setOpenVisible, comId }) => {
  const { t } = useTranslation();
  const [backgroundPhoto, setBackgroundPhoto] = useState([]);
  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const removeImg = (item) => {
    try{
      console.log(`item +++++++>>>`, item);
      const params = {
        comid:comId,
        ciid:item.ciid,
        
      };
      dispatch(removeCompanyImage(item));
      dispatch(removeImage(params));
    }
    catch(error){
      console.log(error);
    }
  }

  const openGallery = async () => {
    try {
      if (company.company_imgs.length >= 5) return;
      let result = await launchImageLibrary({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        includeBase64: true,
        selectionLimit: 5 ,
      });
      if (!result.didCancel) {
        const uris = result.assets.map((asset) => asset.uri);
        const formData = new FormData();
        const data = {
          comid: comId,
          company_profile_img: company.company_imgs,
        };
        formData.append("files", {
          uri: uris[0],
          type: "image/png",
          name: result.assets[0].fileName,
        });
        formData.append("comid", comId);
        try {
          dispatch(updateBackground(formData));
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
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openVisible}
      onRequestClose={() => setOpenVisible(false)}
    >
      <View className="flex-1 bg-[#11111140]">
        <View
          style={styles.contentContainer}
          className="absolute bottom-0 w-full rounded-t-3xl"
        >
          <View className="px-5">
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              className="pt-5 px-2"
            >
              <Text
                style={{
                  color: "#394052",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {t("ເພີ່ມຮູບພື້ນຫຼັງ ")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenVisible(false);
                }}
              >
                <OutLineIcon.XMarkIcon
                  size={30}
                  color={themeColors.primaryColorS}
                />
              </TouchableOpacity>
            </View>
            <View
              className="px-3 py-2"
              style={{ justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: "#394052",
                  fontSize: 16,
                  fontWeight: 500,
                  alignSelf: "flex-end",
                }}
              >
                {company.company_imgs.length} /5
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <View style={{ marginRight: 7, marginLeft: 7 }}>
                <ButtonAddImageMultiple
                  onPress={() => {
                    console.log("Open Gallery");
                    openGallery();
                  }}
                backgroundPhoto={backgroundPhoto}
                />
              </View>

              {company.company_imgs.map((item, index) => {
                const el = item.image;
               
                return (
                  <View key={index} style={{ alignItems: "center", margin: 7 }}>
                    <Image
                      source={{ uri: el?.imagesUrl }}
                      className="w-[100px] h-[100px] rounded "
                    />
                    <TouchableOpacity
                      onPress={()=>{removeImg(item)}}
                      style={{
                        borderColor: "#CFCFCF",
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderRadius: 100,
                        marginTop: 5,
                        position: "absolute",
                        right:-10,
                        top:-13
                      }}
                    >
                      <OutLineIcon.XMarkIcon size={20} color={"#CFCFCF"} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    height: "50%",
    backgroundColor: "white",
  },
});

export default ModalUpdateBackground;
