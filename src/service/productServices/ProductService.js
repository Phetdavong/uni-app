import api from '../../utills/api';
import { HTTP5005 } from '@env';

export default {
    loadedRecommendProductService({lat, lon, start, limit}) {
        const url = `${HTTP5005}/product/Recommended/list?dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedRecommendCompanyServiceService({lat, lon, start, limit}){
        const url = `${HTTP5005}/service/Recommended/list?dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedProductDetailService({pid, lat, lon, mid}){
        const url = `${HTTP5005}/product/detail/${pid}?dvlat=${lat}&dvlon=${lon}&mid=${mid}`
        return api.get(url)
    },
    loadedServiceDetailService({sid, lat, lon, mid}){
        const url = `${HTTP5005}/product/service/detail/${sid}?dvlat=${lat}&dvlon=${lon}&mid=${mid}`
        return api.get(url)
    },
    loadedPopularProductService({lat, lon, start, limit}){
        const url = `${HTTP5005}/product/poprolar/list?dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedPopularCompanyServiceService({lat, lon, start, limit}){
        const url = `${HTTP5005}/service/poprolar/list?dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedFavoriteProductService({lat, lon, start, limit, mid}) {
        const url = `${HTTP5005}/favorite/product/list?mid=${mid}&dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedFavoriteServiceService({lat, lon, start, limit, mid}) {
        const url = `${HTTP5005}/favorite/service/list?mid=${mid}&dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedAllFavoriteService({start, limit, mid}) {
        const url = `${HTTP5005}/product/favorite/list?mid=${mid}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    deleteFavoriteService({pid, mid}) {
        const url = `${HTTP5005}/favorite/product/delete/${mid}/${pid}`
        console.log({mid, pid})
        return api.delete(url)
    },
    insertFavoriteService({pid, mid}) {
        const url = `${HTTP5005}/favorite/product/insert`
        console.log("=====>",{mid: mid, pid: pid})
        return api.post(url, {mid: mid, pid: pid})
    },
}