import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays } from 'lucide-react';

const categories = [
  '정치', '경제', '사회', '문화', '국제', '지역',
  '스포츠', 'IT_과학', '범죄', '사고', '재해'
];

const MentionTopCard = ({ maxDate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null);

  // ✅ 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ 체크박스 상태 토글
  const handleCheckboxChange = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // ✅ 적용 버튼 클릭 핸들러
  const handleApply = () => {
    console.log('선택된 카테고리:', selected);
    setDropdownOpen(false);
    // 여기에 선택된 카테고리를 적용하는 로직을 추가할 수 있습니다
  };

  const cardItems = [
    {
      icon: null,
      title: '',
      subtitle: '',
      color: ''
    },
    {
      icon: <CalendarDays size={28} color="#5845ea" />,
      title: maxDate || '날짜',
      subtitle: '언급량이 가장 많았던 날',
      color: '#5845ea'
    },
    {
      icon: null,
      title: '',
      subtitle: '',
      color: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" style={{ gridTemplateColumns: '1fr 2fr 2fr' }}>
      {cardItems.map((item, idx) => (
        <div
          key={idx}
          className={idx === 0 ? "flex items-center justify-center" : "relative flex items-center justify-center rounded-2xl border border-gray-100 bg-white py-2 pl-3 pr-3 dark:border-gray-800 dark:bg-white/[0.03] xl:pr-4"}
        >
          {idx === 0 ? (
            <div className="relative flex flex-col items-center w-full" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="
                  bg-[#fbeee0]
                  border-2 border-[#422800]
                  rounded-full
                  shadow-[4px_4px_0_0_#422800]
                  text-[#422800]
                  font-semibold
                  text-sm
                  px-4 py-2
                  hover:bg-white
                  active:shadow-[2px_2px_0_0_#422800]
                  active:translate-x-[2px]
                  active:translate-y-[2px]
                  transition
                  select-none
                "
              >
                카테고리 선택
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-12 z-20 w-max bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg pt-4 px-4 pb-1.5">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {categories.map((category, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-1 text-xs text-gray-800 dark:text-white cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(category)}
                          onChange={() => handleCheckboxChange(category)}
                          className="w-4 h-4 dark:border-white/20 transition-all duration-300 ease-in-out"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-center pt-1 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleApply}
                      className="w-24 h-8 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      <span className="font-medium text-[#333] group-hover:text-white text-xs">적용</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="text-center">
                <h4
                  className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h4>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </div>
              <div className="absolute left-3">{item.icon}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MentionTopCard;
