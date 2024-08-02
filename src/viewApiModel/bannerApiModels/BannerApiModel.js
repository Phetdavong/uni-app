import BannerService from "../../service/bannerServices/BannerService";
import React, { useState } from "react";

export default {
    getBannerList() {
        const [bannerListData, setBannerListData] = useState(null)
        const [isBannerListLoading, setIsBannerListLoading] = useState(true)
        const [bannerListError, setBannerListError] = useState(null)

        const handleGetBannerList = async ({ start, limit }) => {
            setIsBannerListLoading(true)
            await BannerService.loadedBannerApi({ start: start, limit: limit }).then(response =>{
                if(response){

                const bannerData = response?.data?.banners
                
                setBannerListData(bannerData)
                setIsBannerListLoading(false)
                console.log('Loaded Banner Successfully...')
                }
            }).catch(error =>{
                setBannerListError(error)
                setIsBannerListLoading(false)
                console.log('Loaded Banner Failed...', error)
            })
        }
        return {
            bannerListData,
            isBannerListLoading,
            setIsBannerListLoading,
            bannerListError,
            handleGetBannerList
        }

    }
}