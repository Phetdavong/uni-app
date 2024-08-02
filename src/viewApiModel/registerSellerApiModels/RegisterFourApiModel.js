import { useState } from "react";
import RegisterSellerService from "../../service/registerSellerServices/RegisterSellerService";

export default {
  getCompanyDocumentTypeApi() {
    const [CompanyDocumentTypeData, setCompanyDocumentTypeData] = useState();
    const [CompanyDocumentTypeLoadIng, setCompanyDocumentTypeLoadIng] =
      useState(true);
    const [CompanyDocumentTypeError, setCompanyDocumentTypeError] = useState();
    const [CompanyDocumentTypeCount, setCompanyDocumentTypeCount] = useState();
    const handleGetCompanyDocumentType = async () => {
      setCompanyDocumentTypeData(true);
      try {
        const resp = await RegisterSellerService.CompanyDocumentTypeService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', JSON.stringify(data,null,2));
        // console.log('======>', data)

        setCompanyDocumentTypeData(data);
        setCompanyDocumentTypeLoadIng(false);
        setCompanyDocumentTypeCount(count);
      } catch (error) {
        console.error("Error occurred while try to call API", error);
        setCompanyDocumentTypeLoadIng(false);
        setCompanyDocumentTypeError(error);
      }
    };
    return {
      CompanyDocumentTypeData,
      setCompanyDocumentTypeData,
      CompanyDocumentTypeLoadIng,
      setCompanyDocumentTypeLoadIng,
      CompanyDocumentTypeError,
      setCompanyDocumentTypeError,
      CompanyDocumentTypeCount,
      setCompanyDocumentTypeCount,
      handleGetCompanyDocumentType,
    };
  },
};
