import './App.css'
import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Main from "./Routes/Start";
// import PageA from "./Routes/PageA";
import Info from "./Routes/Info";
import Semi from './Routes/Semi';
import Register from "./Routes/Register";
import CompanyInfo from './pages/CompanyInfo';
import MentionPage from './pages/MentionPage';
import Reputation from './pages/Reputation';
import AssociationPage from './pages/AssociationPage';
import MyPage from './pages/MyPage';
import { useDispatch, useSelector } from "react-redux";
import Header from './Routes/Header';
import Footer from './Routes/Footer';
import { fetchCompaniesByName, setSearchTerm } from './redux/reducerSlices/companySearchSlice';
import { Checkbox, Radio } from 'antd';
import ChatBot from '../src/ChatBot'
// import './CSS/Header.css'


// SearchBar 정의 부분
const SearchBar = React.memo(({ searchTerm, setSearchTerm, onSubmit, loading, searchType, setSearchType }) => { // (A) 여기서 받는 props는 onSubmit, loading, navigate 뿐입니다.
  // console.log("임포트확인:" ,setSearchTerm)

  return (
    <div className="search-bar-wrapper">
      {/* 라디오 버튼 추가 */}
      <Radio.Group
        value={searchType}
        onChange={e => setSearchType(e.target.value)}
        style={{ marginBottom: 8 }}
      >
        <Radio value="name">기업이름</Radio>
        <Radio value="type">분야</Radio>
      </Radio.Group>

      <form onSubmit={onSubmit} className="search-form">
        <input
          type="text"
          placeholder="회사명 입력하세요..."
          value={searchTerm} // (B) 이 searchTerm은 props가 아니라 App의 변수를 직접 사용하고 있습니다.
          onChange={(e) => setSearchTerm(e.target.value)} // (C) 이 setSearchTerm은 어디에도 정의되지 않은 변수라 에러가 발생합니다!
          disabled={loading}
          className="search-input"
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading}
        >
          {loading ? "검색중..." : "검색"}
        </button>
      </form>
    </div>
  );
});

const App = () => {
  const [currentPage, setCurrentPage] = useState("");

  // const [loading, setLoading] = useState(false);
  // const [company, setCompany] = useState([]);
  const [searchTerm, setSearchTerms] = useState("");
  const [searchType, setSearchType] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()


  // const toLogin = () => {
  //   navigate("/Login");
  // };

  const toRegister = () => {
    navigate("/register");
  };

  const handleNavigation = (page) => {
    dispatch(setCurrentPage(page));
  };

  //  const handleSearch = (e) => {
  //   e.preventDefault()
  //   if (!searchTerm.trim()) return;
  //   // dispatch(fetchCompaniesByName(inputValue));
  // };

  const handleSubmit = (e) => {
    // useCallback((e) => {
    e.preventDefault();
    // if (searchTerm.trim()) 
    //   dispatch(setSearchTerm(searchTerm)); // 가져옴
    //   // (searchTerm.trim());
    //   dispatch(fetchCompaniesByName(searchTerm.trim()))   // 검색어 찾기
    // navigate("/Semi")

    if (!searchTerm.trim()) return;

    dispatch(setSearchTerm(searchTerm));
    if (searchType === "name") {
      dispatch(fetchCompaniesByName(searchTerm.trim()));
    } else if (searchType === "type") {
      // 분야로 검색하는 액션을 따로 만들어서 dispatch
      dispatch(fetchCompaniesByType(searchTerm.trim()));
    }
    navigate("/Semi/company")

  }



  return (
    <div >
      <Header
        // toLogin={toLogin}
        toRegister={toRegister}
        handleNavigation={handleNavigation}
      // navigate={navigate}
      // SearchBar={SearchBar}
      // Content={Content}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow pb-32">
        <div className='main-bg'>
          <h1> 이미지 넣을 공간</h1>
        </div>
        <div className='flex-grow'>
          {location.pathname === "/" && (
            <SearchBar
              searchTerm={searchTerm} // `searchTerm` prop을 전달했지만
              setSearchTerm={setSearchTerms} // 
              searchType={searchType}
              setSearchType={setSearchType}
              onSubmit={handleSubmit} // `onSubmit` prop은 (A)에서 잘 받고 사용합니다.
            ></SearchBar>
          )}
          <ChatBot />


          {/* 각 페이지 라우팅 */}
          <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route path="/pageA" element={<PageA />} /> */}
            <Route path="/info" element={<Info />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/register" element={<Register />} />
            {/* 상세페이지 */}
            <Route path="/semi/*" element={<Semi />}>
              {/* 기본 페이지 리디렉션 */}
              <Route index element={<Navigate to="mention" replace />} />
              <Route path="mention" element={<MentionPage />} />
              <Route path="company" element={<CompanyInfo />} />
              <Route path="reputation" element={<Reputation />} />
              <Route path="association" element={<AssociationPage />} />
            </Route>
          </Routes>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App
