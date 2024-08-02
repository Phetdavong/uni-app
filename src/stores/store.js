import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import registerSlice from "./features/RegisterSlice";
import companySlice from './sellerProfile/sellerProfile.store';
import registerSlice from './registerCompany/registerCompany.store';
import { useDispatch } from "react-redux";


const rootReducer = combineReducers(
  {
    register: registerSlice,
    company:companySlice
  },
)

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();

export default store;
