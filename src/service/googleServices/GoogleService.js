import api from "../../utills/api";
import { GoogleMapAPIKey } from "@env";
 
export default {
  googleDirectionService({
    desLatitude,
    desLongitude,
    curLatitude,
    curLongitude,
    vehicle,
    lg,
  }) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${curLatitude},${curLongitude}&destination=${desLatitude},${desLongitude}&mode=${vehicle}&key=${GoogleMapAPIKey}&language=${lg}`;
    return api.get(url);
  },
  
  googleAddressInfoApiService({lat, log, lg}) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&key=${GoogleMapAPIKey}&language=${lg}`;
    console.log("======>", lat, log, lg)
    return api.get(url);
  },
};
 
 