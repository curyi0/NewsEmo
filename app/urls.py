from django.urls import path
from .views import CompanySearchView, ReviewAnalyzeView, CompanyRankingView

urlpatterns = [
  # 회사 이름으로 검색
  path('companies/search/', CompanySearchView.as_view(), name='company-search-get'),

  # 기업 재무 랭킹 조회
  path('companies/ranking/', CompanyRankingView.as_view(), name='company-ranking'),

  # 리뷰 분석
  path('review/analyze/', ReviewAnalyzeView.as_view(), name='review-analyze'),
]