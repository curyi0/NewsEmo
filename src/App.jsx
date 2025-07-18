import React, { useCallback, useMemo, useState } from "react";

import "./App.css";
import Main from "./Routes/Start";
// import PageA from "./Routes/PageA";
import Infos from "./Routes/Info";
import Semi from "./Routes/Semi";
import Register from "./Routes/Register";
import Header from "./Routes/Header";
import Footer from "./Routes/Footer";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CompanyInfo from "./pages/CompanyInfo";
import MentionPage from "./pages/MentionPage";
import Reputation from "./pages/Reputation";
import AssociationPage from './pages/AssociationPage';
import RankingTest from './components/RankingTest'

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {setSearchTerm, fetchCompaniesByName} from './redux/reducerSlices/compSearchSlice'

const SearchBar = React.memo(({ searchTerm, setSearchTerm, onSubmit, loading }) => {
  return (
    <div className="search-bar-wrapper">
      <form onSubmit={onSubmit} className="search-form">
        <input
          type="text"
          placeholder="회사명 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
  
  //검색창에 사용할 state
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [company, setCompany] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  
  // const [searchError, setSearchError] = useState("");
  // const [hasSearched, setHasSearched] = useState(false);
  // const memoz= useMemo(()=>company, [company])
  // Tailwind icon = 이모티콘?
  // const navItems = [
    //   { id: "Home", label: "Home", icon: Home },
    //   { id: "pageA", label: "PageA", icon: FileText },
    //   { id: "Info", label: "Info", icon: Info },
    //   { id: "Semi", label: "상세", icon: BarChart3 },
    // ];
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const {searchTerm, companies, status, error}= useSelector( (state) => state.companySearch
    );
    // 로그인 페이지 이동
    const toLogin = () => {
      navigate("/Login");
    };
    const toRegister = () => {
    navigate("/register");
  };

  const handleNavigation = (page) => {
    dispatch(setCurrentPage(page));
  };


//리덕스 전
//  const handleSearch = useCallback(async (searchTerm) => {
//     console.log("검색 시도");
//     setLoading(true);
//     setSearchError("");
//     setHasSearched(true);

//     try {
//       const response= await axios.get("http://localhost:8000/companies/search/",
//         {
//           params: {name: searchTerm.trim()},
//         }
//       )
//        console.log("검색결과:", response.data)
//        setCompany(response.data);
//        console.log("state변경후",company)
//         navigate("/PageA", {
//           state: {
//             searchResults: response.data,
//             searchTerm: searchTerm.trim(),
//           },
//         });

//     } catch (error) {
//        console.log("검색중..오류",error)
//        setSearchError("검색실패,, 다시 시도부탁")
//        setCompany([]);

//         if (error.response) {
//         // 서버 응답 에러
//         setSearchError(`서버 오류: ${error.response.status}`);
//       } else if (error.request) {
//         // 네트워크 에러
//         setSearchError("네트워크 연결을 확인해 주세요.");
//       } else {
//         // 기타 에러
//         setSearchError("알 수 없는 오류가 발생했습니다.");
//       }
//     }  finally{
//       setLoading(false)
//     } }, [navigate])

  

  const handleSubmit = (e)=>{
  // useCallback((e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // handleSearch(searchTerm.trim());
      dispatch(fetchCompaniesByName(searchTerm.trim()))
      // navigate("/Semi")
      navigate("/Semi/company")
    }}
 

  // 구역별 표시
  // const Content = () => {
  //   switch (currentPage) {
  //     case "/":
  //       return <Main />;
  //     case "pageA":
  //       return <PageA />;
  //     case "Info":
  //       return <Infos />;
  //     case "semi":
  //       return <Semi />;
  //     default: //
  //       return (
  //         <div className="text-center py-20">
  //           <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
  //         </div>
  //       );
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        toLogin={toLogin}
        toRegister={toRegister}
        handleNavigation={handleNavigation}
        // SearchBar={SearchBar}
        // Content={Content}
      />
      <RankingTest></RankingTest>
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          {location.pathname === "/"&& (

            <SearchBar
            searchTerm={searchTerm}
            // setSearchTerm={setSearchTerm}
            setSearchTerm={(term)=> dispatch(setSearchTerm(term))}
            onSubmit={handleSubmit}
            // loading={loading}
            ></SearchBar>
          )}

          {/* 각 페이지 라우팅 */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Home" />
            {/* <Route path="/PageA" element={<PageA />} /> */}
            <Route path="/info" element={<Infos />} />

            <Route path="register" element={<Register />} />
            {/* 상세페이지 */}
            <Route path="/semi/*" element={<Semi />}>
              {/* 기본 페이지 리디렉션 */}
              <Route index element={<Navigate to="company" replace />} />

              <Route path="mention" element={<MentionPage />} />
              <Route path="company" element={<CompanyInfo />} />
              <Route path="reputation" element={<Reputation />} />
              <Route path="association" element={<AssociationPage />} />
                          </Route>
          </Routes>

          {/* 나중에 들어올 칸 구역 추가    */}

          

          {/* Main Content */}
          {/* {renderContent()} */}
          {/* {location.pathname === '/' && (
                // <SearchResults />
              )} */}
        </div>

        
          {/* <CompanyRanking /> */}

        
        {/* {company && company.length > 0 ? (
          <div className="space-y-4 mt-6">
            {company.map((company, index) => (
              <div
                key={company._id || index}
                className="p-4 border rounded-md bg-white shadow-sm"
              >
                <h3 className="text-xl font-semibold">{company.name}</h3>
              </div>
            ))}
          </div>
        ) : hasSearched ? (
          <p className="mt-6 text-gray-500">검색된 기업이 없습니다.</p>
        ) : null} */}
      </main>

      <Footer />
    </div>
  );
};
export default App;
