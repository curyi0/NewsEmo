from app.models import CompanyReviewModel
from app.machine_model.company_review.review_dataset import ReviewDataset
from app.machine_model.company_review.review_analyzer import ReviewSentimentAnalyzer

class ReviewAnalysisService:
  def __init__(self):
    self.company_review_model = CompanyReviewModel()
    self.review_dataset = ReviewDataset()
    self.review_analyzer = ReviewSentimentAnalyzer()

  def get_reviews(self, name):
    return self.company_review_model.get_reviews_by_company(name)

  def analysis_review(self, name):
    reviews = self.get_reviews(name)

    df = self.review_dataset.preprocess_reviews(reviews)

    analyzer = self.review_analyzer
    scored_df = analyzer.process_dataframe(df)

    return scored_df