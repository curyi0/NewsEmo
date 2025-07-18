import {PieChart,} from "lucide-react";
import { Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import Wordcloud from "react-wordcloud"
const dummyCompanies = [
  { id: 2, category: "자동차", name: "현대자동차" },
  // { id: 3, category: "인터넷", name: "네이버" },
  { id: 4, category: "금융", name: "국민은행" },
  // { id: 5, category: "통신", name: "SK텔레콤" },
  // { id: 6, category: "제조", name: "LG전자" },
];
const words = [
  { text: '카카오', value: 200 },
  { text: 'Google', value: 80 },
  { text: '네이버', value: 40 },
  { text: 'Amazon', value: 60 },
  { text: 'Samsung', value: 55 }, 
  
  { text: 'sns', value: 40 },
  { text: '롯데', value: 80 },
  { text: 'yahoo', value: 80 },
  { text: ' 다음', value: 40 },
]
const Start= () => {
  
  const CompanyLists = ()=>(
    <section>
      <h2 className="text-xl font-bold mb-6">기업 분류 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyCompanies.map((company, index) => (
          <div
            key={company.id}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
            <button  className="text-gray-600">카테고리: {company.category}</button>
          </div>
        ))}
      </div>
    </section>
  )
  const GraphSection = () => (
    <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">그래프</h2>
      <h3 className="text-lg font-semibold mb-4">키워드 분포</h3>
      <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
        {/* 향후 그래프 라이브러리로 교체  chart.js, 파이썬 시각화 api*/}
        <div style={{ width: '100%', height: '500px', marginTop: '50px' }}>
      <h2>키워드 클라우드</h2>
      <Wordcloud words={words} 
      options={{
      rotations: 2,
      rotationAngles: [-90, 0],
      fontFamily: 'Impact',
      color: 'random-dark',
      backgroundColor: '#f4f4f4',
  }}
      />
    </div>
      </div>
    </section>
  );
  return (    <>
      <h2>메인</h2>

         <CompanyLists/>
            <GraphSection/>
     

    </>  )
}

export default Start;
