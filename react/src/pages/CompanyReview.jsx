import { Liquid } from '@ant-design/plots';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewAnalysis, clearAnalysisData } from '../redux/reducerSlices/reviewAnalysisSlice';
import { Spin, Alert, Card, Row, Col, Typography, Divider } from 'antd';

const { Title, Text, Paragraph } = Typography;

const CompanyReview = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get('company');
  
  const { analysisData, status, error } = useSelector((state) => state.reviewAnalysis);

  // 리뷰 분석 데이터 불러오기
  useEffect(() => {
    if (companyName) {
      dispatch(fetchReviewAnalysis(companyName));
    }
    
    // 컴포넌트 언마운트 시 데이터 초기화
    return () => {
      dispatch(clearAnalysisData());
    };
  }, [companyName, dispatch]);

  const config = {
    percent: 0.3,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
    width: 180,
    height: 180,
    // 가운데 정렬을 위한 설정
    appendPadding: [0, 0, 0, 0],
    autoFit: false,
    // 차트 컨테이너 스타일
    containerStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  };

  // 분석 데이터가 없을 때의 기본값
  const defaultSentiments = [
    { label: '긍정', percent: 0.6, color: '#52c41a' },
    { label: '부정', percent: 0.4, color: '#ff4d4f' },
  ];

  if (status === "loading") {
    return (
      <div className="p-6 bg-gray-50 flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50">
        <Alert message="분석 오류" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="p-6 bg-gray-50">
        <Title level={2} className="text-center mb-6">
          {companyName} 리뷰 분석
        </Title>
        <div className="flex justify-center gap-12">
          {defaultSentiments.map(({ label, percent, color }, index) => (
            <Card key={index} className="w-80 text-center">
              <Title level={4}>{label}</Title>
              <div className="flex justify-center">
                <Liquid {...{ ...config, percent }} />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {(percent * 100).toFixed(1)}%
              </div>
              <Text className="mt-4 block">분석 데이터 로딩 중...</Text>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 실제 분석 데이터 사용
  const { total_count, avg_score, pros, cons } = analysisData;
  
  // 긍정/부정 비율 계산 (중립 제거하고 긍정과 부정만 사용)
  const totalScore = (pros.avg_score || 0) + (cons.avg_score || 0);
  const positiveRatio = totalScore > 0 ? parseFloat(((pros.avg_score / totalScore) * 10).toFixed(1)) / 10 : 0.6;
  const negativeRatio = totalScore > 0 ? parseFloat(((cons.avg_score / totalScore) * 10).toFixed(1)) / 10 : 0.4;

  const sentiments = [
    { 
      label: '긍정', 
      percent: positiveRatio, 
      color: '#52c41a',
      keywords: pros.keywords?.slice(0, 3) || [],
      sampleReviews: pros.sample_reviews?.slice(0, 2) || []
    },
    { 
      label: '부정', 
      percent: negativeRatio, 
      color: '#ff4d4f',
      keywords: cons.keywords?.slice(0, 3) || [],
      sampleReviews: cons.sample_reviews?.slice(0, 2) || []
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F4] p-1">
      <Title level={2} className="text-center mb-6">
        {companyName} 리뷰 분석 결과
      </Title>
      
      {/* 전체 통계 */}
      <Card className="mb-6">
        <Row gutter={16}>
          <Col span={8}>
            <div className="text-center">
              <Title level={4}>총 리뷰 수</Title>
              <Text className="text-2xl font-bold">{total_count}개</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="text-center">
              <Title level={4}>평균 만족도</Title>
              <Text className="text-2xl font-bold">{avg_score.toFixed(1)}점</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="text-center">
              <Title level={4}>분석 완료</Title>
              <Text className="text-2xl font-bold text-green-500">✓</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 감정 분석 차트 */}
      <div className="flex justify-center gap-12 mb-8">
        {sentiments.map(({ label, percent, color, keywords, sampleReviews }, index) => (
          <Card key={index} className="w-80 text-center">
            <Title level={4} style={{ color }}>{label}</Title>
            <div className="flex justify-center">
              <Liquid {...{ ...config, percent }} />
            </div>
            
            {/* 키워드 */}
            {keywords.length > 0 && (
              <div className="mt-4 text-center">
                <Text strong>주요 키워드:</Text>
                <div className="flex flex-wrap gap-1 mt-1 justify-center">
                  {keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {kw.keyword} ({kw.frequency})
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* 샘플 리뷰 */}
            {sampleReviews.length > 0 && (
              <div className="mt-4 text-center">
                <Text strong>대표 리뷰:</Text>
                {sampleReviews.map((review, i) => (
                  <div key={i} className="mt-2 p-2 bg-gray-50 rounded text-xs">
                    "{review.review}"
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* 상세 분석 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="긍정적 리뷰 분석">
            <div className="space-y-4">
              <div>
                <Text strong>평균 점수: </Text>
                <Text>{pros.avg_score?.toFixed(1) || 0}점</Text>
              </div>
              <div>
                <Text strong>주요 키워드:</Text>
                <div className="flex flex-wrap gap-1 mt-1">
                  {pros.keywords?.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {kw.keyword} ({kw.frequency})
                    </span>
                  )) || <Text className="text-black">데이터 없음</Text>}
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="부정적 리뷰 분석">
            <div className="space-y-4">
              <div>
                <Text strong>평균 점수: </Text>
                <Text>{cons.avg_score?.toFixed(1) || 0}점</Text>
              </div>
              <div>
                <Text strong>주요 키워드:</Text>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cons.keywords?.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                      {kw.keyword} ({kw.frequency})
                    </span>
                  )) || <Text className="text-gray-500">데이터 없음</Text>}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyReview;
