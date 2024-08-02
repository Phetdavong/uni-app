import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ProductDetailsViewModel from "../../../viewModel/productViewModels/ProductDetailsViewModel";
import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import AbsoluteImagePage from "../../components/AbsoluteImagePage";
import React, { useCallback, useContext, useEffect } from "react";
import * as OutLineIcon from "react-native-heroicons/outline";
import StorageContext from "../../contexts/StorageContext";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import * as SolidIcon from "react-native-heroicons/solid";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import Skeleton from "react-native-reanimated-skeleton";
import NavBar from "../../components/NavBar";
import geolib from "geolib";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";

const ProductDetail = ({ route }) => {
  const paramsProductId = route.params.productId;
  const paramsServiceId = route.params.serviceId;

  const navigation = useNavigation();

  const { currentLocation, setCurrentLocation, mId } =
    useContext(StorageContext);

  const { requestLocationPermission } = HomeViewModel();

  const {
    totalFavorite,
    setTotalFavorite,
    isFavorite,
    setIsFavorite,
    directionTime,
    setDirectionTime,
    destination,
    setDestination,
    todayClosedTime,
    setTodayClosedTime,
    getTodayClosedTime,
    imageWidth,
    imageHeight,
    errorImages,
    handleScrollEnd,
    currentImageIndex,
    isOpenOrClosed,
    setCurrentImageIndex,
    operatingTimeStatus,
    setOperatingTimeStatus,
    calculateTimeAgo,
    writeTime,
    setWriteTime,
  } = ProductDetailsViewModel();

  const {
    googleDirectionData,
    isGoogleDirectionLoading,
    setIsGoogleDirectionLoading,
    googleDirectionError,
    handleGetGoogleDirection,
  } = GoogleApiModel.getGoogleDirection();

  const {
    productDetailData,
    isProductDetailLoading,
    setIsProductDetailLoading,
    ProductDetailError,
    handleGetProductDetail,
  } = ProductApiModel.getProductDetail();

  const {
    handleInsertFavorite,
    setInsertFavoriteLoading,
    insertFavoriteLoading,
    insertFavoriteError,
  } = ProductApiModel.insertFavorite();

  const {
    handleDeleteFavorite,
    setDeleteFavoriteLoading,
    deleteFavoriteLoading,
    deleteFavoriteError,
  } = ProductApiModel.deleteFavorite();

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (currentLocation) {
        handleGetProductDetail({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          pid: paramsProductId,
          sid: paramsServiceId,
          mid: mId,
        });
      }
    }, [currentLocation, paramsServiceId, paramsProductId])
  );

  useEffect(() => {
    if (
      productDetailData &&
      productDetailData?.operatingTimes &&
      productDetailData?.operatingTimes?.length > 0
    ) {
      const closedTime = isOpenOrClosed(productDetailData?.operatingTimes);
      setOperatingTimeStatus(closedTime);
      console.log("Operating time data is...", closedTime);
    } else {
      console.log("No Operating time data... null");
    }
  }, [productDetailData]);

  useEffect(() => {
    if (
      productDetailData &&
      productDetailData?.products &&
      productDetailData?.products?.length > 0
    ) {
      const getTimeAgo = calculateTimeAgo(
        productDetailData?.products[0]?.writedate
      );
      setWriteTime(getTimeAgo);
      console.log("Release time is...", getTimeAgo);
    } else {
      console.log("No product data... null");
    }
  }, [productDetailData]);

  useEffect(() => {
    if (
      productDetailData &&
      productDetailData?.operatingTimes &&
      productDetailData?.operatingTimes?.length > 0
    ) {
      const getDayStatus = getTodayClosedTime(
        productDetailData?.operatingTimes
      );
      setTodayClosedTime(getDayStatus);
      console.log("Closed time is...", getDayStatus);
    } else {
      console.log("No Operating time data... null");
    }
  }, [productDetailData]);

  useEffect(() => {
    setDestination({
      latitude: productDetailData?.comAddress?.lagitude,
      longitude: productDetailData?.comAddress?.logitude,
    });
  }, [productDetailData]);

  useEffect(() => {
    if (currentLocation && destination) {
      //handleGetGoogleDirection({ desLatitude: destination.latitude, desLongitude: destination.longitude, curLatitude: currentLocation?.lagitude, curLongitude: currentLocation?.longitude, vehicle: 'driving', lg: 'lo' })
      handleGetGoogleDirection({
        desLatitude: 17.9731832,
        desLongitude: 102.627893,
        curLatitude: 17.9731832,
        curLongitude: 102.627893,
        vehicle: "driving",
        lg: "lo",
      });
    }
  }, [currentLocation, destination]);

  useEffect(() => {
    if (googleDirectionData && googleDirectionData?.routes?.length > 0) {
      setDirectionTime(googleDirectionData?.legs[0]?.duration?.text);
    }
  }, [googleDirectionData]); 

  useEffect(() => {
    if (productDetailData) {
      setIsFavorite(productDetailData?.myFavorite === 1 ? true : false);
      setTotalFavorite(parseInt(productDetailData?.totalFav));
    }
  }, [productDetailData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isProductDetailLoading ? (
        <ProductDetailSkeleton />
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
                Product
              </Text>
            }
          />
          <View>
            <Image
              source={require("../../../../assets/icons/OfficialPartner.png")}
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                zIndex: 100,
                right: 20,
                top: 20,
                alignSelf: "flex-end",
              }}
            />

            <AbsoluteImagePage
              currentImageIndex={currentImageIndex}
              totalImage={
                productDetailData?.productImages?.length > 0
                  ? productDetailData?.productImages?.length
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
              {productDetailData?.productImages?.length > 0
                ? productDetailData?.productImages?.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate("ProductImageList", {
                          imageData: productDetailData?.productImages,
                          currentImageIndex: index,
                        });
                      }}
                    >
                      <Image
                        source={{
                          uri: image?.imageUrl,
                        }}
                        style={{ width: imageWidth, height: imageHeight }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))
                : errorImages?.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={{ width: imageWidth, height: imageHeight }}
                      resizeMode="cover"
                    />
                  ))}
            </ScrollView>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: "100%",
              marginBottom: 2,
            }}
            className="flex-row items-center space-x-4"
          >
            <Image
              source={{ uri: productDetailData?.comImage }}
              style={{ height: 40, width: 40, borderRadius: 100 }}
            />
            <View className="flex-1 flex-row items-center justify-between">
              <View>
                <Text
                  style={[
                    themeStyles.titleTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {productDetailData?.comName}
                </Text>
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    { color: themeColors.subtitleTextColor },
                  ]}
                >
                  {productDetailData?.comAddress?.dt?.name_la}{" "}
                  {productDetailData?.comAddress?.pv?.name_la}
                </Text>
              </View>
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
                  {productDetailData?.starPoint?.toString().length < 3
                    ? productDetailData?.starPoint?.toString()
                    : productDetailData?.starPoint
                        ?.toString()
                        .substring(0, 3)}{" "}
                  {`(${productDetailData?.totalReviews})`}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <View className="flex-row items-centers space-x-2">
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
                - ປີດ {todayClosedTime} ນ.
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: "white",
              paddingBottom: 10,
            }}
            className="space-y-2"
          >
            <Text
              style={[
                themeStyles.highLightTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              {productDetailData?.productName}
            </Text>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.subtitleTextColor },
              ]}
            >
              ໂມງ - {writeTime}ທີ່ແລ້ວ
            </Text>
            <View className="flex-row items-center justify-between">
              <Text
                style={[
                  themeStyles.priceTextStyle,
                  { color: themeColors.primaryColor },
                ]}
              >
                {parseFloat(productDetailData?.productPrice).toLocaleString()} K
              </Text>
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity
                  onPress={() => {
                    isFavorite
                      ? handleDeleteFavorite({
                          pid: productDetailData?.productId,
                          mid: mId,
                          setIsFavorited: setIsFavorite,
                          setTotalFavorite: setTotalFavorite,
                        })
                      : handleInsertFavorite({
                          pid: productDetailData?.productId,
                          mid: mId,
                          setIsFavorited: setIsFavorite,
                          setTotalFavorite: setTotalFavorite,
                        });
                  }}
                >
                  {isFavorite ? (
                    <SolidIcon.HeartIcon
                      size={25}
                      color={themeColors.primaryColor}
                    />
                  ) : (
                    <OutLineIcon.HeartIcon
                      size={25}
                      color={themeColors.subtitleTextColor}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    themeStyles.highLightTextStyle,
                    { color: themeColors.titleTextColor },
                  ]}
                >
                  {totalFavorite}
                </Text>
              </View>
            </View>
            {productDetailData?.productDes ? (
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  { color: themeColors.titleTextColor },
                ]}
              >
                {productDetailData?.productDes}
              </Text>
            ) : null}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: themeColors.subtitleTextColor,
                    paddingRight: 5,
                  }}
                >
                  <Text
                    style={[
                      themeStyles.subTitleTextStyle,
                      { color: themeColors.subtitleTextColor },
                    ]}
                  >
                    {productDetailData?.totalVisit} ຜູ້ເຂົ້າຊົມ
                  </Text>
                </View>
                <View style={{ paddingLeft: 5 }}>
                  <Text
                    style={[
                      themeStyles.subTitleTextStyle,
                      { color: themeColors.subtitleTextColor },
                    ]}
                  >
                    {productDetailData?.totalOrder} ຂາຍແລ້ວ
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <OutLineIcon.ShareIcon
                  size={22}
                  color={themeColors.subtitleTextColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text
              style={[
                themeStyles.highLightTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              {" "}
              {googleDirectionData?.legs[0]?.duration?.text
                ? googleDirectionData?.legs[0]?.duration?.text
                : "?"}{" "}
              {(productDetailData?.distance?.toString().length < 4
                ? productDetailData?.distance?.toString()
                : productDetailData?.distance?.toString().substring(0, 4)) +
                " km"}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
            {productDetailData?.comAddress?.lagitude &&
            productDetailData?.comAddress?.logitude ? (
              <MapView
                style={{ width: "100%", height: 170 }}
                provider={
                  Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
                }
                initialRegion={{
                  latitude: parseFloat(productDetailData?.comAddress?.lagitude),
                  longitude: parseFloat(
                    productDetailData?.comAddress?.logitude
                  ),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              />
            ) : null}
          </View>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text
              style={[
                themeStyles.highLightTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              ສິນຄ້າທີ່ກ່ຽວຂ້ອງ
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
