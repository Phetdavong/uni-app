import {useState} from 'react';
import RegisterSellerService from '../../service/registerSellerServices/RegisterSellerService';

export default {
  getRegisterSellerTwoApi() {
    const [RegisterSellerTwoData, setRegisterSellerTwoData] = useState();
    const [RegisterSellerTwoLoadIng, setRegisterSellerTwoLoadIng] = useState(true);
    const [RegisterSellerTwoError, setRegisterSellerTwoError] = useState();
    const [RegisterSellerTwoCount, setRegisterSellerTwoCount] = useState();
    const handleGetRegisterSellerTwo = async () => {
        setRegisterSellerTwoData(true);
      try {
        const resp = await RegisterSellerService.paymentTypeService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', JSON.stringify(data,null,2));
        // console.log('======>', data)
        setRegisterSellerTwoData(data);
        setRegisterSellerTwoLoadIng(false);
        setRegisterSellerTwoCount(count);
      } catch (error) {
        console.error('Error occurred while try to call API', error);
        setRegisterSellerTwoLoadIng(false);
        setRegisterSellerTwoError(error);
      }
    };
    return {
        RegisterSellerTwoData,
        setRegisterSellerTwoData,
        RegisterSellerTwoLoadIng,
        setRegisterSellerTwoLoadIng,
        RegisterSellerTwoError,
        setRegisterSellerTwoError,
        RegisterSellerTwoCount,
        setRegisterSellerTwoCount,
        handleGetRegisterSellerTwo,
    };
  },
};

