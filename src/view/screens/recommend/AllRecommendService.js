import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import { themeColors } from "../../styles";

const AllRecommendService = () => {
  const {
    recommendCompanyServiceCount,
    recommendCompanyServiceData,
    isRecommendCompanyServiceLoading,
    setIsRecommendCompanyServiceLoading,
    recommendCompanyServiceError,
    handleGetRecommendCompanyService,
  } = ProductApiModel.getRecommendCompanyService();

  const { handleGetItemWidth, handleLoadMore, requestLocationPermission } =
    HomeViewModel();
  const starMarginTop = 150;
  const starMarginRight = 10;

  const { currentLocation, setCurrentLocation } = useContext(StorageContext);
  const navigation = useNavigation();

  const [reServStart, setReServStart] = useState(0);
  const [reServEnd, setReServEnd] = useState(8);

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
        console;
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetRecommendCompanyService({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: reServStart === 0 ? 0 : reServStart + 1,
        limit: reServEnd,
      });
    }
  }, [currentLocation, reServStart, reServEnd]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isRecommendCompanyServiceLoading && reServStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : recommendCompanyServiceData?.length > 0 ? (
        <FlatList
          data={recommendCompanyServiceData}
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
              price={item?.price}
              distance={item?.com?.distance}
              image={
                item?.product_imgs?.length > 0
                  ? item?.product_imgs?.[0]?.imageUrl
                  : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
              }
              starRating={item?.starpoint}
              totalOrder={item?.total_serv ? item?.total_serv : "0"}
              onPress={() => {
                navigation.navigate("ProductDetail", { serviceId: item?.pid });
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
              dataLength: recommendCompanyServiceData?.length,
              dataCount: recommendCompanyServiceCount,
              setDisplayEnd: setReServEnd,
              setDisplayStart: setReServStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີບໍລິການແນະນຳ"} />
        </View>
      )}
    </View>
  );
};

export default AllRecommendService;
