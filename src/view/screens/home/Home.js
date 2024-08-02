import CategoryApiModel from "../../../viewApiModel/categoryApiModels/CategoryApiModel";
import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import ProductApiModel from "../../../viewApiModel/productApiModels/ProductApiModel";
import BannerApiModel from "../../../viewApiModel/bannerApiModels/BannerApiModel";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";
import EventApiModel from "../../../viewApiModel/eventApiModels/EventApiModel";
import {
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useEffect, useContext, useCallback } from "react";
import * as OutLineIcon from "react-native-heroicons/outline";
import StorageContext from "../../contexts/StorageContext";
import { useFocusEffect } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import NavBar from "../../components/NavBar";
import BannerSlider from "./BannerSlider";
import CategoryList from "./CategoryList";
import VisitHistory from "./VisitHistory";
import Recommend from "./Recommend";
import EventList from "./EventList";
import Favorite from "./Favorite";
import Popular from "./Popular";

const Home = ({ navigation }) => {
  // const navigation = useNavigation();
  const { currentLocation, setCurrentLocation, mId, setMId } =
    useContext(StorageContext);
  const {
    visitHisStart,
    setVisitHisStart,
    visitHisEnd,
    setVisitHisEnd,
    formattedCurrentDate,
    requestLocationPermission,
    eventListStart,
    setEventListStart,
    eventListEnd,
    setEventListEnd,
    isAdvBobUp,
    setIsAdvBobup,
    proCateListStart,
    setProCateListStart,
    proCateListEnd,
    setProCateListEnd,
    servCateListStart,
    setServCateListStart,
    servCateListEnd,
    setServCateListEnd,
    destination,
    setDestination,
    directionTime,
    setDirectionTime,
  } = HomeViewModel();

  const {
    bannerListData,
    isBannerListLoading,
    setIsBannerListLoading,
    bannerListError,
    handleGetBannerList,
  } = BannerApiModel.getBannerList();

  const {
    serviceCategoryListCount,
    setServiceCategoryListCount,
    serviceCategoryListData,
    isServiceCategoryListLoading,
    setIsServiceCategoryListLoading,
    serviceCategoryListError,
    handleGetServiceCategoryList,
  } = CategoryApiModel.getServiceCategoryList();

  const {
    productCategoryListCount,
    setProductCategoryListCount,
    productCategoryListData,
    isProductCategoryListLoading,
    setIsProductCategoryListLoading,
    productCategoryListError,
    handleGetProductCategoryList,
  } = CategoryApiModel.getProductCategoryList();

  const {
    currentEventListCount,
    setCurrentEventListCount,
    currentEventListData,
    isCurrentEventListLoading,
    setIsCurrentEventListLoading,
    currentEventListError,
    handleGeCurrentEventList,
  } = EventApiModel.getCurrentEventList();

  const {
    recommendCompanyData,
    isRecommendCompanyLoading,
    setIsRecommendCompanyLoading,
    recommendCompanyError,
    handleGetRecommendCompany,
  } = CompanyApiModel.getRecommendCompany();

  const {
    popularCompanyCount,
    setPopularCompanyCount,
    popularCompanyData,
    isPopularCompanyLoading,
    setIsPopularCompanyLoading,
    popularCompanyError,
    handleGetPopularCompany,
  } = CompanyApiModel.getPopularCompany();

  const {
    recommendCompanyServiceData,
    isRecommendCompanyServiceLoading,
    setIsRecommendCompanyServiceLoading,
    recommendCompanyServiceError,
    handleGetRecommendCompanyService,
  } = ProductApiModel.getRecommendCompanyService();

  const {
    recommendProductData,
    isRecommendProductLoading,
    setIsRecommendProductLoading,
    recommendProductError,
    handleGetRecommendProduct,
  } = ProductApiModel.getRecommendProduct();

  const {
    popularProductCount,
    setPopularProductCount,
    popularProductData,
    isPopularProductLoading,
    setIsPopularProductLoading,
    popularProductError,
    handleGetPopularProduct,
  } = ProductApiModel.getPopularProduct();

  const {
    popularCompanyServiceCount,
    setPopularCompanyServiceCount,
    popularCompanyServiceData,
    isPopularCompanyServiceLoading,
    setIsPopularCompanyServiceLoading,
    popularCompanyServiceError,
    handleGetPopularCompanyService,
  } = ProductApiModel.getPopularCompanyService();

  const {
    googleDirectionData,
    isGoogleDirectionLoading,
    setIsGoogleDirectionLoading,
    googleDirectionError,
    handleGetGoogleDirection,
  } = GoogleApiModel.getGoogleDirection();

  const {
    favoriteAllCount,
    setFavoriteAllCount,
    favoriteAllData,
    isFavoriteAllLoading,
    setIsFavoriteAllLoading,
    favoriteAllError,
    handleGetFavoriteAll,
  } = ProductApiModel.getFavoriteAll();

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
    favoriteServiceCount,
    setFavoriteServiceCount,
    favoriteServiceData,
    isFavoriteServiceLoading,
    setIsFavoriteServiceLoading,
    favoriteServiceError,
    handleGetFavoriteService,
  } = ProductApiModel.getFavoriteService();

  const {
    visitHistoryCount,
    setVisitHistoryCompanyCount,
    visitHistoryData,
    isVisitHistoryCompanyLoading,
    setIsVisitHistoryCompanyLoading,
    visitHistoryError,
    handleGetVisitHistoryCompany,
  } = CompanyApiModel.getVisitHistoryCompany();

  useEffect(() => {
    if (currentLocation === null) {
      requestLocationPermission(setCurrentLocation);
    }
  }, []),
    useEffect(() => {
      if (currentLocation) {
        handleGetBannerList({ start: 0, limit: 5 });
      }
    }, [currentLocation]),
    useEffect(() => {
      handleGetProductCategoryList({
        start: proCateListStart === 0 ? 0 : proCateListStart + 1,
        limit: proCateListEnd,
      });
    }, [proCateListStart, proCateListEnd]),
    useEffect(() => {
      handleGetServiceCategoryList({
        start: servCateListStart === 0 ? 0 : servCateListStart + 1,
        limit: servCateListEnd,
      });
    }, [servCateListStart, servCateListEnd]),
    useEffect(() => {
      setMId(5);
    }, []);

  useEffect(() => {
    if (formattedCurrentDate) {
      console.log({
        start: eventListStart,
        limit: eventListEnd,
        currentDate: formattedCurrentDate,
      });
      handleGeCurrentEventList({
        start: eventListStart === 0 ? 0 : eventListStart + 1,
        limit: eventListEnd,
        currentDate: formattedCurrentDate,
      });
    } else {
      console.log("error...", {
        start: eventListStart,
        limit: eventListEnd,
        currentDate: formattedCurrentDate,
      });
    }
  }, [formattedCurrentDate, eventListStart, eventListEnd]),
    useEffect(() => {
      if (currentLocation) {
        handleGetPopularProduct({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: 0,
          limit: 1,
        });
        handleGetPopularCompanyService({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: 0,
          limit: 1,
        });
        handleGetRecommendProduct({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: 0,
          limit: 1,
        });
        handleGetRecommendCompanyService({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: 0,
          limit: 1,
        });
        handleGetRecommendCompany({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: 0,
          limit: 1,
        });
        handleGetPopularCompany({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
          start: 0,
          limit: 1,
        });
      }
    }, [currentLocation, mId]),
    useFocusEffect(
      useCallback(() => {
        if (currentLocation && mId) {
          handleGetFavoriteAll({
            start: 0,
            limit: 2,
            mid: mId,
          });
          handleGetFavoriteProduct({
            lat: currentLocation.latitude,
            lon: currentLocation.longitude,
            start: 0,
            limit: 2,
            mid: mId,
          });
          handleGetFavoriteService({
            lat: currentLocation.latitude,
            lon: currentLocation.longitude,
            start: 0,
            limit: 1,
            mid: mId,
          });
        }
      }, [currentLocation, mId])
    );

  useFocusEffect(
    useCallback(() => {
      if (currentLocation && mId) {
        handleGetVisitHistoryCompany({
          mid: mId,
          start: visitHisStart === 0 ? 0 : visitHisStart + 1,
          limit: visitHisEnd,
          lat: currentLocation?.latitude,
          lon: currentLocation?.longitude,
        });
      }
    }, [currentLocation, mId, visitHisStart, visitHisEnd])
  );

  useEffect(() => {
    if (currentLocation === null) {
      requestLocationPermission(setCurrentLocation);
    }
  }, []),
    useEffect(() => {
      setDestination({
        latitude: recommendCompanyData?.company_address?.lagitude,
        longitude: recommendCompanyData?.company_address?.logitude,
      });
    }, [recommendCompanyData]);

  useEffect(() => {
    if (currentLocation && destination) {
      //   handleGetGoogleDirection({ desLatitude: destination.latitude, desLongitude: destination.longitude, curLatitude: currentLocation?.lagitude, curLongitude: currentLocation?.longitude, vehicle: 'driving', lg: 'lo' })
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

  useEffect(() => {
    if (googleDirectionData && googleDirectionData?.routes?.length > 0) {
      setDirectionTime(googleDirectionData?.legs[0]?.duration?.text);
    }
  }, [googleDirectionData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <AdvBobUpModal image={'https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/110424/optimized_large_thumb_stage.jpg'} activeVisible={isAdvBobUp} setActiveVisible={setIsAdvBobup} onPress={() => { setIsAdvBobup(false) }} /> */}

        <NavBar
          backgroundColor={themeColors.primaryColor}
          outSideLeftIcon={
            <TouchableOpacity onPress={()=> navigation.openDrawer()}>
              <OutLineIcon.Bars3Icon size={25} color={"white"} />
            </TouchableOpacity>
          }
          insideLeftIcon={
            <Image
              source={require("../../../../assets/logos/UniMarkethub_text.png")}
              style={{ width: 150, height: 20 }}
            />
          }
          insideRightIcon={
            <TouchableOpacity>
              <OutLineIcon.ShoppingCartIcon size={25} color={"white"} />
            </TouchableOpacity>
          }
          outSideRightIcon={
            <TouchableOpacity>
              <OutLineIcon.ChatBubbleLeftEllipsisIcon
                size={25}
                color={"white"}
              />
            </TouchableOpacity>
          }
        />

        <BannerSlider
          bannerData={bannerListData}
          bannerLoading={isBannerListLoading}
        />

        <CategoryList
          categoryData={productCategoryListData}
          categoryCount={productCategoryListCount}
          setCategoryStart={setProCateListStart}
          setCategoryEnd={setProCateListEnd}
          categoryLoading={isProductCategoryListLoading}
        />

        <CategoryList
          categoryData={serviceCategoryListData}
          categoryCount={serviceCategoryListCount}
          setCategoryStart={setServCateListStart}
          setCategoryEnd={setServCateListEnd}
          categoryLoading={isServiceCategoryListLoading}
        />

        <EventList
          eventData={currentEventListData}
          eventCount={currentEventListCount}
          eventListStart={eventListStart}
          setEventListStart={setEventListStart}
          eventListEnd={eventListEnd}
          setEventListEnd={setEventListEnd}
          eventLoading={isCurrentEventListLoading}
        />

        <Recommend
          recommendProductData={recommendProductData?.[0]}
          recommendCompanyServiceData={recommendCompanyServiceData?.[0]}
          recommendCompanyData={recommendCompanyData?.[0]}
          googleDirectionData={googleDirectionData}
          recommedProductLoading={isRecommendProductLoading}
          recommedServiceLoading={isRecommendCompanyServiceLoading}
          recommedCompanyLoading={isRecommendCompanyLoading}
        />

        <Popular
          popularProductData={popularProductData?.[0]}
          popularCompanyServiceData={popularCompanyServiceData?.[0]}
          popularCompanyData={popularCompanyData?.[0]}
          googleDirectionData={googleDirectionData}
          popularCompanyLoading={isPopularProductLoading}
          popularProductLoading={isPopularCompanyLoading}
          popularServiceLoading={isPopularCompanyServiceLoading}
        />

        <View>
          <Favorite
            favoriteFirstData={favoriteAllData?.[0]}
            favoriteSecondData={favoriteAllData?.[1]}
            favoriteThirdData={favoriteAllData?.[2]}
            favoriteLoading={isFavoriteAllLoading}
          />
        </View>

        <View>
          <VisitHistory
            visitHistoryData={visitHistoryData}
            visitHistoryCount={visitHistoryCount}
            visitHisStart={visitHisStart}
            setVisitHistoryEnd={setVisitHisEnd}
            setVisitHistoryStart={setVisitHisStart}
            googleDirectionData={googleDirectionData}
            visitHistoryLoading={isVisitHistoryCompanyLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
