import API from "../api/api.service";


export default {
    registerCompany(params){
        const url = '/company/create';
        console.log('url====>:', url);
        return API().post(url, {params:params});
    }
};