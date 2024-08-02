import CompanyService from "../../service/companyServices/CompanyService";
import CompanyModel from "../../model/companyModels/CompanyModel";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

export default {
  getRecommendCompany() {
    const [recommendCompanyData, setRecommendCompanyData] = useState(null);
    const [isRecommendCompanyLoading, setIsRecommendCompanyLoading] =
      useState(true);
    const [recommendCompanyError, setRecommendCompanyError] = useState(null);
    const [recommendCompanyCount, setRecommendCompanyCount] = useState(0);

    const handleGetRecommendCompany = async ({ lat, lon, start, limit }) => {
      setIsRecommendCompanyLoading(true);
      await CompanyService.loadedRecommendCompanyService({
        lat: lat,
        lon: lon,
        start,
        limit,
      })
        .then((response) => {
          if (response) {
            const reComData =
              start === 0
                ? response?.data?.companies
                : [...recommendCompanyData, ...response?.data?.companies];
            const reComCount = response?.data?.count;

            setRecommendCompanyCount(reComCount);
            setRecommendCompanyData(reComData);
            setIsRecommendCompanyLoading(false);
            console.log("Loaded Recommend Company Successfully...");
          }
        })
        .catch((error) => {
          setRecommendCompanyError(error);
          setIsRecommendCompanyLoading(false);
          console.log("Loaded Recommend Company Failed...", error);
        });
    };
    return {
      recommendCompanyCount,
      setRecommendCompanyCount,
      recommendCompanyData,
      isRecommendCompanyLoading,
      setIsRecommendCompanyLoading,
      recommendCompanyError,
      handleGetRecommendCompany,
    };
  },

  getPopularCompany() {
    const [popularCompanyData, setPopularCompanyData] = useState(null);
    const [isPopularCompanyLoading, setIsPopularCompanyLoading] =
      useState(true);
    const [popularCompanyError, setPopularCompanyError] = useState(null);
    const [popularCompanyCount, setPopularCompanyCount] = useState(0);

    const handleGetPopularCompany = async ({ lat, lon, start, limit }) => {
      setIsPopularCompanyLoading(true);
      await CompanyService.loadedPopularCompanyService({
        lat: lat,
        lon: lon,
        start,
        limit,
      })
        .then((response) => {
          if (response) {
            const reComData =
              start === 0
                ? response?.data?.companies
                : [...popularCompanyData, ...response?.data?.companies];
            const reComCount = response?.data?.count;

            setPopularCompanyCount(reComCount);
            setPopularCompanyData(reComData);
            setIsPopularCompanyLoading(false);
            console.log("Loaded Popular Company Successfully...");
          }
        })
        .catch((error) => {
          setPopularCompanyError(error);
          setIsPopularCompanyLoading(false);
          console.log("Loaded Popular Company Failed...", error);
        });
    };
    return {
      popularCompanyCount,
      setPopularCompanyCount,
      popularCompanyData,
      isPopularCompanyLoading,
      setIsPopularCompanyLoading,
      popularCompanyError,
      handleGetPopularCompany,
    };
  },

  getCompanyDetail() {
    const [companyDetailData, setCompanyDetailData] = useState(null);
    const [isCompanyDetailLoading, setIsCompanyDetailLoading] = useState(true);
    const [companyDetailError, setCompanyDetailError] = useState(null);

    const handleGetCompanyDetail = async ({ comid, mid, lat, lon }) => {
      setIsCompanyDetailLoading(true);
      await CompanyService.loadedCompanyDetailService({
        comid: comid,
        mid: mid,
        lat: lat,
        lon: lon,
      })
        .then((response) => {
          if (response) {
            // const apiCompanyDetailData = response?.data
            const companyDetailData = new CompanyModel({
              comid: response?.data?.company?.comid,
              comName: response?.data?.company?.name,
              comImage: response?.data?.company?.company_imgs,
              comProfileImage:
                response?.data?.company?.company_profile_img?.imageUrl,
              operatingTimes: response?.data?.company?.operating_times,
              comAddress: response?.data?.company?.company_address,
              comInfra: response?.data?.company?.company_infras,
              starPoint: response?.data?.starpoint,
              total: response?.data?.total,
              myFollwing: response?.data?.myfollowing,
            });

            setCompanyDetailData(companyDetailData);
            setIsCompanyDetailLoading(false);
            console.log("Loaded Company Detail Successfully...");
          }
        })
        .catch((error) => {
          setCompanyDetailError(error);
          setIsCompanyDetailLoading(false);
          console.log("Loaded Company Detail Failed...", error);
        });
    };
    return {
      companyDetailData,
      setCompanyDetailData,
      isCompanyDetailLoading,
      setIsCompanyDetailLoading,
      companyDetailError,
      setCompanyDetailError,
      handleGetCompanyDetail,
    };
  },

  getVisitHistoryCompany() {
    const [visitHistoryData, setVisitHistoryCompanyData] = useState(null);
    const [isVisitHistoryCompanyLoading, setIsVisitHistoryCompanyLoading] =
      useState(true);
    const [visitHistoryError, setVisitHistoryCompanyError] = useState(null);
    const [visitHistoryCount, setVisitHistoryCompanyCount] = useState(null);

    const handleGetVisitHistoryCompany = async ({
      start,
      limit,
      mid,
      lat,
      lon,
    }) => {
      setIsVisitHistoryCompanyLoading(true);
      await CompanyService.loadedVisitHistoryCompanyService({
        start: start,
        limit: limit,
        mid: mid,
        lat: lat,
        lon: lon,
      })
        .then((response) => {
          if (response) {
            const apiReproData =
              start === 0
                ? response?.data?.companies
                : [...visitHistoryData, ...response?.data?.companies];
            const apiReproCount = response?.data?.count;

            setVisitHistoryCompanyData(apiReproData);
            setVisitHistoryCompanyCount(apiReproCount);
            setIsVisitHistoryCompanyLoading(false);
            console.log("Loaded Visit History Successfully...");
          }
        })
        .catch((error) => {
          setVisitHistoryCompanyError(error);
          setIsVisitHistoryCompanyLoading(false);
          console.log("Loaded Visit History Failed...", error);
        });
    };
    return {
      visitHistoryCount,
      setVisitHistoryCompanyCount,
      visitHistoryData,
      isVisitHistoryCompanyLoading,
      setIsVisitHistoryCompanyLoading,
      visitHistoryError,
      handleGetVisitHistoryCompany,
    };
  },

  insertVisitHistoryCompany() {
    const [
      isInsertVisitHistoryCompanyLoading,
      setIsInsertVisitHistoryCompanyLoading,
    ] = useState(true);
    const [insertVisitHistoryCompanyError, setInsertVisitHistoryCompanyError] =
      useState(null);

    const navigation = useNavigation();

    const handleInsertVisitHistoryCompany = async ({ mid, comid }) => {
      setIsInsertVisitHistoryCompanyLoading(true);
      await CompanyService.insertVisitHistoryCompanyService({
        mid: mid,
        comid: comid,
      })
        .then((response) => {
          if (response) {
            setIsInsertVisitHistoryCompanyLoading(false);
            console.log("Insert Visit History Successfully...");
            navigation.navigate("CompanyDetail", { comid: comid });
          }
        })
        .catch((error) => {
          setInsertVisitHistoryCompanyError(error);
          setIsInsertVisitHistoryCompanyLoading(false);
          console.log("Insert Visit History Failed...", error);
        });
    };
    return {
      isInsertVisitHistoryCompanyLoading,
      setIsInsertVisitHistoryCompanyLoading,
      insertVisitHistoryCompanyError,
      handleInsertVisitHistoryCompany,
    };
  },

  insertCompanyFollowing() {
    const [
      isInsertCompanyFollowingLoading,
      setIsInsertCompanyFollowingLoading,
    ] = useState(true);
    const [insertCompanyFollowingError, setInsertCompanyFollowingError] =
      useState(null);

    const handleInsertCompanyFollowing = async ({
      mid,
      comid,
      setIsFollowed,
    }) => {
      setIsInsertCompanyFollowingLoading(true);
      await CompanyService.insertCompanyFollowingService({
        mid: mid,
        comid: comid,
      })
        .then((response) => {
          if (response) {
            setIsInsertCompanyFollowingLoading(false);
            setIsFollowed && setIsFollowed(true);
            console.log("Insert Visit History Successfully...");
          }
        })
        .catch((error) => {
          setInsertCompanyFollowingError(error);
          setIsInsertCompanyFollowingLoading(false);
          console.log("Insert Visit History Failed...", error);
        });
    };
    return {
      isInsertCompanyFollowingLoading,
      setIsInsertCompanyFollowingLoading,
      insertCompanyFollowingError,
      handleInsertCompanyFollowing,
    };
  },

  deleteCompanyFollowing() {
    const [
      isDeleteCompanyFollowingLoading,
      setIsDeleteCompanyFollowingLoading,
    ] = useState(true);
    const [deleteCompanyFollowingError, setDeleteCompanyFollowingError] =
      useState(null);

    const handleDeleteCompanyFollowing = async ({
      mid,
      comid,
      setIsFollowed,
      setFollowedEnd,
    }) => {
      setIsDeleteCompanyFollowingLoading(true);
      await CompanyService.deleteCompanyFollowingService({
        mid: mid,
        comid: comid,
      })
        .then((response) => {
          if (response) {
            setIsDeleteCompanyFollowingLoading(false);
            setIsFollowed && setIsFollowed(false);
            setFollowedEnd && setFollowedEnd((prev) => prev - 1);
            console.log("Delete Visit History Successfully...");
          }
        })
        .catch((error) => {
          setDeleteCompanyFollowingError(error);
          setIsDeleteCompanyFollowingLoading(false);
          console.log("Delete Visit History Failed...", error);
        });
    };
    return {
      isDeleteCompanyFollowingLoading,
      setIsDeleteCompanyFollowingLoading,
      deleteCompanyFollowingError,
      handleDeleteCompanyFollowing,
    };
  },

  getFollowingCompany() {
    const [followingData, setFollowingCompanyData] = useState(null);
    const [isFollowingCompanyLoading, setIsFollowingCompanyLoading] =
      useState(true);
    const [followingError, setFollowingCompanyError] = useState(null);
    const [followingCount, setFollowingCompanyCount] = useState(null);

    const handleGetFollowingCompany = async ({ start, limit, mid }) => {
      setIsFollowingCompanyLoading(true);
      await CompanyService.loadedFollowCompanyService({
        start: start,
        limit: limit,
        mid: mid,
      })
        .then((response) => {
          if (response) {
            const apiFollowData =
              start === 0
                ? response?.data?.resp
                : [...followingData, ...response?.data?.resp];
            const apiFollowCount = response?.data?.count;

            setFollowingCompanyData(apiFollowData);
            setFollowingCompanyCount(apiFollowCount);
            setIsFollowingCompanyLoading(false);
            console.log("Loaded Following Successfully...");
          }
        })
        .catch((error) => {
          setFollowingCompanyError(error);
          setIsFollowingCompanyLoading(false);
          console.log("Loaded Following Failed...", error);
        });
    };
    return {
      followingCount,
      setFollowingCompanyCount,
      followingData,
      isFollowingCompanyLoading,
      setIsFollowingCompanyLoading,
      followingError,
      handleGetFollowingCompany,
    };
  },
};
