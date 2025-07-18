import { createSlice, createAsyncThunk } from "/node_modules/.vite/deps/@reduxjs_toolkit.js?v=27e8c257";
import axios from "/node_modules/.vite/deps/axios.js?v=27e8c257";

const API_URL = "http://localhost:8000/companies/search";

// ✅ createAsyncThunk로 비동기 액션 생성
export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("회사 데이터를 불러오는 중 오류 발생:", error);
      throw error;
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default companySlice.reducer;
