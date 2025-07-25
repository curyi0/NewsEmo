import React from 'react';
import ReputationCard from '../components/ReputationCard';
import MentionChannelCard from '../components/MentionChannelCard';
import ReputationTopCard from '../components/ReputationTopCard';
import { Row, Col } from 'antd';
import ReputationRankCard from '../components/ReputationRankCard';

const Reputation = () => {
  // 대충 임시 데이터
  const dummyItems = [
    {
      icon: 'https://via.placeholder.com/20',
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
    <Row gutter={20}>
      <Col xs={24}>
        <div style={{ padding: 0, background: '#e3e3eeff', marginBottom: 20, 
            display: 'flex', alignItems: 'center'
          }}>
          <ReputationTopCard/>
        </div>
      </Col>

      <Col xs={24} md={10}>
        <ReputationCard />
      </Col>
      <Col xs={24} md={12}>
        <MentionChannelCard
          keyword="삼성전자"
          period="2025-06-09 ~ 2025-06-13"
          totalCount={1000}
          viewCount={500}
          items={dummyItems}
          height={534}
        />
      </Col>
      <Col xs={24} md={8}>
          <ReputationRankCard />
      </Col>
    </Row>
  );
};

export default Reputation;

