import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import ProductCard from "../../components/ProductCard";

const AllPopularService = () => {
  const {
    popularCompanyServiceCount,
    setPopularCompanyServiceCount,
    popularCompanyServiceData,
    isPopularCompanyServiceLoading,
    setIsPopularCompanyServiceLoading,
    popularCompanyServiceError,
    handleGetPopularCompanyService,
  } = ProductApiModel.getPopularCompanyService();

  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();
  const { currentLocation, setCurrentLocation } = useContext(StorageContext);

  const navigation = useNavigation();

  const starMarginTop = 150;
  const starMarginRight = 10;

  const [poServStart, setPoServStart] = useState(0);
  const [poServEnd, setPoServEnd] = useState(8);

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetPopularCompanyService({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: poServStart === 0 ? 0 : poServStart + 1,
        limit: poServEnd,
      });
    }
  }, [currentLocation, poServStart, poServEnd]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isPopularCompanyServiceLoading && poServStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : popularCompanyServiceData?.length > 0 ? (
        <FlatList
          data={popularCompanyServiceData}
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
                item?.product_imgs?.[0]?.imageUrl
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
              dataLength: popularCompanyServiceData?.length,
              dataCount: popularCompanyServiceCount,
              setDisplayEnd: setPoServEnd,
              setDisplayStart: setPoServStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີບໍລິການທີ່ນິຍົມ"} />
        </View>
      )}
    </View>
  );
};

export default AllPopularService;
