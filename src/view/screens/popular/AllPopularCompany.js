import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";
import React, { useCallback, useContext, useEffect, useState } from "react";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import ProductCard from "../../components/ProductCard";

const AllPopularCompany = () => {
  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();

  const {
    popularCompanyCount,
    setPopularCompanyCount,
    popularCompanyData,
    isPopularCompanyLoading,
    setIsPopularCompanyLoading,
    popularCompanyError,
    handleGetPopularCompany,
  } = CompanyApiModel.getPopularCompany();

  const {
    googleDirectionData,
    isGoogleDirectionLoading,
    setIsGoogleDirectionLoading,
    googleDirectionError,
    handleGetGoogleDirection,
  } = GoogleApiModel.getGoogleDirection();

  const {
    isInsertVisitHistoryCompanyLoading,
    setIsInsertVisitHistoryCompanyLoading,
    insertVisitHistoryCompanyError,
    handleInsertVisitHistoryCompany,
  } = CompanyApiModel.insertVisitHistoryCompany();

  const { currentLocation, setCurrentLocation, mId } =
    useContext(StorageContext);
  const navigation = useNavigation();

  const [destination, setDestination] = useState(null);

  const [poComStart, setPoComStart] = useState(0);
  const [poComEnd, setPoComEnd] = useState(8);

  const starMarginTop = 150;
  const starMarginRight = 10;

  useFocusEffect(
    useCallback(() => {
      if (currentLocation) {
        handleGetPopularCompany({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: poComStart === 0 ? 0 : poComStart + 1,
          limit: poComEnd,
        });
      }
    }, [currentLocation, poComEnd, poComStart])
  );

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    setDestination({
      latitude: popularCompanyData?.company_address?.lagitude,
      longitude: popularCompanyData?.company_address?.logitude,
    });
  }, [popularCompanyData]);

  useEffect(() => {
    if (currentLocation && destination) {
      // handleGetGoogleDirection({ desLatitude: destination.latitude, desLongitude: destination.longitude, curLatitude: currentLocation?.lagitude, curLongitude: currentLocation?.longitude, vehicle: 'driving', lg: 'lo' })
      handleGetGoogleDirection({
        desLatitude: "17.9731832",
        desLongitude: "102.627893",
        curLatitude: "17.9731832",
        curLongitude: "102.627893",
        vehicle: "driving",
        lg: "lo",
      });
    }
  }, [currentLocation, destination]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isPopularCompanyLoading && poComStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : popularCompanyData?.length > 0 ? (
        <FlatList
          data={popularCompanyData}
          renderItem={({ item, index }) => (
            <ProductCard
              marginLeft={20}
              marginRight={0}
              starMarginTop={starMarginTop}
              starmarginRight={starMarginRight}
              width={handleGetItemWidth({
                itemLength: 2,
                totalMargin: 3,
                marginHorizontal: 20,
              })}
              height={handleGetItemWidth({
                itemLength: 2,
                totalMargin: 3,
                marginHorizontal: 20,
              })}
              title={item?.name}
              highLightText={item?.products[0]?.name}
              distance={item?.distance}
              image={
                item?.company_profile_img?.imageUrl
                  ? item?.company_profile_img?.imageUrl
                  : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
              }
              starRating={item?.starpoint}
              vacationTime={
                googleDirectionData?.legs[0]?.duration?.text
                  ? googleDirectionData?.legs[0]?.duration?.text
                  : "?"
              }
              onPress={() => {
                handleInsertVisitHistoryCompany({
                  comid: item?.comid,
                  mid: mId,
                });
              }}
            />
          )}
          vertical
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          onEndReached={() =>
            handleLoadMore({
              leastAmount: 8,
              loadMoreAmount: 8,
              dataLength: popularCompanyData?.length,
              dataCount: popularCompanyCount,
              setDisplayEnd: setPoComEnd,
              setDisplayStart: setPoComStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີຮ້ານຄ້າທີ່ນິຍົມ"} />
        </View>
      )}
    </View>
  );
};

export default AllPopularCompany;
