import ProductDetailModel from '../../model/productModels/ProductDetailModel'
import ProductService from "../../service/productServices/ProductService";
import React, { useState } from "react";

export default {
    getRecommendProduct() {
        const [recommendProductData, setRecommendProductData] = useState(null)
        const [isRecommendProductLoading, setIsRecommendProductLoading] = useState(true)
        const [recommendProductError, setRecommendProductError] = useState(null)
        const [recommendProductCount, setRecommendProductCount] = useState(null)

        const handleGetRecommendProduct = async ({ lat, lon, start, limit }) => {
            setIsRecommendProductLoading(true)
            await ProductService.loadedRecommendProductService({ lat: lat, lon: lon, start: start, limit: limit }).then(response => {
                if (response) {

                    const apiReproData = start === 0 ? response?.data?.resp : [...recommendProductData, ...response?.data?.resp]
                    const apiReproCount = response?.data?.count

                    setRecommendProductData(apiReproData)
                    setRecommendProductCount(apiReproCount)
                    setIsRecommendProductLoading(false)
                    console.log('Loaded Recommend Product Successfully...',)
                }
            }).catch(error => {
                setRecommendProductError(error)
                setIsRecommendProductLoading(false)
                console.log('Loaded Recommend Product Failed...', error)
            })
        }
        return {
            recommendProductCount,
            setRecommendProductCount,
            recommendProductData,
            isRecommendProductLoading,
            setIsRecommendProductLoading,
            recommendProductError,
            handleGetRecommendProduct
        }
    },

    getFavoriteAll() {
        const [favoriteAllData, setFavoriteAllData] = useState(null)
        const [isFavoriteAllLoading, setIsFavoriteAllLoading] = useState(true)
        const [favoriteAllError, setFavoriteAllError] = useState(null)
        const [favoriteAllCount, setFavoriteAllCount] = useState(null)

        const handleGetFavoriteAll = async ({ start, limit, mid }) => {
            setIsFavoriteAllLoading(true)
            await ProductService.loadedAllFavoriteService({ start: start, limit: limit, mid: mid }).then(response => {
                if (response) {

                    const apiFavProData = start === 0 ? response?.data?.resp : [...favoriteAllData, ...response?.data?.resp]
                    const apiFavProCount = response?.data?.count

                    setFavoriteAllData(apiFavProData)
                    setFavoriteAllCount(apiFavProCount)
                    setIsFavoriteAllLoading(false)
                    console.log('Loaded Favorite All Successfully...',)
                }
            }).catch(error => {
                setFavoriteAllError(error)
                setIsFavoriteAllLoading(false)
                console.log('Loaded Favorite All Failed...', error)
            })
        }
        return {
            favoriteAllCount,
            setFavoriteAllCount,
            favoriteAllData,
            isFavoriteAllLoading,
            setIsFavoriteAllLoading,
            favoriteAllError,
            handleGetFavoriteAll
        }
    },

    getFavoriteProduct() {
        const [favoriteProductData, setFavoriteProductData] = useState(null)
        const [isFavoriteProductLoading, setIsFavoriteProductLoading] = useState(true)
        const [favoriteProductError, setFavoriteProductError] = useState(null)
        const [favoriteProductCount, setFavoriteProductCount] = useState(null)

        const handleGetFavoriteProduct = async ({ lat, lon, start, limit, mid }) => {
            setIsFavoriteProductLoading(true)
            await ProductService.loadedFavoriteProductService({ lat: lat, lon: lon, start: start, limit: limit, mid: mid }).then(response => {
                if (response) {

                    const apiFavProData = start === 0 ? response?.data?.resp : [...favoriteProductData, ...response?.data?.resp]
                    const apiFavProCount = response?.data?.count

                    setFavoriteProductData(apiFavProData)
                    setFavoriteProductCount(apiFavProCount)
                    setIsFavoriteProductLoading(false)
                    console.log('Loaded Favorite Product Successfully...',)
                }
            }).catch(error => {
                setFavoriteProductError(error)
                setIsFavoriteProductLoading(false)
                console.log('Loaded Favorite Product Failed...', error)
            })
        }
        return {
            favoriteProductCount,
            setFavoriteProductCount,
            favoriteProductData,
            isFavoriteProductLoading,
            setIsFavoriteProductLoading,
            favoriteProductError,
            handleGetFavoriteProduct
        }
    },

    getFavoriteService() {
        const [favoriteServiceData, setFavoriteServiceData] = useState(null)
        const [isFavoriteServiceLoading, setIsFavoriteServiceLoading] = useState(true)
        const [favoriteServiceError, setFavoriteServiceError] = useState(null)
        const [favoriteServiceCount, setFavoriteServiceCount] = useState(null)

        const handleGetFavoriteService = async ({ lat, lon, start, limit, mid }) => {
            setIsFavoriteServiceLoading(true)
            await ProductService.loadedFavoriteServiceService({ lat: lat, lon: lon, start: start, limit: limit, mid: mid }).then(response => {
                if (response) {

                    const apiFavServData = start === 0 ? response?.data?.resp : [...favoriteServiceData, ...response?.data?.resp]
                    const apiFavSerCount = response?.data?.count

                    setFavoriteServiceData(apiFavServData)
                    setFavoriteServiceCount(apiFavSerCount)
                    setIsFavoriteServiceLoading(false)
                    console.log('Loaded Favorite Service Successfully...',)
                }
            }).catch(error => {
                setFavoriteServiceError(error)
                setIsFavoriteServiceLoading(false)
                console.log('Loaded Favorite Service Failed...', error)
            })
        }
        return {
            favoriteServiceCount,
            setFavoriteServiceCount,
            favoriteServiceData,
            isFavoriteServiceLoading,
            setIsFavoriteServiceLoading,
            favoriteServiceError,
            handleGetFavoriteService
        }
    },

    getRecommendCompanyService() {
        const [recommendCompanyServiceData, setRecommendCompanyServiceData] = useState(null)
        const [isRecommendCompanyServiceLoading, setIsRecommendCompanyServiceLoading] = useState(true)
        const [recommendCompanyServiceError, setRecommendCompanyServiceError] = useState(null)
        const [recommendCompanyServiceCount, setRecommendCompanyServiceCount] = useState(null)

        const handleGetRecommendCompanyService = async ({ lat, lon, start, limit }) => {
            setIsRecommendCompanyServiceLoading(true)
            await ProductService.loadedRecommendCompanyServiceService({ lat: lat, lon: lon, start: start, limit: limit }).then(response => {
                if (response) {

                    const reComServData = start === 0 ? response?.data?.resp : [...recommendCompanyServiceData, ...response?.data?.resp]
                    const reComServCount = response?.data?.count

                    setRecommendCompanyServiceCount(reComServCount)
                    setRecommendCompanyServiceData(reComServData)
                    setIsRecommendCompanyServiceLoading(false)
                    console.log('Loaded Recommend Company Service Successfully...')
                }
            }).catch(error => {
                setRecommendCompanyServiceError(error)
                setIsRecommendCompanyServiceLoading(false)
                console.log('Loaded Recommend Company Service Failed...', error)
            })
        }
        return {
            recommendCompanyServiceCount,
            setRecommendCompanyServiceCount,
            recommendCompanyServiceData,
            isRecommendCompanyServiceLoading,
            setIsRecommendCompanyServiceLoading,
            recommendCompanyServiceError,
            handleGetRecommendCompanyService
        }
    },

    getProductDetail() {
        const [productDetailData, setProductDetailData] = useState(null)
        const [isProductDetailLoading, setIsProductDetailLoading] = useState(true)
        const [ProductDetailError, setProductDetailError] = useState(null)

        const handleGetProductDetail = async ({ lat, lon, pid, sid, mid }) => {
            setIsProductDetailLoading(true)

            let productApiPromise;

            if (sid) {
                productApiPromise = ProductService.loadedServiceDetailService({ sid:sid, lat:lat, lon:lon, mid:mid })
            } else {
                productApiPromise = ProductService.loadedProductDetailService({ pid:pid, lat:lat, lon:lon, mid:mid })
            }

            await productApiPromise.then(response => {
                if (response) {

                    const apiProductDetailData = response?.data?.product
                    const apiMyFavorite = response?.data?.myFavorite

                    const productDetail = new ProductDetailModel({
                        myFavorite: apiMyFavorite,

                        comid: apiProductDetailData?.com?.comid,
                        comName: apiProductDetailData?.com?.name,
                        comImage: apiProductDetailData?.com?.company_imgs[0]?.imageUrl,
                        operatingTimes: apiProductDetailData?.com?.operating_times,
                        comAddress: apiProductDetailData?.com?.company_address,

                        products: apiProductDetailData,
                        productDes: apiProductDetailData?.description,
                        productName: apiProductDetailData?.name,
                        productId: apiProductDetailData?.pid,
                        productPrice: apiProductDetailData?.price,
                        productImages: apiProductDetailData?.product_imgs,
                        distance: apiProductDetailData?.com?.distance,
                        starPoint: apiProductDetailData?.com?.StarpointComid,
                        totalReviews: apiProductDetailData?.com?.Total_comid_reviews,
                        good: apiProductDetailData?.good,

                        totalReview: apiProductDetailData?.Total_pro_reviews,
                        totalFav: apiProductDetailData?.Total_pro_favorite,
                        totalOrder: apiProductDetailData?.Total_pro_order,
                        totalVisit: apiProductDetailData?.Total_pro_visit,
                    });

                    console.log(JSON.stringify(apiProductDetailData?.company, null, 2))

                    setProductDetailData(productDetail)
                    setIsProductDetailLoading(false)
                    console.log('Loaded  Product Detail Successfully...')
                }
            }).catch(error => {
                setProductDetailError(error)
                setIsProductDetailLoading(false)
                console.log('Loaded  Product Detail Failed...', error)
            })
        }
        return {
            productDetailData,
            isProductDetailLoading,
            setIsProductDetailLoading,
            ProductDetailError,
            handleGetProductDetail
        }
    },
    getPopularProduct() {
        const [popularProductData, setPopularProductData] = useState(null)
        const [isPopularProductLoading, setIsPopularProductLoading] = useState(true)
        const [popularProductError, setPopularProductError] = useState(null)
        const [popularProductCount, setPopularProductCount] = useState(null)

        const handleGetPopularProduct = async ({ lat, lon, start, limit }) => {
            setIsPopularProductLoading(true)
            await ProductService.loadedPopularProductService({ lat: lat, lon: lon, start: start, limit: limit }).then(response => {
                if (response) {

                    const apiReproData = start === 0 ? response?.data?.resp : [...popularProductData, ...response?.data?.resp]
                    const apiReproCount = response?.data?.count

                    setPopularProductData(apiReproData)
                    setPopularProductCount(apiReproCount)
                    setIsPopularProductLoading(false)
                    console.log('Loaded Popular Product Successfully...',)
                }
            }).catch(error => {
                setPopularProductError(error)
                setIsPopularProductLoading(false)
                console.log('Loaded Popular Product Failed...', error)
            })
        }
        return {
            popularProductCount,
            setPopularProductCount,
            popularProductData,
            isPopularProductLoading,
            setIsPopularProductLoading,
            popularProductError,
            handleGetPopularProduct
        }
    },

    getPopularCompanyService() {
        const [popularCompanyServiceData, setPopularCompanyServiceData] = useState(null)
        const [isPopularCompanyServiceLoading, setIsPopularCompanyServiceLoading] = useState(true)
        const [popularCompanyServiceError, setPopularCompanyServiceError] = useState(null)
        const [popularCompanyServiceCount, setPopularCompanyServiceCount] = useState(null)

        const handleGetPopularCompanyService = async ({ lat, lon, start, limit }) => {
            setIsPopularCompanyServiceLoading(true)
            await ProductService.loadedPopularCompanyServiceService({ lat: lat, lon: lon, start: start, limit: limit }).then(response => {
                if (response) {

                    const apiReproData = start === 0 ? response?.data?.resp : [...popularCompanyServiceData, ...response?.data?.resp]
                    const apiReproCount = response?.data?.count

                    setPopularCompanyServiceData(apiReproData)
                    setPopularCompanyServiceCount(apiReproCount)
                    setIsPopularCompanyServiceLoading(false)
                    console.log('Loaded Popular Company Service Successfully...',)
                }
            }).catch(error => {
                setPopularCompanyServiceError(error)
                setIsPopularCompanyServiceLoading(false)
                console.log('Loaded Popular Company Service Failed...', error)
            })
        }
        return {
            popularCompanyServiceCount,
            setPopularCompanyServiceCount,
            popularCompanyServiceData,
            isPopularCompanyServiceLoading,
            setIsPopularCompanyServiceLoading,
            popularCompanyServiceError,
            handleGetPopularCompanyService
        }
    },


    deleteFavorite() {
        const [deleteFavoriteLoading, setDeleteFavoriteLoading] = useState(false);
        const [deleteFavoriteError, setDeleteFavoriteError] = useState(false);
        const handleDeleteFavorite = async ({mid,pid,setFavEnd, setIsFavorited, setTotalFavorite}) => {
            try {
                setDeleteFavoriteLoading(true);
                await ProductService.deleteFavoriteService({mid:mid, pid: pid}).then(
                    response => {
                        if (response) {
                            setDeleteFavoriteLoading(false);
                            setFavEnd && setFavEnd(prev => prev - 1)
                            setTotalFavorite && setTotalFavorite(prev => prev-1)
                            setIsFavorited && setIsFavorited(false)
                            console.log('Delete Favorite complete...',
                            );
                        } else {
                            console.log('Delete Favorite failed...',
                            );
                        }
                    },
                );
            } catch (err) {
                console.log(err);
                console.log('try catch error', err);
                setDeleteFavoriteError(err);
            }
        };

        return {
            handleDeleteFavorite,
            setDeleteFavoriteLoading,
            deleteFavoriteLoading,
            deleteFavoriteError,
        };
    },

    insertFavorite() {
        const [insertFavoriteLoading, setInsertFavoriteLoading] = useState(false);
        const [insertFavoriteError, setInsertFavoriteError] = useState(false);
        const handleInsertFavorite = async ({mid,pid,setIsFavorited, setTotalFavorite}) => {
            try {
                setInsertFavoriteLoading(true);
                await ProductService.insertFavoriteService({mid:mid, pid: pid}).then(
                    response => {
                        if (response) {
                            setInsertFavoriteLoading(false);
                            setIsFavorited && setIsFavorited(true)
                            setTotalFavorite && setTotalFavorite(prev => prev+1)
                            console.log('Insert Favorite complete...',
                            );
                        } else {
                            console.log('Insert Favorite failed...',
                            );
                        }
                    },
                );
            } catch (err) {
                console.log(err);
                console.log('try catch error', err);
                setInsertFavoriteError(err);
            }
        };

        return {
            handleInsertFavorite,
            setInsertFavoriteLoading,
            insertFavoriteLoading,
            insertFavoriteError,
        };
    },
}