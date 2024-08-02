import API from '../api/api.service'

export default {
    getDeliveries(){
        const url = '/delivery/all'
        return API().get(url);
    }
}