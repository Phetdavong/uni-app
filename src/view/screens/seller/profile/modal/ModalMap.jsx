import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Platform,
} from "react-native";
import { themeColors, themeStyles } from "../../../../styles/index";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import * as OutLineIcon from "react-native-heroicons/outline";
import Geolocation from "@react-native-community/geolocation";
import RadiusButton from "../../../../components/RadiusButton";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setChangeLocation } from "../../../../../stores/sellerProfile/sellerProfile.store"; 


export default function ModalMap({
   isActive, 
   resetActive, 
   isDrag, 
   setIsDrag,
   location,
   setLocation
  }) {

 
  const [markerPosition, setMarkerPosition] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });
  const { t } = useTranslation();
  
  const dispatch = useDispatch();

  const locationHandler = ()=>{
    dispatch(setChangeLocation({
      longitude:markerPosition.longitude,
      latitude:markerPosition.latitude
    }))
  }

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
            setMarkerPosition({
              latitude: latitude,
              longitude:longitude,
            });
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
        //setLocation(position);
        console.log('current position ----------->', ll);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  
  useEffect(() => {
    requestLocationPermission();
   // getLocation();

  }, []);

  const handleRegionChange = (newRegion) => {
    setMarkerPosition({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isActive}>
      <View className="flex-1 bg-[#11111140]">
        <View
          style={styles.contentContainer}
          className="absolute bottom-0 w-full rounded-t-3xl"
        >
          <View className="flex flex-row justify-between m-3 p-1">
            <Text></Text>
            <Text
              style={[
                themeStyles.headerTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              {t("ເລືອກທີ່ຕັ້ງ")}
            </Text>
            <TouchableOpacity onPress={resetActive}>
              <OutLineIcon.XMarkIcon
                size={30}
                color={themeColors.primaryColorS}
              />
            </TouchableOpacity>
          </View>

          {location && (
            <MapView
              style={{ width: "100%", height: 420 }}
              showsUserLocation
              provider={
                Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
              }
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChange={handleRegionChange}
            >
              <Marker
                coordinate={{
                  latitude: isDrag
                    ? markerPosition.latitude
                    : location.latitude,
                  longitude: isDrag
                    ? markerPosition.longitude
                    : location.longitude,
                }}
              >
                <Image
                  className={"w-[45px] h-[54]"}
                  source={require("../../../../../../assets/icons/logation_icon.png")}
                  style={styles.markerImage}
                />
              </Marker>
            </MapView>
          )}
          <View className="mx-5 mt-7" style={{ borderColor: "#000" }}>
            <RadiusButton
              text={"ຢືນຢັນສະຖານທີ່"}
              onPress={() => {
               
                locationHandler();
                resetActive();
              }}
              textColor={themeColors.bgColor}
              textStyle={themeColors.subTitleTextStyle}
              backgroundColor={themeColors.primaryColorS}
            />
        </View>
        </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    height: "65%",
    backgroundColor: "white",
  },
  map: {
    flex: 1,
    height: 400,
  },
  markerImage: {
    width: 60,
    height: 70,
  },
});
