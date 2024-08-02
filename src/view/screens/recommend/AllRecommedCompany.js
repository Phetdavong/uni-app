import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import ProductCard from "../../components/ProductCard";

const AllRecommedCompany = () => {
  const {
    recommendCompanyCount,
    recommendCompanyData,
    isRecommendCompanyLoading,
    setIsRecommendCompanyLoading,
    recommendCompanyError,
    handleGetRecommendCompany,
  } = CompanyApiModel.getRecommendCompany();

  const {
    isInsertVisitHistoryCompanyLoading,
    setIsInsertVisitHistoryCompanyLoading,
    insertVisitHistoryCompanyError,
    handleInsertVisitHistoryCompany,
  } = CompanyApiModel.insertVisitHistoryCompany();

  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();

  const {
    googleDirectionData,
    isGoogleDirectionLoading,
    setIsGoogleDirectionLoading,
    googleDirectionError,
    handleGetGoogleDirection,
  } = GoogleApiModel.getGoogleDirection();

  const { currentLocation, setCurrentLocation, mId } =
    useContext(StorageContext);

  const [destination, setDestination] = useState(null);

  const [reComStart, setReComStart] = useState(0);
  const [reComEnd, setReComEnd] = useState(8);

  const starMarginTop = 150;
  const starMarginRight = 10;

  const data = [];

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetRecommendCompany({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: reComStart === 0 ? 0 : reComStart + 1,
        limit: reComEnd,
      });
    }
  }, [currentLocation, reComEnd, reComStart]);

  useEffect(() => {
    setDestination({
      latitude: recommendCompanyData?.company_address?.lagitude,
      longitude: recommendCompanyData?.company_address?.logitude,
    });
  }, [recommendCompanyData]);

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
      {isRecommendCompanyLoading && reComStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : recommendCompanyData?.length > 0 ? (
        <FlatList
          data={recommendCompanyData}
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
                  mid: mId,
                  comid: item?.comid,
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
              dataLength: recommendCompanyData?.length,
              dataCount: recommendCompanyCount,
              setDisplayEnd: setReComEnd,
              setDisplayStart: setReComStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີຮ້ານຄ້າແນະນຳ"} />
        </View>
      )}
    </View>
  );
};

export default AllRecommedCompany;
