import React from 'react';
import MentionTrendCard from '../components/MentionTrendCard'
import MentionChannelCard from '../components/MentionChannelCard';
import { Row, Col } from 'antd';

const MentionPage = () => {
  const dummyItems = [
    {
      icon: 'https://via.placeholder.com/20', // 아이콘 이미지
      title: '샘플 제목 <strong>강조</strong>',
      text: '본문 내용 일부 <em>이탤릭</em>',
      url: 'https://example.com',
    },
    {
      icon: 'https://via.placeholder.com/20',
      title: '다른 기사 제목',
      text: '다른 기사 내용',
      url: 'https://example.com/2',
    },
  ];

  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <MentionTrendCard />
      </Col>
      <Col xs={24} md={12}>
        <MentionChannelCard
          keyword="삼성전자"
          period="2025-06-09 ~ 2025-06-13"
          totalCount={1000}
          viewCount={500}
          items={dummyItems}
        />
      </Col>
    </Row>
  );
};

export default MentionPage;
