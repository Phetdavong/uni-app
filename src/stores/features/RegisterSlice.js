import { createSlice } from "@reduxjs/toolkit";
import company from "../../model/seller.model";
import moment from "moment";
import { act } from "react";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    company: company,
  },
  reducers: {
    registerBasicInfo: (state, action) => {
      state.company.name = action.payload.name;
      state.company.email = action.payload.email;
      state.company.phone = action.payload.phone;

      console.log("StateCompany------->", state.company);
    },

    registerPayDelLocation: (state, action) => {
      (state.company.company_payments_type = {
        ptid: action.payload.ptid,
        name_la: action.payload.name_la,
      }),
        (state.company.company_deliveries = {
          delid: action.payload.delid,
          name_la: action.payload.name_la,
          name_en: action.payload.name_en,
        }),
        (state.company.company_infras = {
          descrp: action.payload.descrp,
          Infra : {
            ifid: action.payload.ifid,
            name_la: action.payload.name_la,
            name_en: "",
            name_kr: "",
            name_th: "",
            name_vn: "",
            name_ch: "",
          },
        }),
      state.company.company_address ={
        addr_la : action.payload.addr_la,
        addr_en : action.payload.addr_en,
        addr_kr : '',
        addr_th : '',
        addr_vn : '',
        addr_ch : '',
        logitude : action.payload.logitude,
        lagitude : action.payload.lagitude,
        country : {
          cid : 0,
          name_la : action.payload.country_name_la,
        },
        province : {
          pvid : 0,
          name_la : action.payload.province_name_la,
        },
        district : {
          dtid : 0,
          name_la : action.payload.district_name_la,
        },
        village : action.payload.village,
        unit : action.payload.unit,
        detail : action.payload.detail,
      }
    },

    registerTimeAndBreak: (state, action) => {
      state.company.operating_times = action.payload.data;
    },

    registerTypeDocument: (state, action) => {
      state.company.company_document_type = {
        cdtid: action.payload.cdtid,
        name_la: action.payload.company_document_Name,
        name_en: "",
        name_ko: "",
        name_ch: "",
        name_vn: "",
      };
    },

    registerDocumentIdCard: (state, action) => {
      state.company.company_document = {
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
        docid: action.payload.docId,
        issuedate: action.payload.issueDate,
        issueby: action.payload.issueBy,
        expiredate: action.payload.expireDate,
      };

      //console.log("Company =====>",state.company.company_document)
    },

    registerDocumentFamily: (state, action) => {
      // console.log("Action ====> " ,action)
      state.company.company_document = {
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
        docid: action.payload.docId,
        issuedate: action.payload.issueDate,
        issueby: action.payload.issueBy,
        birthdate: action.payload.birthDate,
      };
      // console.log("Company =====>",state.company.company_document)
    },

    registerDocumentPassport: (state, action) => {
      // console.log("Action ====> " ,action)
      state.company.company_document = {
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
        docid: action.payload.docId,
        issuedate: action.payload.issueDate,
        issueby: action.payload.issueBy,
        expiredate: action.payload.expireDate,
      };
      console.log("Company =====>", state.company.company_document);
    },
  },
});

export const {
  registerBasicInfo,
  registerPayDelLocation,
  registerTimeAndBreak,
  registerTypeDocument,
  registerDocumentIdCard,
  registerDocumentFamily,
  registerDocumentPassport,
} = registerSlice.actions;
export default registerSlice.reducer;
