import axios from "axios";

const baseUrl = process.env.BASE_API_URL;
//const baseUrl = 'http://10.0.1.18:8000/api/v10';

export default () => {
    console.log(`url ----> `, baseUrl);
    return axios.create({baseURL:baseUrl});
}

