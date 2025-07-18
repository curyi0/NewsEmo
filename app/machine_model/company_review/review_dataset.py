import re
import pandas as pd
from django.conf import settings
from app.models import MongoDBManager

class ReviewDataset:
  def __init__(self):
    self.db_manager = MongoDBManager()
    self.collection = self.db_manager.db['company_reviews']

  def preprocess_text(self, text):
    """영문, 특수문자 제거"""
    if not text:
      return ""
    
    text = re.sub(r'[a-zA-Z]', '', text)
    text = re.sub(r'[^\w\s가-힣]', '', text)
    text = re.sub(r'\s+', ' ', text)  # 여러 공백을 하나로
    text = text.strip()
    
    return text

  def structure_review_data(self, review_data):
    """리뷰 데이터 구조화: 장점/단점 분리"""
    pros = review_data.get('pros')
    cons = review_data.get('cons')
    
    pros = self.preprocess_text(pros)
    cons = self.preprocess_text(cons)
    
    structured_data = []
    
    # 장점 데이터 추가
    if pros and len(pros.strip()) > 5:
      structured_data.append({
        "type": "장점",
        "text": pros
      })
    
    # 단점 데이터 추가
    if cons and len(cons.strip()) > 5:
      structured_data.append({
        "type": "단점", 
        "text": cons
      })
    
    return structured_data

  def preprocess_reviews(self, reviews):
    """전체 리뷰 전처리"""
    processed_data = []  # 구조화된 리뷰 데이터
    
    for review in reviews:
      # 구조화된 데이터 생성 (장점/단점 분리)
      structured_items = self.structure_review_data(review)
      
      # 구조화된 각 항목을 리스트에 추가
      for item in structured_items:
        processed_data.append(item)
    
    df = pd.DataFrame(processed_data)
    
    return df