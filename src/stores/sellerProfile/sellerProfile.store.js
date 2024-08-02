import sellerProfileService from "../../service/sellerProfile/sellerProfile.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import company from "../../model/seller.model";

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (comid, { rejectWithValue }) => {
    try {
      const resp = await sellerProfileService.getSellerProfile(comid);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/update",
  async (body, { rejectWithValue }) => {
    try {
      const resp = await sellerProfileService.updateCompanyProfile(body);
      console.log('---->', resp.data)
      return resp.data;
    } catch (error) {
      console.error("Error occurred while try to update company info", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateBackground = createAsyncThunk(
  "company/addimagecompanybackground",
  async (body, { rejectWithValue }) => {
    try {
      const resp = await sellerProfileService.updateCompanyBackground(body);
      return resp.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const removeImage = createAsyncThunk(
  "company/deleteimagecompanybackground",
  async (params, { rejectWithValue }) => {
    try {
      const resp = await sellerProfileService.deleteCompanyBackground(params);
      return resp.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const companySlice = createSlice({
  name: "companyStore",
  initialState: {
    company: company,
    status: "idle",
    error: null,
  },
  reducers: {
    setCompanyProfile(state, action) {
      state.company = action.payload;
    },
    setName(state, action) {
      state.company.name = action.payload;
    },
    setEmail(state, action) {
      state.company.email = action.payload;
    },
    setTel(state, action) {
      state.company.company_address.tel = action.payload;
    },
    setDescription(state, action) {
      state.company.other_info = action.payload;
    },
    setAddress(state, action) {
      state.company.company_address.addr_la = action.payload;
    },
    setCompanyPayments(state, action) {
      state.company.company_payments = action.payload;
    },

    setCompanyDelivery(state, action) {
      state.company.company_deliveries = action.payload;
    },

    addCompanyDelivery(state, action) {
      const item = action.payload;
      const newItem = {
        comid: state.company.comid,
        delid: item.delid,
        del: item,
      };
      state.company.company_deliveries.push(newItem);
    },

    removeCompanyDelivery(state, action) {
      const removeItem = action.payload;
      const newDeliveries = state.company.company_deliveries.filter((item) => {
        return item.delid !== removeItem.delid;
      });
      state.company.company_deliveries = newDeliveries;
    },

    setCompanyInfra(state, action) {
      const item = action.payload;
      const newItem = {
        comid: state.company.comid,
        ifid: item.ifid,
        descrp: null,
        if: item,
      };
      state.company.company_infras.push(newItem);
    },

    addCompanyInfra(state, action) {
      const item = action.payload;
      const newItem = {
        comid: state.company.comid,
        ifid: item.ifid,
        descrp: null,
        if: item,
      };
      state.company.company_infras.push(newItem);
      console.log(
        "new Company infras",
        JSON.stringify(state.company.company_infras, 0, 2)
      );
    },

    removeCompanyInfra(state, action) {
      const removeItem = action.payload;
      const newInfras = state.company.company_infras.filter((item) => {
        return item.ifid !== removeItem.ifid;
      });

      state.company.company_infras = newInfras;
      console.log(
        "new Company infras",
        JSON.stringify(state.company.company_infras, 0, 2)
      );
    },

    setLocationType(state, action) {
      state.company.lt = action.payload;
    },
    setChangeLocation(state, action) {
      state.company.company_address.logitude = action.payload.longitude;
      state.company.company_address.lagitude = action.payload.latitude;
    },
    setCompanyProfileImage(state, action) {
      state.company.company_profile_img.imageUrl = action.payload;
    },
    removeCompanyImage(state, action) {
      const ciid = action.payload.ciid;
      const newImages = state.company.company_imgs.filter((it) => {
        return it.ciid !== ciid;
      });
      state.company.company_imgs = newImages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(updateCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company.company_imgs = action.payload.urls;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(updateBackground.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBackground.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company.company_imgs.push(action.payload);
      })
      .addCase(updateBackground.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(removeImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        //state.company.company_imgs = action.payload.company_imgs;
      })
      .addCase(removeImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setName,
  setEmail,
  setTel,
  setCompanyPayments,
  setDescription,
  setAddress,
  setCompanyDelivery,
  setCompanyInfra,
  setLocationType,
  setChangeLocation,
  setCompanyProfileImage,
  removeCompanyImage,
  setCompanyProfile,
  addCompanyInfra,
  removeCompanyInfra,
  addCompanyDelivery,
  removeCompanyDelivery,
} = companySlice.actions;

export default companySlice.reducer;
