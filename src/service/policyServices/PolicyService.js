import api from '../../utills/api';
import { HTTP5005 } from '@env';

export default {
    loadedAppUsagePolicyService({pcid}){
        const url = `${HTTP5005}/policy/${pcid}`
        return api.get(url)
    },
}