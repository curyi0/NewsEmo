from rest_framework import serializers

class CompanySerializer(serializers.Serializer):
  """회사 정보 Serializer - 동적 필드 처리"""
  
  def to_representation(self, instance):
    """MongoDB 문서를 JSON으로 변환 - 모든 필드 동적 처리"""
    if instance is None:
      return None
    
    result = {}
    
    # _id 필드는 항상 id로 변환
    if '_id' in instance:
      result['id'] = str(instance['_id'])
    
    # crawled_at 필드는 ISO 형식으로 변환
    if 'crawled_at' in instance and instance['crawled_at']:
      crawled_at_value = instance['crawled_at']
      if hasattr(crawled_at_value, 'isoformat'):
        # datetime 객체인 경우
        result['crawled_at'] = crawled_at_value.isoformat()
      else:
        # 이미 문자열인 경우 (Redis 캐시에서 가져온 경우)
        result['crawled_at'] = crawled_at_value
    
    # 나머지 모든 필드들을 동적으로 처리
    for key, value in instance.items():
      if key == '_id':
        continue 
      elif key == 'crawled_at':
        continue
      else:
        # 필드명에 공백이 있으면 언더스코어로 변환
        clean_key = key.replace(' ', '_').replace('-', '_')
        result[clean_key] = value
    
    return result