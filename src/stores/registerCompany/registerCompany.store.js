import registerCompanyService from "../../service/registerCompanny/registerCompany.service";
import register, {
  Company_profile_img,
  Company_imgs,
} from "../../model/register.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerCompanny = createAsyncThunk(
  "/company/create",
  async (params, { rejectWithValue }) => {
    try {
      const resp = await registerCompanyService.registerCompany(params);
      console.log("params:", params);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "registerStore",
  initialState: {
    company_profile_img: { ...new Company_profile_img() },
    images_company: [],
    register: register,
    status: "idle",
    error: null,
  },
  reducers: {
    setName(state, action) {
      state.register.name = action.payload;
    },
    setEmail(state, action) {
      state.register.email = action.payload;
    },
    setTel(state, action) {
      state.register.tel = action.payload;
    },
    setCompanyProfileImg(state, action) {
      state.company_profile_img.image.imagesUrl = action.payload.uri;
    },
    setCompanyBackground(state, action) {
      console.log("55555 ", action.payload);
      const length = state.images_company.length;
      if (length === 0) state.images_company = action.payload;
      else state.images_company.push(...action.payload);
    },
    removeCompanyBackground(state, action) {
      state.images_company = state.images_company.filter((item, index) => {
        return index !== action.payload;
      });
    },

    setPayments(state, action) {
      state.register.company_payments = action.payload;
    },
    setDeliveries(state, action) {
      state.register.company_deliveries = action.payload;
      console.log("delivery", register.company_deliveries);
    },
    setInfras(state, action) {
      state.register.company_infras = action.payload;
    },
    setDescription(state, action) {
      state.register.company_infras = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerCompanny.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerCompanny.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.register = action.payload;
      })
      .addCase(registerCompanny.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setName,
  setEmail,
  setTel,
  setCompanyProfileImg,
  setCompanyBackground,
  setPayments,
  setDeliveries,
  setInfras,
  setDescription,
  removeCompanyBackground,
} = registerSlice.actions;

export default registerSlice.reducer;
