import React, { useState } from 'react';
// ```   기업 목록 페이지 



// 더미 데이터 생성 (총 50개 항목)
const data = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);

function Info() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 현재 페이지에 해당하는 데이터 계산
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 페이지 변경 함수
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
          <div key={index} className="list-item">{item}</div>
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
