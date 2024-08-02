import CategoryService from "../../service/categoryServices/CategoryService";
import React, { useState } from "react";

export default {
    getProductCategoryList() {
        const [productCategoryListData, setProductCategoryListData] = useState(null)
        const [isProductCategoryListLoading, setIsProductCategoryListLoading] = useState(true)
        const [productCategoryListError, setProductCategoryListError] = useState(null)
        const [productCategoryListCount, setProductCategoryListCount] = useState(null)

        const handleGetProductCategoryList = async ({ start, limit }) => {
            setIsProductCategoryListLoading(true)
            await CategoryService.loadedProductCategoryService({ start: start, limit: limit }).then(response => {
                if (response) {

                    const apiProCateData = start === 0 ? response?.data?.tagData : [...productCategoryListData, ...response?.data?.tagData]
                    const apiProCateCount = response?.data?.count

                    setProductCategoryListCount(apiProCateCount)
                    setProductCategoryListData(apiProCateData)
                    setIsProductCategoryListLoading(false)
                    console.log('Loaded Product Category Successfully...')
                }
            }).catch(error => {
                setProductCategoryListError(error)
                setIsProductCategoryListLoading(false)
                console.log('Loaded Product Category Failed...', error)
            })
        }
        return {
            productCategoryListCount,
            setProductCategoryListCount,
            productCategoryListData,
            isProductCategoryListLoading,
            setIsProductCategoryListLoading,
            productCategoryListError,
            handleGetProductCategoryList
        }
    },

    getServiceCategoryList() {
        const [serviceCategoryListData, setServiceCategoryListData] = useState(null)
        const [isServiceCategoryListLoading, setIsServiceCategoryListLoading] = useState(true)
        const [serviceCategoryListError, setServiceCategoryListError] = useState(null)
        const [serviceCategoryListCount, setServiceCategoryListCount] = useState(null)

        const handleGetServiceCategoryList = async ({start, limit}) => {
            setIsServiceCategoryListLoading(true)
            await CategoryService.loadedServiceCategoryService({start: start, limit: limit}).then(response => {
                if (response) {

                    const apiServCateData = start === 0 ? response?.data?.tagData : [...serviceCategoryListData, ...response?.data?.tagData]
                    const apiServCateCount = response?.data?.count

                    setServiceCategoryListData(apiServCateData)
                    setServiceCategoryListCount(apiServCateCount)
                    setIsServiceCategoryListLoading(false)
                    console.log('Loaded Service Category Successfully...')
                }
            }).catch(error => {
                setServiceCategoryListError(error)
                setIsServiceCategoryListLoading(false)
                console.log('Loaded Service Category Failed...', error)
            })
        }
        return {
            serviceCategoryListCount,
            setServiceCategoryListCount,
            serviceCategoryListData,
            isServiceCategoryListLoading,
            setIsServiceCategoryListLoading,
            serviceCategoryListError,
            handleGetServiceCategoryList
        }
    }
}