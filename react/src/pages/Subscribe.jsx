import React, { useState } from "react";

const features = [
  "프리미엄 리뷰 감정분석",
  "연관 키워드를 정치, 문화, 지역 등으로 상세 분류하여 더욱 풍성한 인사이트를 제공해요",
  "브랜드 키트 1,000개",
  "연관어 랭킹 TOP 15 제공",
  "연관어 카테고리 상세 분석",
  "기간별로 지난 기사들의 긍·부정률 분석",
];

const Subscribe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState('yearly'); // 추가: 요금제 상태

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8 space-y-5 border border-gray-200">
        {/* 타이틀 */}
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="animate-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            NEW
          </span>{" "}
          Pro
        </h2>

        {/* 설명 */}
        <p className="text-gray-600 leading-relaxed">
          소비자 경험 분석, 경쟁사/시장 동향 모니터링, 브랜드/서비스 전략 등
          빅데이터 분석이 필요한 팀
        </p>

        {/* 가격 */}
        <div className="text-xl font-bold text-gray-800">
          ₩99,000 <span className="text-sm text-gray-500">/월 (1인 기준)</span>
        </div>

        {/* 기능 목록 */}
        <ul className="space-y-3 text-sm text-gray-700 mt-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                className="text-green-500 mt-1 shrink-0"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m5.72 12.53-3.26-3.3c-.7-.72.36-1.77 1.06-1.06l2.73 2.77 6.35-6.35a.75.75 0 0 1 1.06 1.06l-6.88 6.88a.78.78 0 0 1-.5.23.83.83 0 0 1-.56-.23z" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA 버튼 */}
        <button
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded transition"
          onClick={() => setIsModalOpen(true)}
        >
          시작하기
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
  <div
    className="animate-fadeIn fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 상단 타이틀 */}
      <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Pro 무료 체험 시작
      </h3>

      {/* 서브 타이틀 */}
      <p className="text-gray-600 mb-6 text-center">
        30일 동안 모든 기능을 자유롭게 사용해보세요.
      </p>

      {/* 요금제 내용 (기존 PlanCard 내용 삽입) */}
      <div className="space-y-6">
        {/* 혜택 리스트 */}
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2">
            <svg className="text-green-500 mt-1" width="20" height="20" fill="currentColor">
              <path d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97a.78.78 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.07Z" />
            </svg>
            30일 무료 체험, 언제든지 취소할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <svg className="text-green-500 mt-1" width="20" height="20" fill="currentColor">
              <path d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97a.78.78 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.07Z" />
            </svg>
            무료 체험 종료 전 알림을 드립니다
          </li>
        </ul>

        {/* 요금제 선택 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <label className={`border ${plan === 'yearly' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer`}>
            <input
              type="radio"
              name="plan"
              checked={plan === 'yearly'}
              onChange={() => setPlan('yearly')}
              className="hidden"
            />
            <p className="text-sm font-semibold">연간 요금제</p>
            <p className="text-gray-500 text-sm">₩99,000 (₩8,250/월)</p>
            <p className="text-green-600 text-xs mt-1">최적가 - ₩19,800 절약</p>
          </label>
          <label className={`border ${plan === 'monthly' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer`}>
            <input
              type="radio"
              name="plan"
              checked={plan === 'monthly'}
              onChange={() => setPlan('monthly')}
              className="hidden"
            />
            <p className="text-sm font-semibold">월간 요금제</p>
            <p className="text-gray-500 text-sm">₩9,900</p>
          </label>
        </div>

        {/* 결제 요약 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>결제 기한</span>
            <span className="font-medium">2025년 9월 4일</span>
          </div>
          <div className="flex justify-between">
            <span>오늘 결제 금액</span>
            <span className="font-semibold text-green-600">₩0 (30일 무료 체험)</span>
          </div>
        </div>

        {/* 후기 */}
        <div className="flex gap-4 pt-6 border-t border-gray-100 mt-6">
          <img
            src="https://static.canva.com/web/images/c5440104e677b0e79538a07da6b89a90.png"
            alt="사용자 아바타"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">이원주</p>
            <p className="text-sm text-gray-600">애피켓마케팅연구소 대표</p>
            <p className="text-sm mt-2 text-gray-700">
              “Canva Pro의 이미지 편집 기능 중 배경제거기능은 디자인을 하는 사람들에게 아주 유용한 기능이라고 생각합니다...”
            </p>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Subscribe;
