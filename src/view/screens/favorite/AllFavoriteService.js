import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useEffect, useContext, useCallback, useState } from "react";
import * as OutLineIcon from "react-native-heroicons/outline";
import NoDataMessage from "../../components/NoDataMessage";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import * as SolidIcon from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import FavoriteCard from "../../components/FavoriteCard";
import { themeColors, themeStyles } from "../../styles";

const AllFavoriteService = () => {
  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();
  const { currentLocation, setCurrentLocation, mId, setMId } =
    useContext(StorageContext);

  const {
    favoriteServiceCount,
    setFavoriteServiceCount,
    favoriteServiceData,
    isFavoriteServiceLoading,
    setIsFavoriteServiceLoading,
    favoriteServiceError,
    handleGetFavoriteService,
  } = ProductApiModel.getFavoriteService();

  const {
    handleDeleteFavorite,
    setDeleteFavoriteLoading,
    deleteFavoriteLoading,
    deleteFavoriteError,
  } = ProductApiModel.deleteFavorite();

  const navigation = useNavigation();

  const [favServStart, setFavServStart] = useState(0);
  const [favServEnd, setFavServEnd] = useState(6);

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (currentLocation) {
      handleGetFavoriteService({
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        start: favServStart,
        limit: favServEnd,
        mid: mId,
      });
    }
  }, [currentLocation, mId, favServStart, favServEnd]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isFavoriteServiceLoading && favServStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : favoriteServiceData?.length > 0 ? (
        <FlatList
          data={favoriteServiceData}
          renderItem={({ item, index }) => (
            <FavoriteCard
              iconPress={() => {
                handleDeleteFavorite({
                  mid: mId,
                  pid: item?.pid,
                  setFavEnd: setFavServEnd,
                });
              }}
              onPress={() =>
                navigation.navigate("ProductDetail", { serviceId: item?.pid })
              }
              key={`${index}_favServ`}
              index={index}
              item={item}
              dataLength={favoriteServiceData?.length}
              totalOrder={null}
              totalServ={item?.total_serv}
            />
          )}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() =>
            handleLoadMore({
              leastAmount: 3,
              loadMoreAmount: 3,
              dataLength: favoriteServiceData?.length,
              dataCount: favoriteServiceCount,
              setDisplayEnd: setFavServEnd,
              setDisplayStart: setFavServStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີບໍລິການທີ່ຖຶກໃຈ"} />
        </View>
      )}
    </View>
  );
};

export default AllFavoriteService;
