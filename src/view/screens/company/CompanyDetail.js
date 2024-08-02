import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ProductDetailsViewModel from "../../../viewModel/productViewModels/ProductDetailsViewModel";
import CompanyDetailViewModel from "../../../viewModel/companyViewModels/CompanyDetailViewModel";
import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import AbsoluteImagePage from "../../components/AbsoluteImagePage";
import React, { useEffect, useCallback, useContext } from "react";
import * as OutLineIcon from "react-native-heroicons/outline";
import CompanyDetailSkeleton from "./CompanyDetailSkeleton";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import NavBar from "../../components/NavBar";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";

const CompanyDetail = ({ route }) => {
  const paramsComId = route.params.comid;
  const navigation = useNavigation();

  const { currentLocation, setCurrentLocation, mId } =
    useContext(StorageContext);

  const {
    currentDate,
    isMoreOperatingTime,
    setIsMoreTodayOpenTime,
    isMoreDetail,
    setIsMoreDetail,
    operatingTimeStatus,
    setOperatingTimeStatus,
    todayOpenTime,
    setTodayOpenTime,
    currentImageIndex,
    setCurrentImageIndex,
    todayClosedTime,
    setTodayClosedTime,
    imageWidth,
    imageHeight,
    isFollowed,
    setIsFollowed,
  } = CompanyDetailViewModel();

  const {
    errorImages,
    currentDayIndex,
    handleScrollEnd,
    isOpenOrClosed,
    getTodayClosedTime,
    getTodayOpenTime,
  } = ProductDetailsViewModel();

  const {
    companyDetailData,
    setCompanyDetailData,
    isCompanyDetailLoading,
    setIsCompanyDetailLoading,
    companyDetailError,
    setCompanyDetailError,
    handleGetCompanyDetail,
  } = CompanyApiModel.getCompanyDetail();

  const {
    isInsertCompanyFollowingLoading,
    setIsInsertCompanyFollowingLoading,
    insertCompanyFollowingError,
    handleInsertCompanyFollowing,
  } = CompanyApiModel.insertCompanyFollowing();

  const {
    isDeleteCompanyFollowingLoading,
    setIsDeleteCompanyFollowingLoading,
    deleteCompanyFollowingError,
    handleDeleteCompanyFollowing,
  } = CompanyApiModel.deleteCompanyFollowing();

  useEffect(() => {
    handleGetCompanyDetail({
      comid: paramsComId,
      mid: mId,
      lat: currentLocation?.latitude,
      lon: currentLocation?.logitude,
    });
  }, [paramsComId]);

  useEffect(() => {
    if (
      companyDetailData &&
      companyDetailData?.operatingTimes &&
      companyDetailData?.operatingTimes?.length > 0
    ) {
      const closedTime = isOpenOrClosed(companyDetailData?.operatingTimes);
      setOperatingTimeStatus(closedTime);
      console.log("Operating time data is...", closedTime);
    } else {
      console.log("No Operating time data... null");
    }
  }, [companyDetailData]);

  useEffect(() => {
    if (
      companyDetailData &&
      companyDetailData?.operatingTimes &&
      companyDetailData?.operatingTimes?.length > 0
    ) {
      const openTime = getTodayOpenTime(companyDetailData?.operatingTimes);
      setTodayOpenTime(openTime);
      console.log("Open time is...", openTime);
    } else {
      console.log("No Operating time data... null");
    }
  }, [companyDetailData]);

  useEffect(() => {
    if (
      companyDetailData &&
      companyDetailData?.operatingTimes &&
      companyDetailData?.operatingTimes?.length > 0
    ) {
      const getDayStatus = getTodayClosedTime(
        companyDetailData?.operatingTimes
      );
      setTodayClosedTime(getDayStatus);
      console.log("Closed time is...", getDayStatus);
    } else {
      console.log("No Operating time data... null");
    }
  }, [companyDetailData]);

  useEffect(() => {
    if (companyDetailData) {
      setIsFollowed(companyDetailData?.myFollwing === 1 ? true : false);
    }
  }, [companyDetailData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isCompanyDetailLoading ? (
        <CompanyDetailSkeleton />
      ) : (
        <ScrollView>
          <NavBar
            backgroundColor={"white"}
            outSideLeftIcon={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <OutLineIcon.ArrowLeftIcon
                  size={25}
                  color={themeColors.titleTextColor}
                />
              </TouchableOpacity>
            }
            insideLeftIcon={
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                company
              </Text>
            }
          />
          <View>
            <View
              style={{
                position: "absolute",
                zIndex: 100,
                right: 20,
                top: 20,
                alignSelf: "flex-end",
                backgroundColor: themeColors.partnerColor,
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 5,
              }}
            >
              <Text style={[themeStyles.titleTextStyle, { color: "white" }]}>
                Voucher
              </Text>
            </View>
            <AbsoluteImagePage
              currentImageIndex={currentImageIndex}
              totalImage={
                companyDetailData?.comImage?.length > 0
                  ? companyDetailData?.comImage?.length
                  : errorImages.length
              }
              bottom={20}
            />
            <ScrollView
              horizontal
              pagingEnabled
              onEndReachedThreshold={0.5}
              onMomentumScrollEnd={(event) =>
                handleScrollEnd(event, setCurrentImageIndex)
              }
            >
              {companyDetailData?.comImage?.map((image, index) => (
                <Image
                  key={index}
                  source={{
                    uri: image?.imageUrl,
                  }}
                  style={{ width: imageWidth, height: imageHeight }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "white",
              padding: 20,
              marginBottom: 2,
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View className="flex-row items-center space-x-4">
              <Image
                source={{ uri: companyDetailData?.comProfileImage }}
                style={{ height: 40, width: 40, borderRadius: 100 }}
              />
              <View className="space-y-1">
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {companyDetailData?.comName}
                </Text>
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    { color: themeColors.subtitleTextColor },
                  ]}
                >
                  {companyDetailData?.comAddress?.dt?.name_la}{" "}
                  {companyDetailData?.comAddress?.pv?.name_la}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                isFollowed
                  ? handleDeleteCompanyFollowing({
                      mid: mId,
                      comid: companyDetailData?.comid,
                      setIsFollowed: setIsFollowed,
                    })
                  : handleInsertCompanyFollowing({
                      mid: mId,
                      comid: companyDetailData?.comid,
                      setIsFollowed: setIsFollowed,
                    });
              }}
              style={{
                borderRadius: 100,
                height: 30,
                paddingHorizontal: 10,
                alignContent: "center",
                justifyContent: "center",
                alignSelf: 'center',
                backgroundColor: isFollowed
                  ? themeColors.followColor
                  : themeColors.primaryColor,
              }}
            >
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  {
                    color: "white",
                  },
                ]}
              >
                {" "}
                {isFollowed ? "ຕິດຕາມແລ້ວ" : "ຕິດຕາມ"}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            className="space-y-4"
            style={{ padding: 20, backgroundColor: "white" }}
          >
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../../../../assets/icons/StarRating.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                {companyDetailData?.starPoint?.toString().length < 3
                  ? companyDetailData?.starPoint?.toString()
                  : companyDetailData?.starPoint
                      ?.toString()
                      .substring(0, 3)}{" "}
                {companyDetailData?.starPoint === null ? "0" : null}{" "}
                {"ຄະແນນຮ້ານ"}
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center justify-between"
              onPress={() => {
                setIsMoreTodayOpenTime((prev) => !prev);
              }}
            >
              <View className="flex-row items-center space-x-2">
                <OutLineIcon.ClockIcon
                  size={25}
                  color={themeColors.subtitleTextColor}
                />
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {"ເວລາເປີດຮ້ານ"}
                </Text>
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    {
                      color:
                        operatingTimeStatus === "closed"
                          ? themeColors.primaryColor
                          : themeColors.greenColor,
                    },
                  ]}
                >
                  {operatingTimeStatus === "closed" ? "ປິດ" : "ເປີດ"}
                </Text>
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {todayOpenTime}
                  {" ~ "}
                  {todayClosedTime}
                </Text>
              </View>
              {isMoreOperatingTime ? (
                <OutLineIcon.ChevronUpIcon
                  size={25}
                  color={themeColors.subtitleTextColor}
                />
              ) : (
                <OutLineIcon.ChevronDownIcon
                  size={25}
                  color={themeColors.subtitleTextColor}
                />
              )}
            </TouchableOpacity>

            {isMoreOperatingTime ? (
              <View style={{ marginLeft: 35 }}>
                <FlatList
                  data={companyDetailData?.operatingTimes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View
                      key={index}
                      className="flex-row items-center space-x-2"
                      style={{
                        marginBottom:
                          index !== companyDetailData?.operatingTimes?.length
                            ? 10
                            : 0,
                      }}
                    >
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                            width: "15%",
                          },
                        ]}
                      >
                        {item?.did_day?.name_la ? item?.did_day?.name_la : "--"}
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        {item?.open ? item?.open : "?? : ??"}
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        ~
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        {item?.close ? item?.close : "?? : ??"}
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        |
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        {item?.break_start ? item?.break_start : "?? : ??"}
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        ~
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        {item?.break_end ? item?.break_end : "?? : ??"}
                      </Text>
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          {
                            color:
                              currentDayIndex === index + 1
                                ? themeColors.primaryColor
                                : themeColors.titleTextColor,
                          },
                        ]}
                      >
                        ຊ່ວງພັກ
                      </Text>
                    </View>
                  )}
                  vertical
                  scrollEnabled={false}
                  contentContainerStyle={{ maxWidth: "100%" }}
                />
              </View>
            ) : null}

            <View className="flex-row items-center space-x-2">
              <OutLineIcon.PhoneIcon
                size={25}
                color={themeColors.subtitleTextColor}
              />
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                {companyDetailData?.comAddress?.tel}
              </Text>
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-between"
              onPress={() => {
                setIsMoreDetail((prev) => !prev);
              }}
            >
              <View className="flex-row items-center space-x-2">
                <OutLineIcon.EllipsisHorizontalIcon
                  size={25}
                  color={themeColors.subtitleTextColor}
                />
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  ຂໍ້ມູນເພີ່ມເຕີມກ່ຽວກັບຮ້ານ
                </Text>
              </View>
              {isMoreDetail ? (
                <OutLineIcon.ChevronUpIcon
                  size={25}
                  color={themeColors.subtitleTextColor}
                />
              ) : (
                <OutLineIcon.ChevronDownIcon
                  size={25}
                  color={themeColors.subtitleTextColor}
                />
              )}
            </TouchableOpacity>

            {isMoreDetail ? (
              <View className="space-y-4" style={{ maxWidth: "100%" }}>
                <View className="flex-row items-center space-x-2">
                  <Text
                    style={[
                      themeStyles.titleTextStyle,
                      {
                        color: themeColors.titleTextColor,
                        marginLeft: 35,
                        maxWidth: "90%",
                      },
                    ]}
                  >
                    ຄວາມສະດວກ
                  </Text>

                  <FlatList
                    data={companyDetailData?.comInfra}
                    keyExtractor={(item, index) => `infra_${index}`}
                    renderItem={({ item, index }) => (
                      <Text
                        style={[
                          themeStyles.subTitleTextStyle,
                          { color: themeColors.titleTextColor },
                        ]}
                      >
                        {item?.if?.name_la}
                        {index !== companyDetailData?.comInfra?.length - 1
                          ? ", "
                          : null}
                      </Text>
                    )}
                    columnWrapperStyle={{
                      flexWrap: "wrap",
                    }}
                    scrollEventThrottle={1900}
                    numColumns={5}
                    scrollEnabled={false}
                  />
                </View>

                <View className="flex-row items-center space-x-2">
                  <Text
                    style={[
                      themeStyles.titleTextStyle,
                      { color: themeColors.titleTextColor, marginLeft: 35 },
                    ]}
                  >
                    ທີ່ຢູ່ຮ້ານ
                  </Text>
                  <Text
                    style={[
                      themeStyles.titleTextStyle,
                      { color: themeColors.titleTextColor, marginLeft: 35 },
                    ]}
                  >
                    {companyDetailData?.comAddress?.village}{" "}
                    {companyDetailData?.comAddress?.dt?.name_la}{" "}
                    {companyDetailData?.comAddress?.pv?.name_la}
                  </Text>
                </View>
                {companyDetailData?.comAddress?.lagitude &&
                companyDetailData?.comAddress?.logitude ? (
                  <MapView
                    style={{ width: "100%", height: 170 }}
                    provider={
                      Platform.OS === "android"
                        ? PROVIDER_GOOGLE
                        : PROVIDER_DEFAULT
                    }
                    initialRegion={{
                      latitude: parseFloat(
                        companyDetailData?.comAddress?.lagitude
                      ),
                      longitude: parseFloat(
                        companyDetailData?.comAddress?.logitude
                      ),
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CompanyDetail;
