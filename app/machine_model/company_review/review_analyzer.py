from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers.pipelines.text_classification import TextClassificationPipeline
import pandas as pd
import torch

class ReviewSentimentAnalyzer:
  def __init__(self):
    model_name = "beomi/KcELECTRA-base"
    self.tokenizer = AutoTokenizer.from_pretrained(model_name)
    self.model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

    self.pipeline = TextClassificationPipeline(
      model=self.model,
      tokenizer=self.tokenizer,
      return_all_scores=True,  # 각 감정 확률 모두 반환
      top_k=None,
      truncation=True,
      device=0 if torch.cuda.is_available() else -1
    )

  def analyze_sentiment(self, text):
    """ 텍스트에서 긍정/부정 점수 반환 """
    result = self.pipeline(text)[0]
    scores = {res['label']: res['score'] for res in result}
    positive_score = scores.get('LABEL_1', 0)
    negative_score = scores.get('LABEL_0', 0)
    
    return positive_score, negative_score

  def compute_satisfaction_score(self, pos, neg):
    """ 감정 점수 기반 만족도 계산: 0~100 """
    return round(((pos - neg + 1) / 2) * 100, 2)

  def process_dataframe(self, df):
    """ 감정 분석 전체 적용 """
    results = []

    for idx, row in df.iterrows():
      text = row['text']
      r_type = row['type']

      pos, neg = self.analyze_sentiment(text)
      satisfaction = self.compute_satisfaction_score(pos, neg)

      results.append({
        'type': r_type,
        'text': text,
        'positive_score': pos,
        'negative_score': neg,
        'satisfaction_score': satisfaction
      })

    return pd.DataFrame(results)
