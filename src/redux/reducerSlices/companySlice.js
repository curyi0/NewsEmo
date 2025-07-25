import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = "http://localhost:8000/companies/search/"; //회사정보
const REVIEW_API_URL = "http://localhost:8000/reviews/create/"; //리뷰

//✅회사 정보 불러오기
export const fetchCompanies = createAsyncThunk( 
  "company/fetchCompanies",
  async (companyName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?name=${encodeURIComponent(companyName)}`);
      return response.data;
    } catch (error) {
      console.error("회사 데이터를 불러오는 중 오류 발생:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

//✅리뷰 보내기
export const submitReview = createAsyncThunk(
  "company/submitReview",
  async ({ companyName, userId, isAnonymous, content, timestamp }, { rejectWithValue }) => {
    try {
      const payload = {
        company_name: companyName,
        user_id: isAnonymous ? "익명" : userId,
        content,
        timestamp,
      };
      const response = await axios.post(REVIEW_API_URL, payload);
      return response.data;
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

//✅리뷰 목록 불러오기
export const fetchReviews = createAsyncThunk(
  "company/fetchReviews",
  async ({ companyName, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/reviews/?company_name=${encodeURIComponent(companyName)}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "리뷰 불러오기 실패");
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    data: [],       
    status: "idle", 
    error: null,
    companyName: '',

    reviewStatus: 'idle',
    reviewError: null,
    reviewMessage: '',
    
    reviews: [],
    currentPage: 1,
    hasNextPage: true,
  },
  reducers: {
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setCompanyData: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      //✅회사 정보 불러오기
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        if (action.payload.length === 0) {
          state.error = "검색 결과가 없습니다.";
        }
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "데이터 요청 실패";
      })
      //✅리뷰 보내기
      .addCase(submitReview.pending, (state) => {
        state.reviewStatus = "loading";
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviewStatus = "succeeded";
        state.reviewMessage = action.payload.message || "리뷰가 성공적으로 저장되었습니다.";
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.reviewStatus = "failed";
        state.reviewError = action.payload || "리뷰 저장 실패";
      })
      //✅리뷰 불러오기
      .addCase(fetchReviews.pending, (state) => {
        state.reviewStatus = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { results, next } = action.payload;
        state.reviews.push(...results); // 누적
        state.reviewStatus = "succeeded";
        state.currentPage += 1;
        state.hasNextPage = Boolean(next);
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviewStatus = "failed";
        state.reviewError = action.payload;
      });
      
    },
  });

export const { setCompanyName, setCompanyData } = companySlice.actions;
export default companySlice.reducer;
