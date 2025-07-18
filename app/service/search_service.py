import redis
import json
from django.conf import settings
from app.models import CompanyModel
import hashlib
import re

class FinancialDataParser:
  """재무 데이터 파싱 유틸리티 클래스"""
  
  @staticmethod
  def parse_financial_amount(amount_str):
    """
    재무 금액 문자열을 파싱하여 원 단위 금액과 연도를 반환
    
    Args:
      amount_str: "160억 원 (2023년) or (2023)" 형태의 문자열
      
    Returns:
      tuple: (원 단위 금액, 연도)
    """
    try:
      # 연도 추출
      year_match = re.search(r'\((\d{4})년?\)', amount_str)
      year = int(year_match.group(1)) if year_match else None
      
      # 금액 부분 추출 (괄호 앞부분)
      amount_part = amount_str.split('(')[0].strip()
      
      # 숫자와 단위 추출
      amount = 0.0
      
      # 조 단위 처리
      trillion_match = re.search(r'(\d+(?:,\d+)*(?:\.\d+)?)\s*조', amount_part)
      if trillion_match:
        amount += float(trillion_match.group(1).replace(',', '')) * 1000000000000
      
      # 억 단위 처리
      billion_match = re.search(r'(\d+(?:,\d+)*(?:\.\d+)?)\s*억', amount_part)
      if billion_match:
        amount += float(billion_match.group(1).replace(',', '')) * 100000000
      
      # 만 단위 처리
      million_match = re.search(r'(\d+(?:,\d+)*(?:\.\d+)?)\s*만', amount_part)
      if million_match:
        amount += float(million_match.group(1).replace(',', '')) * 10000
      
      # 원 단위 처리 (단위가 없는 숫자)
      if amount == 0.0:
        # 단위가 없는 경우 원 단위로 처리
        number_match = re.search(r'(\d+(?:,\d+)*(?:\.\d+)?)', amount_part)
        if number_match:
          amount = float(number_match.group(1).replace(',', ''))
      
      return amount, year
      
    except (ValueError, AttributeError) as e:
      print(f"재무 데이터 파싱 오류: {amount_str}, 오류: {e}")
      return 0.0, None

class RedisSearchService:
  """Redis 기반 검색 서비스"""
  
  def __init__(self):
    self.redis_client = redis.Redis(
      host=settings.REDIS_SETTINGS['host'],
      port=settings.REDIS_SETTINGS['port'],
      db=settings.REDIS_SETTINGS['db'],
      password=settings.REDIS_SETTINGS['password'],
      decode_responses=settings.REDIS_SETTINGS['decode_responses']
    )
    self.company_model = CompanyModel()
    self.parser = FinancialDataParser()
  
  def _get_cache_key(self, prefix, keyword):
    """캐시 키 생성"""
    keyword_hash = hashlib.md5(keyword.encode()).hexdigest()
    return f"{prefix}:{keyword_hash}"
  
  def search_company_with_cache(self, keyword, cache_time=3600):
    """Redis 캐시를 활용한 회사 검색"""
    cache_key = self._get_cache_key("company_search", keyword)
    
    try:
      # Redis에서 캐시된 결과 확인
      cached_result = self.redis_client.get(cache_key)
      if cached_result:
        return json.loads(str(cached_result))
      
      # MongoDB에서 검색
      print(f"MongoDB에서 검색 실행: {keyword}")
      company = self.company_model.get_company_by_name(keyword)
      
      # company가 None이 아닌지 확인
      if not company:
        return {}
      
      # 결과를 JSON 직렬화 가능한 형태로 변환
      serializable_company = {}
      for key, value in company.items():
        if key == '_id':
          serializable_company['id'] = str(value)
        else:
          # 모든 값을 안전하게 처리
          try:
            # JSON 직렬화 테스트
            json.dumps(value)
            serializable_company[key] = value
          except:
            # 직렬화 불가능한 값은 문자열로 변환
            serializable_company[key] = str(value)
      
      # Redis에 캐시 저장
      self.redis_client.setex(
        cache_key,
        cache_time,
        json.dumps(serializable_company)
      )
      
      return serializable_company
      
    except Exception as e:
      print(f"Redis 검색 중 오류 발생: {e}")
      # Redis 오류 시 MongoDB 직접 조회
      return self.company_model.get_company_by_name(keyword)
  
  def get_top_companies_by_field(self, field_name, year=None, limit=10):
    """특정 필드 기준 상위 기업 조회"""
    try:
      # MongoDB에서 해당 필드가 있는 모든 기업 조회
      companies = self.company_model.get_companies_by_field(field_name)
      
      # 재무 데이터 파싱 및 필터링
      parsed_companies = []
      for company in companies:
        financial_data = company.get(field_name, "")
        amount, data_year = self.parser.parse_financial_amount(financial_data)
        
        # 연도 필터링
        if data_year == year:
          company_data = {
            'name': company.get('name', ''),
            'amount': amount,
            'year': data_year
          }
          parsed_companies.append(company_data)
      
      # 금액 기준 정렬 (내림차순)
      parsed_companies.sort(key=lambda x: x['amount'], reverse=True)
      
      # 상위 기업 반환
      return parsed_companies[:limit]
      
    except Exception as e:
      print(f"{field_name} 기준 상위 기업 조회 중 오류 발생: {e}")
      return []

  def get_comprehensive_ranking(self, year=2024, limit=10, cache_time=1800):
    """연도별 종합 재무 랭킹 조회 (매출액, 영업이익, 순이익)"""
    cache_key = self._get_cache_key("comprehensive_ranking", f"{year}_{limit}")
    
    try:
      # Redis에서 캐시된 결과 확인
      cached_result = self.redis_client.get(cache_key)
      if cached_result:
        return json.loads(str(cached_result))
      
      # MongoDB에서 각 분야별 랭킹 조회
      print(f"MongoDB에서 종합 랭킹 조회 실행: 연도={year}, 한도={limit}")
      
      rankings = {
        '매출액': self.get_top_companies_by_field('매출액', year, limit),
        '영업이익': self.get_top_companies_by_field('영업이익', year, limit),
        '순이익': self.get_top_companies_by_field('순이익', year, limit)
      }
      
      # Redis에 캐시 저장 (30분)
      self.redis_client.setex(
        cache_key,
        cache_time,
        json.dumps(rankings)
      )
      
      return rankings
      
    except Exception as e:
      print(f"종합 랭킹 조회 중 오류 발생: {e}")
      # Redis 오류 시 직접 조회
      return {
        '매출액': self.get_top_companies_by_field('매출액', year, limit),
        '영업이익': self.get_top_companies_by_field('영업이익', year, limit),
        '순이익': self.get_top_companies_by_field('순이익', year, limit)
      }

  def clear_cache(self, pattern=None):
    """캐시 초기화"""
    try:
      if pattern:
        # 특정 패턴의 키들만 삭제
        keys = list(self.redis_client.keys(pattern))
        if keys:
          self.redis_client.delete(*keys)
          return len(keys)
      else:
        # 전체 캐시 삭제
        result = self.redis_client.flushdb()
        return int(result) if result else 0
        
    except Exception as e:
      print(f"캐시 초기화 중 오류 발생: {e}")
      return 0


# 싱글톤 인스턴스
redis_search_service = RedisSearchService() 