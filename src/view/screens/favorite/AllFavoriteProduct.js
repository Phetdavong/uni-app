import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useContext, useEffect, useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as OutLineIcon from "react-native-heroicons/outline";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import * as SolidIcon from "react-native-heroicons/solid";
import FavoriteCard from "../../components/FavoriteCard";
import { themeColors, themeStyles } from "../../styles";

const AllFavoriteProduct = () => {
  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();
  const { currentLocation, setCurrentLocation, mId, setMId } =
    useContext(StorageContext);

  const {
    favoriteProductCount,
    setFavoriteProductCount,
    favoriteProductData,
    isFavoriteProductLoading,
    setIsFavoriteProductLoading,
    favoriteProductError,
    handleGetFavoriteProduct,
  } = ProductApiModel.getFavoriteProduct();

  const {
    handleDeleteFavorite,
    setDeleteFavoriteLoading,
    deleteFavoriteLoading,
    deleteFavoriteError,
  } = ProductApiModel.deleteFavorite();

  const navigation = useNavigation();

  const [favProStart, setFavProStart] = useState(0);
  const [favProEnd, setFavProEnd] = useState(6);

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetFavoriteProduct({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: favProStart,
        limit: favProEnd,
        mid: mId,
      });
    }
  }, [currentLocation, mId, favProEnd, favProStart]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isFavoriteProductLoading && favProStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : favoriteProductData?.length > 0 ? (
        <FlatList
          data={favoriteProductData}
          renderItem={({ item, index }) => (
            <FavoriteCard
              iconPress={() => {
                handleDeleteFavorite({
                  mid: mId,
                  pid: item?.pid,
                  setFavEnd: setFavProEnd,
                });
              }}
              onPress={() => {
                navigation.navigate("ProductDetail", { productId: item?.pid });
              }}
              key={`${index}_favPro`}
              dataLength={favoriteProductData?.length}
              item={item}
              index={index}
              totalServ={null}
              totalOrder={item?.total_order}
            />
          )}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() =>
            handleLoadMore({
              leastAmount: 3,
              loadMoreAmount: 3,
              dataLength: favoriteProductData?.length,
              dataCount: favoriteProductCount,
              setDisplayEnd: setFavProEnd,
              setDisplayStart: setFavProStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີສິນຄ້າທີ່ຖຶກໃຈ"} />
        </View>
      )}
    </View>
  );
};

export default AllFavoriteProduct;
