import { useState } from "react";
import RegisterSellerService from "../../service/registerSellerServices/RegisterSellerService";

export default {
  getInfrastructureApi() {
    const [infrastructureData, setInfrastructureData] = useState();
    const [infrastructureLoadIng, setInfrastructureLoadIng] = useState(true);
    const [infrastructureError, setInfrastructureError] = useState();
    const [infrastructureCount, setInfrastructureCount] = useState();
    const handleGetInfrastructure = async () => {
      setInfrastructureData(true);
      try {
        const resp = await RegisterSellerService.infrastructureService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', JSON.stringify(data,null,2));
        // console.log('======>', data)
        setInfrastructureData(data);
        setInfrastructureLoadIng(false);
        setInfrastructureCount(count);
      } catch (error) {
        console.error("Error occurred while try to call API", error);
        setInfrastructureLoadIng(false);
        setInfrastructureError(error);
      }
    };
    return {
      infrastructureData,
      setInfrastructureData,
      infrastructureLoadIng,
      setInfrastructureLoadIng,
      infrastructureError,
      setInfrastructureError,
      infrastructureCount,
      setInfrastructureCount,
      handleGetInfrastructure,
    };
  },
};
