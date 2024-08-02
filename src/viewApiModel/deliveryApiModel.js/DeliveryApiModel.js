import {useState} from 'react';
import RegisterSellerService from '../../service/registerSellerServices/RegisterSellerService';

export default {
  getDeliveryApi() {
    const [DeliveryData, setDeliveryData] = useState();
    const [DeliveryLoadIng, setDeliveryLoadIng] = useState(true);
    const [DeliveryError, setDeliveryError] = useState();
    const [DeliveryCount, setDeliveryCount] = useState();
    const handleGetDelivery = async () => {
        setDeliveryData(true);
      try {
        const resp = await RegisterSellerService.deliveryService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', JSON.stringify(data,null,2));
        // console.log('======>', data)
        setDeliveryData(data);
        setDeliveryLoadIng(false);
        setDeliveryCount(count);
      } catch (error) {
        console.error('Error occurred while try to call API', error);
        setDeliveryLoadIng(false);
        setDeliveryError(error);
      }
    };
    return {
        DeliveryData,
        setDeliveryData,
        DeliveryLoadIng,
        setDeliveryLoadIng,
        DeliveryError,
        setDeliveryError,
        DeliveryCount,
        setDeliveryCount,
        handleGetDelivery,
    };
  },
};
