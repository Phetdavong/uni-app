import api from '../../utills/api';
import { HTTP5005 } from '@env';

export default {
    loadedRecommendCompanyService({lat, lon, start, limit}) {
        const url = `${HTTP5005}/company/list/Recommended?limit=${limit}&page=${start}&dvlat=${lat}&dvlon=${lon}`
        return api.get(url)
    },
    loadedCompanyDetailService({comid, mid, lat, lon}){
        const url = `${HTTP5005}/company/detail/${comid}?dvlat=${lat}&dvlon=${lon}&mid=${mid}`
        return api.get(url)
    },
    loadedPopularCompanyService({lat, lon, start, limit}) {
        const url = `${HTTP5005}/company/list/poprolar?limit=${limit}&page=${start}&dvlat=${lat}&dvlon=${lon}`
        return api.get(url)
    },
    loadedVisitHistoryCompanyService({start, limit, mid, lat, lon}) {
        const url = `${HTTP5005}/account/visit/history/member?mid=${mid}&dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    insertVisitHistoryCompanyService({mid, comid}) {
        const url = `${HTTP5005}/account/visitHistory/company`
        console.log('===>',comid)
        return api.post(url, {mid: mid, comid: comid})
    },
    loadedVisitHistoryCompanyService({start, limit, mid, lat, lon}) {
        const url = `${HTTP5005}/account/visit/history/member?mid=${mid}&dvlat=${lat}&dvlon=${lon}&limit=${limit}&page=${start}`
        return api.get(url)
    },
    insertCompanyFollowingService({mid, comid}) {
        const url = `${HTTP5005}/follow/insert`
        return api.post(url, {mid: mid, comid: comid})
    },
    deleteCompanyFollowingService({mid, comid}) {
        const url = `${HTTP5005}/follow/delete/${mid}/${comid}`
        console.log('===>', {mid, comid})
        return api.delete(url)
    },
    loadedFollowCompanyService({start, limit, mid}) {
        const url = `${HTTP5005}/follow/list?limit=${limit}&page=${start}&mid=${mid}`
        return api.get(url)
    },
}