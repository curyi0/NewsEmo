// ChatbotButton.jsx
import React, { useState } from "react";
import "./CSS/ChatBot.css";

const categories = [
  { key: "company", label: "기업 정보" },
  { key: "news", label: "뉴스 분석" },
  { key: "service", label: "서비스 문의" },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);   //창 여닫음
  const [selectedCategory, setSelectedCategory] = useState(null);  // 문의사항 선택
  const [input, setInput] = useState("");
  //챗봇 반응
  const [messages, setMessages] = useState([   
    { from: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" }
  ]);

  // 대화 상태 초기화 함수
  const resetChat = () => {
    setSelectedCategory(null);
    setInput("");
    setMessages([
      { from: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" }
    ]);
  };

  // 닫기 버튼 클릭 시
  const handleClose = () => {
    if (window.confirm("정말 챗봇을 종료하시겠습니까? 대화 내용이 모두 사라집니다.")) {
      setOpen(false);
      resetChat();
    }
    // 취소 시 아무 동작 없음
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: `"${cat.label}" 관련 궁금한 점을 입력해 주세요.` }
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: input }
    ]);
    setInput("");
    // 실제 챗봇 응답 로직은 여기에 추가
  };

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setOpen((prev) => !prev)}
      >
        💬
      </button>
      {open && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span>EmoChat</span>

            <div>
            <button onClick={handleClose}  >✖</button>
            </div>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.from === "bot" ? "chatbot-msg-bot" : "chatbot-msg-user"}
              >
                {msg.text}
              </div>
            ))}
            {!selectedCategory && (
              <div className="chatbot-categories">
                <div style={{ margin: "12px 0 8px 0" }}>질문 카테고리를 선택해 주세요:</div>
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    className="chatbot-category-btn"
                    onClick={() => handleCategory(cat)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedCategory && (

            <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              />
            <button onClick={handleSend}>전송</button>
          </div>
            )}
        </div>
      )}
    </>
  );
};

export default Chatbot;