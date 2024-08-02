import API from '../api/api.service'

export default {
    getInfra(){
        const url = '/infrastructure/all';
        return API().get(url);
    }
}