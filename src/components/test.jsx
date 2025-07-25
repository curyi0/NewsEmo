import React, { useState } from 'react';
import axios from 'axios';
import ReviewTest from './ReviewTest';

const CompanyList = () => {
  const [company, setCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const API_BASE_URL = 'http://localhost:8000';

  // 검색 누르면 실행하는 함수
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/companies/search/`, {
        params: { name: searchTerm }
      });
      
      console.log('검색 응답:', response.data);
      
      if (response.data && response.data.name) {
        setCompany(response.data);
        console.log('설정된 company:', response.data);
        
        const response2 = await axios.post(`${API_BASE_URL}/review/analyze/`, {
          name: searchTerm
        });
        setReview(response2.data);
      } else {
        setCompany(null);
        setReview(null);
      }
      
    } catch (err) {
      console.error('검색 중 오류 발생:', err);
      
      setCompany(null);
      setReview(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>기업 정보 테스트</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="회사 이름을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? '검색 중...' : '검색'}
        </button>
      </form>

      {loading && <p>로딩 중...</p>}

      <div>
        {company && (
          <>
            <h3>{company.name}</h3>
            <ul>
              {company.창립 && <li>창립: {company.창립}</li>}
              {company.산업_분야 && <li>산업 분야: {company.산업_분야}</li>}
              {company.본사_소재지 && <li>본사: {company.본사_소재지}</li>}
              {company.핵심_인물 && <li>핵심 인물: {company.핵심_인물}</li>}
              {company.제품 && <li>제품: {company.제품}</li>}
              {company.매출액 && <li>매출액: {company.매출액}</li>}
              {company.영업이익 && <li>영업이익: {company.영업이익}</li>}
              {company.순이익 && <li>순이익: {company.순이익}</li>}
              {company.종업원_수 && <li>종업원 수: {company.종업원_수}</li>}
              {company.웹사이트 && <li>웹사이트: {company.웹사이트}</li>}
              {company.summary && (
                <li>
                  <strong>요약:</strong>
                  <div>{company.summary}</div>
                </li>
              )}
            </ul>
          </>
        )}

        {!loading && !company && (
          <p>표시할 데이터가 없습니다.</p>
        )}
      </div>

      {company && review && (
        <ReviewTest data={{company: company, review: review}} />
      )}
    </div>
  );
};

export default CompanyList; 