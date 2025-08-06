// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

const PageA = () => {
    
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // App.js에서 전달받은 데이터
//   const { searchResults, searchTerm } = location.state || {};
//   // map 사용을 위한 객체 변환
//   const resultArray = Array.isArray(searchResults?.results) ? searchResults.results : [];

//   console.log("PageA에서 받은 데이터:", { searchResults, searchTerm });

//   // 검색 결과 없을 때
//   if (resultArray.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             검색 결과가 없습니다
//           </h2>
//           <p className="text-gray-600 mb-6">
//             {searchTerm ? `"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.` : '검색어를 입력해주세요.'}
//           </p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//           >
//             홈으로 돌아가기
//           </button>
//         </div>
//       </div>
//     );
//   }

  return (
    <section className="max-w-8xl mx-auto p-6 bg-white rounded-lg shadow">
  <h2 className="text-2xl font-semibold mb-4">감정 분석 후속 대책 서비스 신청</h2>
  
  <form className="space-y-10">
    {/* 이름, 이메일, 회사명 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input className="input" placeholder="이름" />
      <input className="input" placeholder="이메일" />
      <input className="input" placeholder="회사명" />
    </div>

    {/* 후속 조치 목적 */}
    <textarea className="input h-1 max-w-6xl"
     placeholder="후속 대책 요청 목적을 적어주세요 (예: 사내 갈등 해소 등)" />

    {/* 업로드 */}
    <div>
      <label className="block text-sm mb-1">분석 리포트 파일 (선택)</label>
      <input type="file" className="input" />
    </div>

    {/* 희망 방식 */}
    <select className="input">
      <option>희망 상담 방식 선택</option>
      <option>이메일 보고서</option>
      <option>온라인 미팅</option>
      <option>오프라인 컨설팅</option>
    </select>

    {/* 동의 체크 */}
    <div className="flex items-start space-x-2">
      <input type="checkbox" className="mt-1" />
      <p className="text-sm">
        개인정보 수집 및 이용에 동의합니다.
      </p>
    </div>

    {/* 제출 버튼 */}
    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md">
      신청하기
    </button>
  </form>
</section>

//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           검색 결과
//         </h2>
//         <p className="text-gray-600">
//           "{searchTerm}"에 대한 검색 결과 {resultArray.length}개를 찾았습니다.
//         </p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {resultArray.map((company, index) => (
//           <div
//             key={company._id || company.id || index}
//             className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//           >
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               {company.name}
//             </h3>
//             <h4>요약정보</h4>
//             {company.summary && (
//               <p className="text-gray-600 mt-2">{company.summary}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 text-center">
//         <button
//           onClick={() => navigate('/')}
//           className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
//         >
//           새로운 검색
//         </button>
//       </div>
//     </div>
  );
};

export default PageA;
