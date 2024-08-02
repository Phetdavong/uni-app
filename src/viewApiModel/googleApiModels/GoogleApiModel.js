import GoogleAddressInfoModel from '../../model/googleModels/GoogleAddressInfoModel'
import GoogleService from "../../service/googleServices/GoogleService";
import { useState } from "react";
 
export default {
  getGoogleDirection() {
    const [googleDirectionData, setGoogleDirectionData] = useState(null);
    const [isGoogleDirectionLoading, setIsGoogleDirectionLoading] =
      useState(true);
    const [googleDirectionError, setGoogleDirectionError] = useState(null);
 
    const handleGetGoogleDirection = async ({
      desLatitude,
      desLongitude,
      curLatitude,
      curLongitude,
      vehicle,
      lg,
    }) => {
      setIsGoogleDirectionLoading(true);
      try {
        const response = await GoogleService.googleDirectionService({
          desLatitude,
          desLongitude,
          curLatitude,
          curLongitude,
          vehicle,
          lg,
        });
 
        const directionData = response?.data?.routes[0];
        setGoogleDirectionData(directionData);
        console.log("Loaded Google Direction Successfully...");
      } catch (error) {
        setGoogleDirectionError(error);
        console.log("Loaded Google Direction Failed...", error);
      } finally {
        setIsGoogleDirectionLoading(false);
      }
    };
    return {
      googleDirectionData,
      isGoogleDirectionLoading,
      setIsGoogleDirectionLoading,
      googleDirectionError,
      handleGetGoogleDirection,
    };
  },
 
  getGoogleAddressInfo() {
    const [googleAddressInfoData, setGoogleAddressInfoData] = useState(null);
    const [isGoogleAddressInfoLoading, setIsGoogleAddressInfoLoading] =
      useState(true);
    const [googleAddressInfoError, setGoogleAddressInfoError] = useState(null);
 
    const handleGetGoogleAddressInfo = async ({ lat, log, lg }) => {
      setIsGoogleAddressInfoLoading(true);
      try {
        const response = await GoogleService.googleAddressInfoApiService({
          lat: lat,
          log: log,
          lg: lg,
        });
 
        if (response?.data?.status === "OK" && response?.data?.results.length > 0) {
          const addressComponents = response?.data?.results[0]?.address_components;
 
          const loadName = response?.data?.plus_code
            ? response?.data?.plus_code.compound_code
            : null;
          let village = null;
          let district = null;
          let province = null;
          let country = null;
 
          addressComponents.forEach((component) => {
            if (component?.types?.includes("locality")) {
              village = component?.long_name;
            }
            if (component?.types?.includes("administrative_area_level_2")) {
              district = component?.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              province = component?.long_name;
            }
            if (component.types.includes("country")) {
              country = component?.long_name;
            }
          });
 
          const directionData = new GoogleAddressInfoModel({
            loadName: loadName,
            village: village,
            provice: province,
            district: district,
            country: country,
          });
 
          setGoogleAddressInfoData(directionData);
        }else{
          console.log("No Google AddressInfo data ")
        }
        console.log("Loaded Google AddressInfo Successfully...");
      } catch (error) {
        setGoogleAddressInfoError(error);
        console.log("Loaded Google AddressInfo Failed...", error);
      } finally {
        setIsGoogleAddressInfoLoading(false);
      }
    };
    return {
      googleAddressInfoData,
      isGoogleAddressInfoLoading,
      setIsGoogleAddressInfoLoading,
      googleAddressInfoError,
      handleGetGoogleAddressInfo,
    };
  },
};