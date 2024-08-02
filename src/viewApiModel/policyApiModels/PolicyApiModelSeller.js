import {useState} from 'react';
import PolicyService from '../../service/policyServices/PolicyServiceSaller';

export default {
  getAppUsagePolicyApi() {
    const [AppUsagePolicyData, setAppUsagePolicyData] = useState();
    const [AppUsagePolicyLoadIng, setAppUsagePolicyLoadIng] = useState(true);
    const [AppUsagePolicyError, setAppUsagePolicyError] = useState();
    const [AppUsagePolicyCount, setAppUsagePolicyCount] = useState();
    const handleGetAppUsagePolicy = async () => {
      setAppUsagePolicyLoadIng(true);
      try {
        const resp = await PolicyService.policyService();
        const data = resp?.data;
        const count = resp?.count;
        // console.log('=====>', data);
        setAppUsagePolicyData(data);
        setAppUsagePolicyLoadIng(false);
        setAppUsagePolicyCount(count);
      } catch (error) {
        console.error('Error occurred while try to call API', error);
        setAppUsagePolicyLoadIng(false);
        setAppUsagePolicyError(error);
      }
    };
    return {
      AppUsagePolicyData,
      AppUsagePolicyLoadIng,
      AppUsagePolicyError,
      AppUsagePolicyCount,
      setAppUsagePolicyLoadIng,
      handleGetAppUsagePolicy,
    };
  },
};
