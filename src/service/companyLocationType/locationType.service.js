import API from '../api/api.service'

export default {
    getLocationType(){
        const url = '/location_type/lists';
        return API().get(url);
    }
}