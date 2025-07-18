from pymongo import MongoClient

def main():
  client = MongoClient("mongodb://localhost:27017/")
  db = client["company_db"]
  collection = db["companies"]

  # name 필드에 " (기업)"이 포함된 문서를 모두 찾고 수정
  collection.update_many(
      {"name": {"$regex": r" \(기업\)"}},
      [{"$set": {"name": {"$replaceOne": {"input": "$name", "find": " (기업)", "replacement": ""}}}}]
  )

  print("데이터 수정 완료")

if __name__ == "__main__":
  main()