import API from "../api/api.service";
import axios from "axios";

export default {
    getSellerProfile(comid){
        const url = `/company/companydetail/${comid}`;
        return API().get(url);
    },

    updateCompanyProfile(company){
        const url = '/company/update';
        return API().patch(url, company);
    },

    updateProfileImg(form){
        console.log('----------->', form);
        const url = '/company/updateprofile';
        return API().post(url,form, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateCompanyBackground(body){
        const url = '/company/addimagecompanybackground';
        return API().post(url, body, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    deleteCompanyBackground(params){
        const url = '/company/deleteimagecompanybackground';
        console.log(params)
        console.log('---------> ',params);
        console.log('url',url);
        // return API().delete(url, {params:params});
        const cdd = API().delete(url, {params:params});
        console.log('------=====>', cdd)
        return cdd;
        // let config = {
        //     method: 'delete',
        //     // maxBodyLength: Infinity,
        //     url: `http://10.0.1.26:8000/api/company/deleteimagecompanybackground?comid=${params.comid}&ciid=${params.ciid}`,
        //     headers: { }
        //   };
          
        //  const resp = axios.request(config);
        //  console.log(resp)
        //  return resp;
    }

};
