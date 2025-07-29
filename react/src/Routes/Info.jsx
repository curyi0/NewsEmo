import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../redux/reducerSlices/companySlice';
import { Link } from 'react-router-dom'; // 추가

// 더미 데이터 생성 (총 50개 항목)
// const data = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);




function Info( {companyList}) {
  const dispatch= useDispatch()
  const { list: companies, status}=  useSelector( state=> state.company)

  useEffect( ()=>{
    dispatch( fetchCompanies("ㅋㅋㅇ"))
  }, [dispatch]
  // if (companyList) {
    //   dispatch( fetchCompanies(companyList))
    //   }
    // }  , [dispatch, companyList]
  )
  console.log("기업 데이터 ", companyList)
    if (status === "loading") return <div>로딩중...</div>;
    if (status === "failed") return <div>에러 발생</div>;
    if (!companies || companies.length === 0) return <div>데이터 없음</div>;



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;  // 출력할  리스트 양

   // 페이지별 데이터 슬라이싱
   const startPage = (currentPage - 1) * itemsPerPage;
   const endPage = startPage + itemsPerPage;
   const currentItems = list.slice(startPage, endPage);
 
  // 첫 페이지에만 데이터, 그 외는 빈 배열
  // const currentItems = currentPage === 1
  //   ? list.slice(0, itemsPerPage)
  //   : [];

  // 총 페이지 수 계산 (여전히 5페이지로 표시됨)
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // 페이지 변경 함수  [ 현페이지와 비교하여 ]
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>페이징</h1>
      
      {/* 리스트 */}
      <div className="list-container">
        {currentItems.map((item, index) => (
          <Link
            key={index}
            to={`/info/${item.id || index + 1}`} // 상세페이지로 이동 (1~10)
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="list-item">{item["기업명"] || item.name}</div>
          </Link>
        ))}
      </div>
      
      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}

export default Info;
