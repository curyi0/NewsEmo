import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: "686e2f34dcaec1c747564197",
  로고: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/250px-Samsung_Logo.svg.png",
  형태: "대규모 기업집단",
  창립: "1938년 3월 1일(87년 전)",
  창립자: "이병철",
  산업_분야: "복합",
  본사_소재지: "대한민국",
  핵심_인물: "이재용 (총수)\n이부진 (호텔신라 대표이사 사장)\n이서현 (삼성물산 사장)",
  제품: "반도체, 전자제품, 통신기기, 선박, 해양생산설비, 보험, 증권, 자산운용, 패션, 리조트, 호텔 등",
  매출액: "386조 7377억 원 (2018년)",
  영업이익: "6,700,000,000 미국 달러 (2020)",
  순이익: "51조 9212억 원 (2018)",
  자산총액: "879조 1883억 원 (2018)",
  종업원_수: "590,000 (2014)",
  자회사: "본문 참조 + https://ko.wikipedia.org/wiki/삼성",
  summary: "...",
  name: "삼성전자",
  crawled_at: "2025-07-09T17:58:28.962+0000",
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    updateCompany: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateCompany } = companySlice.actions;
export default companySlice.reducer;
