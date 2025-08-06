import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Ranking = () => {
  const [ranking, setRanking] = useState({})
  const [year, setYear] = useState(2024)
  const [loading, setLoading] = useState(false)
  // const [activeSlide,setActiveSlide]=useState(0)
  const API_BASE_URL = 'http://localhost:8000'


  const slideSubs = ['매출액', '영업이익', "순이익"]
  const [slideIndexes, setSlideIndexes] = useState({
    '매출액': 0,
    '영업이익': 0,
    '순이익': 0
  });

  // 자동 슬라이드   4초마다 자동넘김
  useEffect(() => {
    const pass = setInterval(() => {
      // setActiveSlide((prev) => (prev + 1) % slideSubs.length);  
      setSlideIndexes(prev => {
        const updated = { ...prev };
        slideSubs.forEach((sub) => {
          const listLength = ranking[sub]?.length || 0;
          const slideLength = Math.max(listLength - 1, 1); // 1위 제외
          updated[sub] = (prev[sub] + 1) % slideLength;
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(pass);
  }, [ranking]);


  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/api/companies/ranking/?year=${year}`)
        // const response = await axios.get(`${API_BASE_URL}/api/companies/ranking/?year=${year}`)
        console.log('API 응답:', response.data)
        setRanking(response.data)
      } catch (error) {
        console.error('API 호출 오류:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRanking()
  }, [year])

  const formatAmount = (amount) => {
    if (amount >= 1000000000000) {
      return `${(amount / 1000000000000).toFixed(1)}조원`
    } else if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(1)}만원`
    } else {
      return `${amount}원`
    }
  }


  // const current= slideSubs[activeSlide]
  // const currentRanks= ranking[current]?.slice(0,5) || []  //5개 추리기

  return (
    <div style={{ paddingLeft: '50px', justifyContent: 'center' }}>
      <h4>기업 재무 랭킹</h4>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setYear(2022)}>2022</button>
        <button onClick={() => setYear(2023)}>2023</button>
        <button onClick={() => setYear(2024)}>2024</button>
      </div>

      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* 매출액 랭킹 */}

          {slideSubs.map((category) => {
            const companies = ranking[category] || [];
            const top1 = companies[0];
            const rest = companies.slice(1);
            const index = slideIndexes[category] || 0;

            return (
              // <div key={category} style={{ flex: 1 }}>
              <div
                key={category}
                style={{
                  flex: 1,
                  background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                  borderRadius: '18px',
                  padding: '20px',
                  boxShadow: '0 10px 18px rgba(0,0,0,0.06)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.boxShadow = '0 14px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 18px rgba(0,0,0,0.06)';
                }}
              >

                <h2>{category} </h2>

                {/* 고정된 1위 */}
                {/* {top1 && (
                  <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                    🥇 <strong>{top1.name?.replace(/[^\p{L}\s]/gu, "")}</strong><br />
                    <span style={{ color: '#666' }}>{formatAmount(top1.amount)}</span>
                  </div>
                )} */}
                {top1 && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
                    padding: '14px',
                    borderRadius: '10px',
                    marginBottom: '12px',
                    color: '#222',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                >
                  🥇 <strong>{top1.name?.replace(/[^\p{L}\s]/gu, "")}</strong><br />
                  <span style={{ color: '#444' }}>{formatAmount(top1.amount)}</span>
                </div>
                )}
                {/* <div style={{ height: '50px', overflow: 'hidden', position: 'relative' }}> */}
                  {/* <div
                    style={{
                      transition: 'transform 0.5s ease-in-out',
                      transform: `translateY(-${index * 50}px)`
                    }}
                  > */}
                {/* 2~10순위까지 슬라이드됨 */}
                {/* {rest.slice(0, 9).map((company, i) => (
                      <div key={i} style={{ height: '50px' }}>
                        {i + 2}위: <strong>{company.name.replace(/[^\p{L}\s]/gu, "")}</strong><br />
                        <span style={{ color: '#888' }}>{formatAmount(company.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div style={{ height: '50px', overflow: 'hidden', position: 'relative' }}>
                  <div
                    style={{
                      transition: 'transform 0.5s ease-in-out',
                      transform: `translateY(-${index * 50}px)`
                    }}
                  >
                    {rest.slice(0, 9).map((company, i) => (
                      <div
                        key={i}
                        style={{
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          paddingLeft: '6px',
                          borderRadius: '8px',
                          background: i % 2 === 0 ? '#f9f9f9' : '#f1f1f1',
                          transition: 'background 0.3s'
                        }}
                      >
                        {i + 2}위: <strong>{company.name.replace(/[^\p{L}\s]/gu, "")}</strong>
                        <span style={{ color: '#888' }}>{formatAmount(company.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Ranking