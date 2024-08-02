import {useState} from 'react';
import RegisterSellerService from '../../service/registerSellerServices/RegisterSellerService';

export default {
  getRegisterApi() {
    const [RegisterData, setRegisterData] = useState();
    const [RegisterLoadIng, setRegisterLoadIng] = useState(true);
    const [RegisterError, setRegisterError] = useState();
    const [RegisterCount, setRegisterCount] = useState();
    const handleGetRegister = async () => {
        setRegisterData(true);
      try {
        const resp = await RegisterSellerService.registerSellerService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', JSON.stringify(data,null,2));
        // console.log('======>', data)
        
        setRegisterData(data);
        setRegisterLoadIng(false);
        setRegisterCount(count);
      } catch (error) {
        console.error('Error occurred while try to call API', error);
        setRegisterLoadIng(false);
        setRegisterError(error);
      }
    };
    return {
        RegisterData,
        setRegisterData,
        RegisterLoadIng,
        setRegisterLoadIng,
        RegisterError,
        setRegisterError,
        RegisterCount,
        setRegisterCount,
        handleGetRegister,
    };
  },
};
