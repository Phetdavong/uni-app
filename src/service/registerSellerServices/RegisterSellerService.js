import api from "../../api/Api";
import { HTTP8000 } from "@env";

export default {
  registerSellerService() {
    const url = `${HTTP8000}/api/company/create`;
    return api.post(url);
  },
  
  paymentTypeService() {
    const url = `${HTTP8000}/api/payment_type/all`;
    return api.get(url);
  },

  deliveryService() {
    const url = `${HTTP8000}/api/delivery/all`;
    return api.get(url);
  },

  
  infrastructureService() {
    const url = `${HTTP8000}/api/infrastructure/all`;
    return api.get(url);
  },

  CompanyDocumentTypeService() {
    const url = `${HTTP8000}/api/company_document_type/all`;
    return api.get(url);
  },
  
  DayOpenService() {
    const url = `${HTTP8000}/api/days/all`;
    return api.get(url);
  },
};



