import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../../components/NavBar";
import ProflieSkeleton from "./ProflieSkeleton";
import ModalUpdateImage from "./modal/ModalUpdateImage";
import ModalUpdateBackground from "./modal/ModalUpdateBackground";
import QuestionModal from "./modal/QuestionModal";
import Payment from "./Payment";
import Delivery from "./Delivery";
import Infra from "./Infra";
import Address from "./Address";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../../styles";
import BorderTextInput from "../../../components/BorderTextInput";
import { CountryPicker } from "react-native-country-codes-picker";
import PhoneTextInput from "../../../components/PhoneTextInput";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCompany,
  setName,
  setEmail,
  setTel,
  setCompanyProfile,
} from "../../../../stores/sellerProfile/sellerProfile.store";

import sellerProfileService from "../../../../service/sellerProfile/sellerProfile.service";
import companyPaymentService from "../../../../service/companyPayment/companyPayment.service";
import companyInfraService from "../../../../service/companyInfra/companyInfra.service";
import companyDeliveryService from "../../../../service/companyDelivery/companyDelivery.service";

const Profile = ({ navigation }) => {
  const { t } = useTranslation();
  const [callingCode, setCallingCode] = useState("+856");
  const [countryFlag, setCountryFlag] = useState("🇱🇦");
  const [activeVisible, setActiveVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [openVisible, setOpenVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [payments, setPayments] = useState([]);

  const [paymentOpts, setPaymentOpts] = useState([]);

  const [infras, setInfras] = useState([]);
  const [infraOpts, setInfraOpts] = useState([]);

  const [deliveries, setDeliveries] = useState([]);
  const [deliveriesOpts, setDeliveriesOpts] = useState([]);

  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [isProductDetailLoading, setIsProductDetailLoading] = useState([]);

  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const comId = 5;

  const loadCompanyProfile = async () => {
    try {
      const resp = await sellerProfileService.getSellerProfile(comId);
      const data = resp.data;

      setPaymentOpts(data.company_payments);

      if (
        data.company_address.logitude !== "" &&
        data.company_address.lagitude !== ""
      ) {
        const longitude = parseFloat(data.company_address.logitude);
        const latitude = parseFloat(data.company_address.lagitude);

        setLocation({ longitude: longitude, latitude: latitude });
      }

      // load payment option

      const paymentResp = await companyPaymentService.getPayments();
      const paymentList = paymentResp.data;
    

      setPayments((prevValue) => {
        return paymentList;
      });

      // load infrastructures
      const infrasResp = await companyInfraService.getInfra();
      const infraList = infrasResp.data;
     
      setInfras((prevValue) => {
        return infraList;
      });
      
      setInfraOpts((preVal)=>(data.company_infras));

      // load delivery option

      const deliveriesResp = await companyDeliveryService.getDeliveries();
      const deliveriesList = deliveriesResp.data;
     
      setDeliveries((preVal) => {
        return deliveriesList;
      });

      setDeliveriesOpts((preVal)=>(data.company_deliveries));
      dispatch(setCompanyProfile(data));

    } catch (error) {
      console.log(`Error occurred while try to load company`, error);
    }
  };

  useEffect(() => {
    loadCompanyProfile();
    setTimeout(() => {
        setIsProductDetailLoading(false);
    }, 3000);
  }, []);

  const handleLeftClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : company.company_imgs?.length - 1
    );
  };

  const handleRightClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < company.company_imgs?.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isProductDetailLoading ? (
        <ProflieSkeleton />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View>
            <View>
              <View style={{ position: "absolute", zIndex: 1 }}>
                <NavBar
                  outSideLeftIcon={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <OutLineIcon.ArrowLeftIcon
                        size={17}
                        color={themeColors.bgColor}
                      />
                    </TouchableOpacity>
                  }
                  insideLeftIcon={
                    <Text
                      style={[
                        themeStyles.subTitleTextStyle,
                        { color: themeColors.bgColor },
                      ]}
                    >
                      {t("ຂໍ້ມູນໂປຣໄຟລ໌")}
                    </Text>
                  }
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                {company.company_imgs?.map((item, index) => {
                  return item.isprimary === "Y" ? (
                    item !== null ? (
                      <View style={{ width: "100%", height: 176 }} key={index}>
                        <Image
                          source={{
                            uri: company.company_imgs[currentImageIndex]?.image
                              ?.imagesUrl,
                          }}
                          style={{ width: "100%", height: 176 }}
                        />

                        <View
                          style={{
                            position: "absolute",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 16,
                            marginTop: 50,
                            width: "100%",
                          }}
                        >
                          <TouchableOpacity onPress={handleLeftClick}>
                            <OutLineIcon.ChevronLeftIcon
                              size={24}
                              color="#FFFFFF"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={handleRightClick}>
                            <OutLineIcon.ChevronRightIcon
                              size={24}
                              color="#FFFFFF"
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            right: 10,
                            bottom: 10,
                            borderColor: "#FF7466",
                            backgroundColor: "#ffffff",
                            borderWidth: 1,
                            borderRadius: 100,
                            padding: 2,
                          }}
                        >
                          <OutLineIcon.CameraIcon
                            size={24}
                            color={"#394052"}
                            onPress={() => {
                              setOpenVisible(true);
                            }}
                          />
                        </View>
                        <ModalUpdateBackground
                          animationType="fade"
                          transparent={true}
                          openVisible={openVisible}
                          setOpenVisible={setOpenVisible}
                          comId={comId}
                        />
                      </View>
                    ) : (
                      <ImageBackground
                        key={index}
                        source={require("../../../../../assets/icons/idCard_icon.png")}
                      />
                    )
                  ) : (
                    <ImageBackground
                      key={index}
                      source={require("../../../../../assets/icons/idCard_icon.png")}
                    />
                  );
                })}
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                top: 100,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {company.company_profile_img !== null ? (
                  company.company_profile_img.image !== null ? (
                    <Image
                      source={{
                        uri: company.company_profile_img?.image?.imagesUrl,
                      }}
                      style={{
                        width: 150,
                        height: 150,
                        borderColor: "#FFFFFF",
                        borderRadius: 100,
                        borderWidth: 4,
                      }}
                    />
                  ) : null
                ) : null}
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  borderColor: "#FF7466",
                  backgroundColor: "#ffffff",
                  borderWidth: 1,
                  borderRadius: 100,
                  padding: 2,
                }}
              >
                <OutLineIcon.CameraIcon
                  size={24}
                  color={"#394052"}
                  onPress={() => {
                    setVisible(true);
                  }}
                />
                <ModalUpdateImage
                  animationType="fade"
                  transparent={true}
                  isVisible={isVisible}
                  setVisible={setVisible}
                  comId={comId}
                />
              </View>
            </View>

            <View style={{ padding: 15, marginTop: 100 }}>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                {t("ຊື່ຮ້ານ")}
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.primaryColorS },
                  ]}
                  className={"ml-1"}
                >
                  *
                </Text>
              </Text>
              <View>
                <BorderTextInput
                  keyboardType={"default"}
                  placeholder={"ຊື່ຮ້ານ"}
                  value={company.name}
                  onChangeText={(val) => {
                    dispatch(setName(val));
                  }}
                />
              </View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                {t(" ອີເມວ")}
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.primaryColorS },
                  ]}
                >
                  *
                </Text>
              </Text>
              <View>
                <BorderTextInput
                  keyboardType={"email"}
                  placeholder={"ອິເມວ"}
                  value={company.email}
                  onChangeText={(val) => {
                    dispatch(setEmail(val));
                  }}
                />
              </View>
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
                className={"mb-2"}
              >
                {t("ເບີໂທຮ້ານ")}
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.primaryColorS },
                  ]}
                >
                  *
                </Text>
              </Text>
              <View>
                <CountryPicker
                  pickerButtonOnPress={(item) => {
                    setCallingCode(item.dial_code);
                    setCountryFlag(item.flag);
                    setIsCountryButtonSheet(false);
                  }}
                  popularCountries={["en", "ua", "pl"]}
                />
                <PhoneTextInput
                  onChangeText={(val) => {
                    dispatch(setTel(val));
                  }}
                  value={company.company_address.tel}
                  callingCode={callingCode}
                  setCallingCode={setCallingCode}
                  placeholder={"please Enter PhoneNumber"}
                  flagImage={countryFlag}
                />
              </View>

              <Payment
                payments={payments}
                setPayments={setPayments}
                paymentOpts={paymentOpts}
              />

              <Delivery
                deliveries={deliveries}
                setDeliveries={setDeliveries}
                deliveriesOpts={deliveriesOpts}
                setDeliveriesOpts={setDeliveriesOpts}
              />

              <Infra
                infras={infras}
                setInfras={setInfras}
                infraOpts={infraOpts}
              />

              <Address location={location} setLocation={setLocation} />

              <View style={styles.container}>
                <View style={styles.centered}>
                  <TouchableHighlight
                    style={styles.submit}
                    underlayColor="#FF7466"
                    onPress={() => {
                      setActiveVisible(true);
                    }}
                  >
                    <Text style={styles.submitText}>{t("ບັນທຶກ")}</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <QuestionModal
                animationType="fade"
                transparent={true}
                activeVisible={activeVisible}
                setActiveVisible={setActiveVisible}
                comId={comId}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    alignItems: "center",
  },
  submit: {
    marginTop: 15,
    width: 152,
    height: 58,
    backgroundColor: "#FF7466",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Profile;
