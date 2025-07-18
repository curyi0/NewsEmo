from django.conf import settings
from pymongo import MongoClient

class MongoDBManager:
  """MongoDB 연결을 관리하는 싱글톤 클래스"""
  _instance = None
  _client = None
  _db = None

  def __new__(cls):
    if cls._instance is None:
      cls._instance = super(MongoDBManager, cls).__new__(cls)
    return cls._instance

  def __init__(self):
    if self._client is None:
      self._client = MongoClient(
        host=settings.MONGODB_SETTINGS['host'],
        port=settings.MONGODB_SETTINGS['port']
      )
      self._db = self._client[settings.MONGODB_SETTINGS['db']]

  @property
  def db(self):
    return self._db

  @property
  def client(self):
    return self._client

class CompanyModel:
  def __init__(self):
    self.db_manager = MongoDBManager()
    self.collection = self.db_manager.db['companies']
  
  def get_company_by_name(self, name):
    try:
      return self.collection.find_one({"name": name})
    except Exception as e:
      print(f"기업 조회 중 오류 발생: {e}")
      return None
  
  def get_total_count(self):
    try:
      return self.collection.count_documents({})
    except Exception as e:
      print(f"전체 수 조회 중 오류 발생: {e}")
      return 0

  def get_companies_by_field(self, field_name):
    """특정 필드가 있는 모든 기업 조회"""
    try:
      return list(self.collection.find({field_name: {"$exists": True, "$ne": None}}))
    except Exception as e:
      print(f"{field_name} 필드 기업 조회 중 오류 발생: {e}")
      return []

class CompanyReviewModel:
  def __init__(self):
    self.db_manager = MongoDBManager()
    self.collection = self.db_manager.db['company_reviews']

  def get_reviews_by_company(self, name):
    try:
      return list(self.collection.find({"name": name}))
    except Exception as e:
      print(f"리뷰 조회 중 오류 발생: {e}")
      return []