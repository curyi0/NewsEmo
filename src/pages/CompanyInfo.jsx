
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../redux/reducerSlices/companySlice';
import { useNavigate } from 'react-router-dom';


const fieldLabel = {
  name: "기업명",
  로고: "로고",
  형태: "기업 형태",
  창립: "설립일자",
  창립자: "설립자",
  산업_분야: "산업 분야",
  본사_소재지: "본사 소재지",
  핵심_인물: "핵심 인물",
  제품: "주요 사업",
  매출액: "매출액",
  영업이익: "영업이익",
  순이익: "순이익",
  자산총액: "자산총액",
  종업원_수: "종업원 수",
  자회사: "자회사",
};

const fieldOrder = [
  "로고",
  "name",
  "형태",
  "창립",
  "창립자",
  "산업_분야",
  "본사_소재지",
  "핵심_인물",
  "제품",
  "매출액",
  "영업이익",
  "순이익",
  "자산총액",
  "종업원_수",
  "자회사",
];

const CompanyInfo = () => {
    
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const { companies, status, error, searchTerm } = useSelector((state) => state.companySearch);
    
 useEffect(() => {
 dispatch(fetchCompanies()); 
}, [dispatch]);

// 검색 결과 없을 때
  if (companies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            검색 결과가 없습니다
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm ? `"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.` : '검색어를 입력해주세요.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // const { searchResults, searchTerm } = location.state || {};
  // map 사용을 위한 객체 변환
  // const resultArray = Array.isArray(searchResults?.results) ? searchResults.results : [];
  // console.log("받은 데이터:", { searchResults, searchTerm });

  // const companyList = useSelector(state => state.company.list);
  // const status = useSelector(state => state.company.status);
  // const company = companyList[0];

  if (status === 'loading') return <div>불러오는 중...</div>;
  // if (!company) return <div>기업 정보가 없습니다.</div>;

  return (
      // < className="container mx-auto px-4 py-8">
    <>
      <h2>기업 정보</h2>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          검색 결과
        </h2>
        <p className="text-gray-600">
          "{searchTerm}"에 대한 검색 결과 {companies.length}개를 찾았습니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company, index) => (
          <div
            key={company._id || company.id || index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {company.name}
            </h3>
            <p>사이트:</p>
            <a href={company.웹사이트.startsWith('http') ? company.웹사이트 : `http://${company.웹사이트}`}
             target='_blank' rel='nooper noreferrer'>{company.웹사이트}</a>
            <h4>요약정보</h4>
            {company.summary && (
              <p className="text-gray-600 mt-2">{company.summary}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          새로운 검색
        </button>
      </div>
      {/* <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <tbody>
          {fieldOrder.map(field => (
            company[field] && (
              <tr key={field}>
                <th style={{ background: "#f5f5f5", textAlign: "right", whiteSpace: "nowrap" }}>
                  {fieldLabel[field]}
                </th>
                <td>
                  {field === "로고" ? (
                    <img src={company[field]} alt="로고" style={{ maxHeight: 40 }} />
                  ) : field === "자회사" && company[field].includes("http") ? (
                    <>
                      {company[field].replace(/\n/g, ", ").replace(/https?:\/\/[^\s]+/, "")}
                      <br />
                      <a href={company[field].match(/https?:\/\/[^\s]+/)[0]} target="_blank" rel="noopener noreferrer">
                        자회사 더보기
                      </a>
                    </>
                  ) : (
                    (company[field] + "").split("\n").map((line, i) => <div key={i}>{line}</div>)
                  )}
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default CompanyInfo;
