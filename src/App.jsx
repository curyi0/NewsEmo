import './App.css'
import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Main from "./Routes/Start";
import PageA from "./Routes/PageA";
import Info from "./Routes/Info";
import Semi from './Routes/Semi';
import Register from "./Routes/Register";
import CompanyInfo from './pages/CompanyInfo';
import MentionPage from './pages/MentionPage';
import Reputation from './pages/Reputation';
import AssociationPage from './pages/AssociationPage';
import CompareKeyword from './pages/CompareKeyword';
import MyPage from './pages/MyPage';
import { useDispatch } from "react-redux";
import Header from './Routes/Header';
import Footer from './Routes/Footer';
// import { fetchCompaniesByName, setSearchTerm, fetchCompaniesByType } from './redux/reducerSlices/companySearchSlice';
// import { Radio } from 'antd';

import ChatBot from './ChatBot'
// import './CSS/Search.css'
import Admin from './Admin';
import Inquiries from './Aside/Inquiries';
import Members from './Aside/Members';



const App = () => {
  const [currentPage, setCurrentPage] = useState("");

  // const [loading, setLoading] = useState(false);
  // const [company, setCompany] = useState([]);
  const [searchTerm, setSearchTerms] = useState("");
  const [searchType, setSearchType] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()



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

  // const handleSubmit = (e) => {
  //   // useCallback((e) => {
  //   e.preventDefault();
  //   // if (searchTerm.trim()) 
  //   //   dispatch(setSearchTerm(searchTerm)); // 가져옴
  //   //   // (searchTerm.trim());
  //   //   dispatch(fetchCompaniesByName(searchTerm.trim()))   // 검색어 찾기
  //   // navigate("/semi")

  //   if (!searchTerm.trim()) return;

  //   dispatch(setSearchTerm(searchTerm));
  //   // dispatch(setSearchType(searchType));

  //   if (searchType === "name") {
  //     dispatch(fetchCompaniesByName(searchTerm.trim()));
  //   }
  //   else if (searchType === "type") {
  //     // 분야로 검색하는 액션을 따로 만들어서 dispatch
  //     dispatch(fetchCompaniesByType(searchTerm.trim()));
  //   }
  //   // navigate("/semi/company")
  //   navigate("/info")

  // }


// {AdminMode ?(

// )}
  return (
    <div >
      <Header
        // toLogin={toLogin}
        toRegister={toRegister}
        handleNavigation={handleNavigation}
      />

      <main className="min-h bg-slate-200 max-w-7xl  px-4 sm:px-6 lg:px-4 py-3 flex-grow">
       
        {/* {location.pathname === "/" && (


          <SearchBar
            searchTerm={searchTerm} // `searchTerm` prop을 전달했지만
            setSearchTerm={setSearchTerms} // 
            searchType={searchType}
            setSearchType={setSearchType}
            onSubmit={handleSubmit} // `onSubmit` prop은 (A)에서 잘 받고 사용합니다.
          ></SearchBar>
        )} */}
        {/* <p className="text-xl md:text-2xl font-medium text-black  to-gray-800/60 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md max-w-2xl text-center leading-snug">
                <span className="font-bold text-black-200 mt- text-2xl">데이터</span>로 읽는&nbsp;
                <span className="text- font-semibold text-2xl">기업의 감정</span>,<br className="hidden md:inline" />
                &nbsp;
                <span className="text-purple-800 font-bold underline decoration-purple-400/70">인사이트</span>도 한 눈에,
              </p> */}


        {/* </div> */}
        <div className='flex-grow'>

          <ChatBot />


          {/* 각 페이지 라우팅 */}
          <Routes>
            <Route path="/" element={<Main />} />
            {/* 임시 관리자 페이지 */}
            <Route path="/pageA" element={<PageA />} />
            <Route path="/info" element={<Info />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/register" element={<Register />} />
            <Route path='/Admin/*' element={<Admin/>}>
              <Route path='inquiries' element={<Inquiries/>}></Route>
              <Route path='members' element={<Members/>}></Route>
            </Route>
            {/* 상세페이지 */}
            <Route path="/semi/*" element={<Semi />}>
              {/* 기본 페이지 리디렉션 */}
              <Route index element={<Navigate to="mention" replace />} />
              <Route path="mention" element={<MentionPage />} />
              <Route path="company/:id" element={<CompanyInfo />} />
              <Route path="reputation" element={<Reputation />} />
              <Route path="association" element={<AssociationPage />} />
              <Route path="comparekeyword" element={<CompareKeyword />} />
            </Route>
          </Routes>

        </div>
      </main>
      <Footer />
    </div>
  );
};


export default App