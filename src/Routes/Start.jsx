import Wordcloud from "react-d3-cloud"
import Ranking from "../components/Ranking"
import React from 'react';

import { Carousel } from 'react-bootstrap';
import kakaoImg from '../images/kakao.png';
import kiaImg from '../images/kia.png';
import samsungImg from '../images/samsung.png';
import '../CSS/carousel.css';


const words = [
  { text: '카카오', value: 200 },
  { text: 'Google', value: 80 },
  { text: '네이버', value: 40 },
  { text: 'Amazon', value: 60 },
  { text: 'Samsung', value: 55 }, 
  { text: 'sns', value: 40 },
  { text: '롯데', value: 80 },
  { text: 'yahoo', value: 80 },
  { text: '다음', value: 40 },
]

const Start= () => {
  
  const CompanyLists = ()=>(
    <section>
      <h4 className="text-xl font-bold mb-6" >기업 분류 목록</h4>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyCompanies.map((company) => (
          <div
            key={company.id}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
            <button  className="text-gray-600">카테고리: {company.category}</button>
          </div>
        ))}
      </div> */}


    </section>
    
  )
  
  const GraphSection = () => (
    <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">그래프</h2>
      {/* <h3 className="text-lg font-semibold mb-4">키워드 분포</h3> */}
      <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
        {/* 향후 그래프 라이브러리로 교체  chart.js, 파이썬 시각화 api*/}
        <div style={{ width: '100%', height: '400px', marginTop: '0px' ,marginBottom: '10px', paddingBottom: '10px' }}>
          <h3>키워드 클라우드</h3>
          <Wordcloud 
            data={words}
            width={400}
            height={200}
            font="Impact"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={(word) => Math.log2(word.value) * 3}
            spiral="archimedean"
            rotate={(word) => word.value % 360}
            padding={0}
            margin={0}
            random={Math.random}
          />
        </div>
      </div>
    </section>
  );
  
  function ImageSlider() {
    const images = [
      { src: kakaoImg, alt: '카카오' },
      { src: kiaImg, alt: '기아' },
      { src: samsungImg, alt: '삼성' },
    ];

    return (
      <div className="my-12">
        <h2 className="text-xl font-bold text-left mb-4">주요 기업 소식( 최근 이슈 기업)</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  {/* ▼▼▼ 이미지 크기 제어를 위한 컨테이너 div 추가 ▼▼▼ */}
                  <div
                    style={{
                      height: '250px', // 1. 슬라이더의 높이를 원하는 크기로 지정 (예: 300px)
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa', // 2. 이미지 주변에 보일 배경색
                    }}
                  >
                    <img
                      className="d-block" // w-100 클래스는 제거합니다.
                      style={{
                        maxHeight: '80%', // 3. 컨테이너 높이의 80%를 최대 높이로 설정
                        maxWidth: '80%',  // 4. 컨테이너 너비의 80%를 최대 너비로 설정
                        objectFit: 'contain', // 5. 이미지가 잘리거나 찌그러지지 않고 안에 모두 표시
                      }}
                      src={image.src}
                      alt={image.alt}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2>메인</h2>
      <Ranking/>
      <CompanyLists/>
      <ImageSlider/>
      
      {/* <GraphSection/> */}
    </>
  )
}

export default Start;
