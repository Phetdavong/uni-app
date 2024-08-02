import { useState } from "react";
import RegisterSellerService from "../../service/registerSellerServices/RegisterSellerService";

export default {
  getDayOpenApi() {
    const [dayOpenData, setDayOpenData] = useState();
    const [dayOpenLoadIng, setDayOpenLoadIng] =useState(true);
    const [dayOpenError, setDayOpenError] = useState();
    const [dayOpenCount, setDayOpenCount] = useState();
    const handleGetDayOpen = async () => {
      setDayOpenData(true);
      try {
        const resp = await RegisterSellerService.DayOpenService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', JSON.stringify(data,null,2));
        // console.log('======>', data)

        setDayOpenData(data);
        setDayOpenLoadIng(false);
        setDayOpenCount(count);
      } catch (error) {
        console.error("Error occurred while try to call API", error);
        setDayOpenLoadIng(false);
        setDayOpenError(error);
      }
    };
    return {
      dayOpenData,
      setDayOpenData,
      dayOpenLoadIng,
      setDayOpenLoadIng,
      dayOpenError,
      setDayOpenError,
      dayOpenCount,
      setDayOpenCount,
      handleGetDayOpen,
    };
  },
};
