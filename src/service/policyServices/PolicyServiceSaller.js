import {HTTP8000} from '@env';
import Api from '../../api/Api';

export default {
  policyService() {
    const url = `${HTTP8000}/api/term_condition/term_condition_gpc?type=5`;
    return Api.get(url);
  },
};
