import api from '../../utills/api';
import { HTTP5005 } from '@env';

export default {
    loadedBannerApi({start, limit}) {
        const url = `${HTTP5005}/banner/list?page=${start}&limit=${limit}`
        return api.get(url)
    }
}