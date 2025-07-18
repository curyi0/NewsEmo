import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/plots';
import { useSelector } from 'react-redux';

const MentionTrendCard = () => {
  const company = useSelector(state => state.company);
  const data = [
    { date: '2025-06-09', value: 30 },
    { date: '2025-06-10', value: 40 },
    { date: '2025-06-11', value: 35 },
    { date: '2025-06-12', value: 65 },
    { date: '2025-06-13', value: 50 },
    // ...
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    smooth: true,
    height: 300,
    width: 600,
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      showTitle: false,
    },
  };

  return (
    <Card title="언급량 추이" style={{ width: 600 }}>
      <Line {...config} />
    </Card>
  );
};

export default MentionTrendCard;
