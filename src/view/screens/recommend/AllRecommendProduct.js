import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import { themeColors } from "../../styles";

const AllRecommendProduct = () => {
  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();

  const {
    recommendProductCount,
    recommendProductData,
    isRecommendProductLoading,
    setIsRecommendProductLoading,
    recommendProductError,
    handleGetRecommendProduct,
  } = ProductApiModel.getRecommendProduct();

  const { currentLocation, setCurrentLocation } = useContext(StorageContext);
  const navigation = useNavigation();

  const [reProStart, setReProStart] = useState(0);
  const [reProEnd, setReProEnd] = useState(6);

  const starMarginTop = 150;
  const starMarginRight = 10;

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetRecommendProduct({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: reProStart === 0 ? 0 : reProStart + 1,
        limit: reProEnd,
      });
    }
  }, [currentLocation, reProStart, reProEnd]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isRecommendProductLoading && reProStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : recommendProductData?.length > 0 ? (
        <FlatList
          data={recommendProductData}
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
                item?.product_imgs?.length
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
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          onEndReached={() =>
            handleLoadMore({
              leastAmount: 6,
              loadMoreAmount: 6,
              dataLength: recommendProductData?.length,
              dataCount: recommendProductCount,
              setDisplayEnd: setReProEnd,
              setDisplayStart: setReProStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີສິນຄ້າແນະນຳ"} />
        </View>
      )}
    </View>
  );
};

export default AllRecommendProduct;
