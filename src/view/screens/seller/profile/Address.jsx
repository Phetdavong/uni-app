import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  Modal,
} from "react";
import { Text, View, Image, ScrollView , PermissionsAndroid} from "react-native";
import Geolocation from "@react-native-community/geolocation";

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { themeColors, themeStyles } from "../../../styles";
import BorderTextInput from "../../../components/BorderTextInput";
import { RadioGroup } from "react-native-radio-buttons-group";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setAddress } from "../../../../stores/sellerProfile/sellerProfile.store";
import LocationTypeService from "../../../../service/companyLocationType/locationType.service";
import { setLocationType } from "../../../../stores/sellerProfile/sellerProfile.store";
import ModalMap from "./modal/ModalMap";
import { styled } from "nativewind";

const Address = ({ location, setLocation }) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [myAddress, setAddresss] = useState([]);
 
  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [mapActive, setMapActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (ll) => {
        console.log('******** current position ----------->', ll);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const toggleIsDrag = () => {
    setIsDrag(!isDrag);
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const toggleMapActive = () => {
    setMapActive(!mapActive);
  };

  const loadLocationType = async () => {
    try {
      const resp = await LocationTypeService.getLocationType();
      const data = resp.data;
      setSelectedType(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      company.company_address.logitude !== "" &&
      company.company_address.lagitude !== ""
    ) {
      const longitude = parseFloat(company.company_address.logitude);
      const latitude = parseFloat(company.company_address.lagitude);
      setLocation({longitude: longitude, latitude: latitude});
    }

    loadLocationType();

    const addressOpts = company.lt;
    let array = Array.from({ length: myAddress.length }).fill(false);
    myAddress.forEach((address, index) => {
      let foundIndex = addressOpts.findIndex(
        (option) => option.ltid == address.ltid
      );
      if (foundIndex !== -1) {
        array[index] = true;
      }
    });
    setSelectedId(array);
  }, []);

  const radioButtonsData = selectedType.map((item) => ({
    id: item.ltid,
    label: item.descrp,
    value: item.type,
    color: themeColors.subtitleTextColor,
    // borderColor: themeColors.disableColor,
    borderColor: 'transparent',
  }));

  const onSelectedLocation = (item) => {
    const [el] = selectedType.filter((it) => it.ltid === item);
    dispatch(setLocationType(el));
    setIsActive(true);
    if (el.type === "G") {
      setIsDrag(false);
      // access current location of device
      requestLocationPermission();
      getLocation();

    } else {
      // access location from database.

      setIsDrag(true);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>

      <ModalMap
        isActive={isActive}
        resetActive={toggleActive}
        isDrag={isDrag}
        setIsDrag={toggleIsDrag}
        location={location}
        setLocation={setLocation}
      />

      <View>
        <View className={"mt-5"}>
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
          >
            {t("ທີ່ຕັ້ງຮ້ານ")}
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.primaryColorS },
              ]}
            >
              *
            </Text>
          </Text>
          <View style={{ marginTop: 5 }}>
            <BorderTextInput
              onChangeText={(val) => {
                dispatch(setAddress(val));
              }}
              value={company.company_address.addr_la}
              placeholder={t("ທີ່ຢູ່ຈະຂຶ້ນຕາມມຸດ")}
            />
          </View>
        </View>

        <View
          style={[
            themeStyles.textStyle,
            { color: themeColors.subtitleTextColor },
            { marginBottom: 5, flexDirection: "row"},
          ]}
        >
          <RadioGroup
            layout="row"
            radioButtons={radioButtonsData}
            selectedId={company.lt?.ltid}
            onPress={(item) => {
              onSelectedLocation(item);
            }}
          />
        </View>

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
                  source={require("../../../../../assets/icons/logation_icon.png")}
                  className={"w-[45px] h-[54]"}
                />
              </Marker>
            </MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Address;
