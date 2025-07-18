from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.serializers import CompanySerializer
from app.service.search_service import redis_search_service
from app.service.review_analysis_service import ReviewAnalysisService

class CompanySearchView(APIView):
  """기업 검색 API"""
  def get(self, request):
    try:
      name = request.query_params.get('name')
      company = redis_search_service.search_company_with_cache(name)
      serialized_company = CompanySerializer().to_representation(company)
      
      return Response(serialized_company, status=status.HTTP_200_OK)
      
    except Exception as e:
      print(f"검색 중 에러 발생: {str(e)}")
      return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CompanyRankingView(APIView):
  """기업 재무 랭킹 API"""
  def get(self, request):
    try:
      year = request.query_params.get('year', 2024)
      year = int(year)
      rankings = redis_search_service.get_comprehensive_ranking(year, 10)
      
      return Response(rankings, status=status.HTTP_200_OK)
      
    except Exception as e:
      print(f"랭킹 조회 중 에러 발생: {str(e)}")
      return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ReviewAnalyzeView(APIView):
  """리뷰 분석 API"""
  def post(self, request):
    try:
      name = request.data.get('name')
      reviews = ReviewAnalysisService().analysis_review(name)

      return Response({
        'total_count': reviews.shape[0],
        'avg_score': reviews['satisfaction_score'].mean(),
        'pros_avg_score': reviews[reviews['type'] == '장점']['satisfaction_score'].mean(),
        'cons_avg_score': reviews[reviews['type'] == '단점']['satisfaction_score'].mean()
      }, status=status.HTTP_200_OK)

    except Exception as e:
      print(f"리뷰 분석 중 에러 발생: {str(e)}")
      return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)