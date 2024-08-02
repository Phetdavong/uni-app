import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import React, { useContext, useCallback, useEffect, useState } from "react";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import ProductCard from "../../components/ProductCard";

const AllPopularProduct = () => {
  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();

  const { currentLocation, setCurrentLocation } = useContext(StorageContext);

  const {
    popularProductCount,
    setPopularProductCount,
    popularProductData,
    isPopularProductLoading,
    setIsPopularProductLoading,
    popularProductError,
    handleGetPopularProduct,
  } = ProductApiModel.getPopularProduct();

  const navigation = useNavigation();

  const starMarginTop = 150;
  const starMarginRight = 10;

  const [poProStart, setPoProStart] = useState(0);
  const [poProEnd, setPoProEnd] = useState(6);

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetPopularProduct({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: poProStart === 0 ? 0 : poProStart + 1,
        limit: poProEnd,
      });
    }
  }, [currentLocation, poProStart, poProEnd]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isPopularProductLoading && poProStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : popularProductData?.length > 0 ? (
        <FlatList
          data={popularProductData}
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
              totalOrder={item?.total_order ? item?.total_order : "0"}
              onPress={() => {
                navigation.navigate("ProductDetail", { productId: item?.pid });
              }}
            />
          )}
          vertical
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          onEndReached={() =>
            handleLoadMore({
              leastAmount: 6,
              loadMoreAmount: 6,
              dataLength: popularProductData?.length,
              dataCount: popularProductCount,
              setDisplayEnd: setPoProEnd,
              setDisplayStart: setPoProStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີສິນຄ້າທີ່ນິຍົມ"} />
        </View>
      )}
    </View>
  );
};

export default AllPopularProduct;
