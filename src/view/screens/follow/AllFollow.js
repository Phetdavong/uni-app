import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useCallback, useContext, useEffect, useState } from "react";
import NoDataMessage from "../../components/NoDataMessage";
import AllFollowCard from "../../components/AllFollowCard";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";

const AllFollow = () => {
  const { requestLocationPermission, handleGetItemWidth, handleLoadMore } =
    HomeViewModel();
  const { mId } = useContext(StorageContext);

  const navigation = useNavigation();

  const {
    isInsertVisitHistoryCompanyLoading,
    setIsInsertVisitHistoryCompanyLoading,
    insertVisitHistoryCompanyError,
    handleInsertVisitHistoryCompany,
  } = CompanyApiModel.insertVisitHistoryCompany();

  const {
    followingCount,
    setFollowingCompanyCount,
    followingData,
    isFollowingCompanyLoading,
    setIsFollowingCompanyLoading,
    followingError,
    handleGetFollowingCompany,
  } = CompanyApiModel.getFollowingCompany();

  const {
    isDeleteCompanyFollowingLoading,
    setIsDeleteCompanyFollowingLoading,
    deleteCompanyFollowingError,
    handleDeleteCompanyFollowing,
  } = CompanyApiModel.deleteCompanyFollowing();

  const [followStart, setFollowStart] = useState(0);
  const [followEnd, setFollowEnd] = useState(10);

  useFocusEffect(
    useCallback(() => {
      handleGetFollowingCompany({
        mid: mId,
        start: followStart,
        limit: followEnd,
      });
    }, [followEnd, followStart])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isFollowingCompanyLoading &&
      followStart === 0 &&
      followingData?.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : followingData?.length > 0 ? (
        <FlatList
          data={followingData}
          keyExtractor={(item, index) => `${index}_followed_id`}
          renderItem={({ item, index }) => (
            <View key={`${index}_followed_id`}>
              <AllFollowCard
                cardPress={() => {
                  handleInsertVisitHistoryCompany({
                    comid: item?.com?.comid,
                    mid: mId,
                  });
                }}
                item={item}
                index={index}
                dataLength={followingData?.length}
                buttonOnPress={() => {
                  handleDeleteCompanyFollowing({
                    mid: mId,
                    comid: item?.comid,
                    setFollowedEnd: setFollowEnd,
                  });
                }}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີສິນຄ້າທີ່ຖຶກໃຈ"} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllFollow;
