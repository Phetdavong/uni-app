import api from '../../utills/api';
import { HTTP5005 } from '@env';

export default {
    loadedCurrentEventService({start, limit, currentDate}){
        const url = `${HTTP5005}/event/start/list?page=${start}&limit=${limit}&startdate=${currentDate}`
        return api.get(url)
    },
    loadedFinishedEventService({ start, limit, currentDate }){
        const url = `${HTTP5005}/event/end/list?page=${start}&limit=${limit}&enddate=${currentDate}`
        return api.get(url)
    },
    loadedEventDetailService({evid}){
        const url = `${HTTP5005}/event/detail/${evid}`
        return api.get(url)
    }
}