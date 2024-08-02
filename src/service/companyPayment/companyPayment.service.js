import API from '../api/api.service'

export default {
    getPayments(){
        const url = '/payment_type/all';
        return API().get(url);
    }
}