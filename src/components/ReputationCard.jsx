import React, { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";
import ReactWordcloud from "react-wordcloud";
import { motion, LayoutGroup } from "framer-motion";
import "../CSS/tabButton.css"; // 탭 스타일 재사용

const wordData = [
  { keyword: "기대", type: "긍정", count: 7346 },
  { keyword: "강세", type: "긍정", count: 4408 },
  { keyword: "우려", type: "부정", count: 1338 },
  { keyword: "긍정적", type: "긍정", count: 1079 },
  { keyword: "호조", type: "긍정", count: 911 },
  { keyword: "1위", type: "긍정", count: 823 },
  { keyword: "급등하다", type: "중립", count: 784 },
  { keyword: "최고", type: "긍정", count: 763 },
  { keyword: "급락", type: "부정", count: 741 },
  { keyword: "선호", type: "긍정", count: 567 },
  { keyword: "화해", type: "긍정", count: 864 },
  { keyword: "비판하다", type: "부정", count: 1081 },
  { keyword: "영향력", type: "중립", count: 1578 },
];

const typeColor = {
  긍정: "#5845ea",
  부정: "#f53933",
  중립: "#fbc400",
};

const columns = [
  {
    title: "단어",
    dataIndex: "keyword",
    key: "keyword",
  },
  {
    title: "긍·부정",
    dataIndex: "type",
    key: "type",
    render: (type) => <Tag color={typeColor[type]}>{type}</Tag>,
  },
  {
    title: "건수",
    dataIndex: "count",
    key: "count",
    align: "right",
  },
];

const ReputationCard = ({ onCalculateSummary }) => {
  const [viewMode, setViewMode] = useState("cloud");

  const tabs = [
    { id: "cloud", label: "워드맵" },
    { id: "table", label: "순위표" },
  ];

  useEffect(() => {
    const typeTotals = wordData.reduce(
      (acc, item) => {
        acc[item.type] += item.count;
        return acc;
      },
      { 긍정: 0, 부정: 0, 중립: 0 }
    );

    const totalCount = typeTotals.긍정 + typeTotals.부정 + typeTotals.중립;
    const entries = Object.entries(typeTotals);
    const [maxType, maxTypeCount] = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
    const maxPercentage = ((maxTypeCount / totalCount) * 100).toFixed(1);
    onCalculateSummary?.({ maxType, maxPercentage });
  }, [onCalculateSummary]);

  const cloudData = wordData.map((item) => ({
    text: item.keyword,
    value: item.count,
    type: item.type,
  }));

  const options = {
  rotations: 1,
  rotationAngles: [0, 0],
  fontSizes: [14, 48],
  fontFamily: "Pretendard",
  padding: 3,
  enableTooltip: true,
  deterministic: true,
  colors: cloudData.map((d) => typeColor[d.type]),
  tooltipOptions: {
    allowHTML: true,
  
  },
};
  return (
    <Card
      title="긍 · 부정"
      style={{
        width: "100%",
        maxWidth: 750,
        borderRadius: "20px",
      }}
      bodyStyle={{ padding: 0 }}
      extra={
        <LayoutGroup>
          <div className="trend-tab-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`trend-tab-button ${viewMode === tab.id ? "active" : ""}`}
              >
                <span className="tab-label">{tab.label}</span>
                {viewMode === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="trend-tab-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>
      }
    >
      {viewMode === "cloud" ? (
        <div style={{ width: "100%", height: 480 }}>
          <ReactWordcloud
            words={cloudData}
            options={options}
            callbacks={{
              getWordTooltip: (word) => `<span style="color: '#black'; font-weight: bold;">${word.value.toLocaleString()}건</span>`,
            }}
          />
        </div>
      ) : (
        <div style={{ maxHeight: 477, overflowY: "auto" }}>
          <Table
            columns={columns}
            dataSource={wordData}
            pagination={false}
            rowKey="keyword"
            size="small"
          />
        </div>
      )}
    </Card>
  );
};

export default ReputationCard;
