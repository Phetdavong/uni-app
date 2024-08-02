import api from '../../utills/api';
import { HTTP5005 } from '@env';


export default {
    loadedProductCategoryService({start, limit}){
        const url = `${HTTP5005}/tag/product/list?limit=${limit}&page=${start}`
        return api.get(url)
    },
    loadedServiceCategoryService({start, limit}){
        const url = `${HTTP5005}/tag/service/list?limit=${limit}&page=${start}`
        return api.get(url)
    }
}